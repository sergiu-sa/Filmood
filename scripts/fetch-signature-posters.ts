#!/usr/bin/env tsx
/**
 * One-shot script: reads lib/moodMap.ts signatureFilm entries, queries TMDB's
 * /search/movie endpoint to resolve each {title, year} to a real tmdbId + poster_path,
 * and writes the results back. Run once when curating the signature-films list.
 *
 * Usage: npx tsx scripts/fetch-signature-posters.ts
 * (TMDB_API_KEY is loaded automatically from .env.local)
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { allMoods } from "../lib/moodMap";

const repoRoot = path.resolve(__dirname, "..");
loadEnv({ path: path.join(repoRoot, ".env.local") });

const TMDB_KEY = process.env.TMDB_API_KEY;
if (!TMDB_KEY) {
  console.error("Set TMDB_API_KEY in .env.local");
  process.exit(1);
}

interface SearchHit {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

interface SearchResponse {
  results: SearchHit[];
}

async function resolve(title: string, year: number) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("api_key", TMDB_KEY!);
  url.searchParams.set("query", title);
  url.searchParams.set("year", String(year));
  url.searchParams.set("include_adult", "false");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB ${res.status} for "${title}" (${year})`);
  const data = (await res.json()) as SearchResponse;
  const hit = data.results[0];
  if (!hit) throw new Error(`No TMDB match for "${title}" (${year})`);
  return { tmdbId: hit.id, posterPath: hit.poster_path };
}

async function main() {
  const mapPath = path.resolve(__dirname, "../lib/moodMap.ts");
  let source = readFileSync(mapPath, "utf-8");

  for (const mood of allMoods) {
    if (!mood.signatureFilm) {
      console.warn(`Skipping ${mood.key} — no signatureFilm`);
      continue;
    }
    const { title, year } = mood.signatureFilm;
    console.log(`Resolving ${mood.key}: "${title}" (${year})…`);
    try {
      const { tmdbId, posterPath } = await resolve(title, year);
      // Find the block for this mood and replace its signatureFilm line.
      // Uses a non-greedy regex over the signatureFilm line of this mood.
      const keyEscaped = mood.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const moodBlock = new RegExp(
        `(${keyEscaped}:\\s*\\{[\\s\\S]*?signatureFilm:\\s*\\{[^}]*?\\},)`,
      );
      const newLine =
        `signatureFilm: { tmdbId: ${tmdbId}, title: "${title.replace(/"/g, '\\"')}", year: ${year}, posterPath: ${posterPath ? `"${posterPath}"` : "null"} },`;
      const updated = source.replace(moodBlock, (match) =>
        match.replace(/signatureFilm:\s*\{[^}]*?\},/, newLine),
      );
      if (updated === source) {
        console.warn(`  ⚠ Could not update ${mood.key} — regex missed`);
      } else {
        source = updated;
        console.log(`  → tmdbId=${tmdbId} poster=${posterPath ?? "(none)"}`);
      }
    } catch (err) {
      console.error(`  ✗ ${(err as Error).message}`);
    }
  }

  writeFileSync(mapPath, source, "utf-8");
  console.log("\nmoodMap.ts updated. Run: npm run lint:fix && npm test");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
