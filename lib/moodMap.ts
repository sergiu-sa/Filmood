// Mood-to-TMDB mapping — each mood maps to TMDB query params (genres, sort, filters).
// TMDB Genre IDs: 28=Action, 16=Animation, 35=Comedy, 18=Drama, 14=Fantasy,
// 36=History, 27=Horror, 10749=Romance, 878=Sci-Fi, 53=Thriller, 10751=Family,
// 9648=Mystery, 80=Crime, 10752=War
// TMDB Keyword IDs used below (all OR'd via with_keywords):
// 6054=feel-good, 9799=romantic-comedy, 180547=coming-of-age,
// 10714=mind-bending, 4565=dystopia, 1701=neo-noir, 9840=cult-film

import type { MoodConfig } from "@/lib/types";
export const moodMap: Record<string, MoodConfig> = {
  laugh: {
    key: "laugh",
    tagLabel: "Need to laugh",
    label: "Laugh until it hurts",
    description: "Comedy, feel-good, absurd",
    accentColor: "gold",
    genres: [35],
    excludeGenres: [27],
    sortBy: "popularity.desc",
    voteCountGte: 500,
    signatureFilm: { tmdbId: 346698, title: "Barbie", year: 2023, posterPath: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
  },
  beautiful: {
    key: "beautiful",
    tagLabel: "Feel something beautiful",
    label: "Something beautiful",
    description: "Gorgeous drama, visual poetry",
    accentColor: "rose",
    genres: [18, 10749],
    sortBy: "vote_average.desc",
    voteCountGte: 200,
    voteAverageGte: 7.0,
    signatureFilm: { tmdbId: 666277, title: "Past Lives", year: 2023, posterPath: "/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg" },
  },
  unsettled: {
    key: "unsettled",
    tagLabel: "Feel uneasy",
    label: "Slow-burn tension",
    description: "Gets under your skin",
    accentColor: "rose",
    genres: [53, 27, 9648],
    sortBy: "vote_average.desc",
    voteCountGte: 300,
    voteAverageGte: 6.5,
    signatureFilm: { tmdbId: 467244, title: "The Zone of Interest", year: 2023, posterPath: "/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg" },
  },
  thrilling: {
    key: "thrilling",
    tagLabel: "Need a rush",
    label: "Pure adrenaline",
    description: "Non-stop action, high octane",
    accentColor: "ember",
    genres: [28, 53],
    excludeGenres: [35],
    sortBy: "popularity.desc",
    voteCountGte: 400,
    signatureFilm: { tmdbId: 575264, title: "Mission: Impossible - Dead Reckoning Part One", year: 2023, posterPath: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg" },
  },
  thoughtful: {
    key: "thoughtful",
    tagLabel: "Mind needs feeding",
    label: "Layers on layers",
    description: "Changes how you see things",
    accentColor: "violet",
    genres: [878, 18],
    sortBy: "vote_average.desc",
    voteCountGte: 200,
    voteAverageGte: 7.5,
    signatureFilm: { tmdbId: 693134, title: "Dune: Part Two", year: 2024, posterPath: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
  },
  easy: {
    key: "easy",
    tagLabel: "Need a hug",
    label: "Warm & familiar",
    description: "Comforting, wholesome",
    accentColor: "teal",
    genres: [35, 10751, 16],
    sortBy: "popularity.desc",
    voteCountGte: 300,
    voteAverageGte: 7.0,
    keywords: [6054],
    signatureFilm: { tmdbId: 840430, title: "The Holdovers", year: 2023, posterPath: "/VHSzNBTwxV8vh7wylo7O9CLdac.jpg" },
  },
  cry: {
    key: "cry",
    tagLabel: "Need to let it out",
    label: "A good cry",
    description: "Emotional, cathartic",
    accentColor: "blue",
    genres: [18, 10749],
    sortBy: "vote_average.desc",
    voteCountGte: 200,
    voteAverageGte: 7.0,
    signatureFilm: { tmdbId: 994108, title: "All of Us Strangers", year: 2023, posterPath: "/aviJMFZSnnCAsCVyJGaPNx4Ef3i.jpg" },
  },
  escape: {
    key: "escape",
    tagLabel: "Want to disappear",
    label: "Sweeping visuals await",
    description: "Films that transport you",
    accentColor: "blue",
    genres: [878, 14, 16],
    sortBy: "vote_average.desc",
    voteCountGte: 200,
    voteAverageGte: 7.0,
    signatureFilm: { tmdbId: 792307, title: "Poor Things", year: 2023, posterPath: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg" },
  },
  family: {
    key: "family",
    tagLabel: "Everyone's watching",
    label: "Watch with family",
    description: "Fun for all ages",
    accentColor: "teal",
    genres: [10751, 16, 35],
    sortBy: "popularity.desc",
    voteCountGte: 300,
    signatureFilm: { tmdbId: 569094, title: "Spider-Man: Across the Spider-Verse", year: 2023, posterPath: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
  },
  inspiring: {
    key: "inspiring",
    tagLabel: "Want to dream",
    label: "Something inspiring",
    description: "Stories that lift you up",
    accentColor: "gold",
    genres: [18, 36],
    sortBy: "vote_average.desc",
    voteCountGte: 200,
    voteAverageGte: 7.5,
    signatureFilm: { tmdbId: 872585, title: "Oppenheimer", year: 2023, posterPath: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  },
  datenight: {
    key: "datenight",
    tagLabel: "Date night",
    label: "Easy-watch together",
    description: "Rom-com vibes, no heavy stuff",
    accentColor: "rose",
    genres: [35, 10749],
    excludeGenres: [27, 10752],
    sortBy: "popularity.desc",
    voteCountGte: 400,
    keywords: [6054, 9799],
    signatureFilm: { tmdbId: 1072790, title: "Anyone But You", year: 2023, posterPath: "/5qHoazZiaLe7oFBok7XlUhg96f2.jpg" },
  },
  nostalgic: {
    key: "nostalgic",
    tagLabel: "Take me back",
    label: "Wistful & nostalgic",
    description: "Coming-of-age, tender memories",
    accentColor: "gold",
    genres: [18, 10749],
    sortBy: "vote_average.desc",
    voteCountGte: 200,
    voteAverageGte: 7.0,
    keywords: [180547],
    signatureFilm: { tmdbId: 391713, title: "Lady Bird", year: 2017, posterPath: "/gl66K7zRdtNYGrxyS2YDUP5ASZd.jpg" },
  },
  mindbending: {
    key: "mindbending",
    tagLabel: "Bend my mind",
    label: "Reality-shifting puzzles",
    description: "Twists, loops, what-is-real",
    accentColor: "violet",
    genres: [878, 53],
    sortBy: "vote_average.desc",
    voteCountGte: 300,
    voteAverageGte: 7.0,
    keywords: [10714, 4565],
    signatureFilm: { tmdbId: 545611, title: "Everything Everywhere All at Once", year: 2022, posterPath: "/u68AjlvlutfEIcpmbYpKcdi09ut.jpg" },
  },
  dark: {
    key: "dark",
    tagLabel: "Go dark",
    label: "Cold, gritty, bleak",
    description: "Neo-noir, crime, moral grey",
    accentColor: "ember",
    genres: [80, 53, 18],
    sortBy: "vote_average.desc",
    voteCountGte: 300,
    voteAverageGte: 6.8,
    keywords: [1701],
    signatureFilm: { tmdbId: 800158, title: "The Killer", year: 2023, posterPath: "/ipkcgvN7h3yZnbYowthloHLKsf4.jpg" },
  },
  weird: {
    key: "weird",
    tagLabel: "Something weird",
    label: "Off-kilter & surreal",
    description: "Cult-leaning, quirky, strange",
    accentColor: "teal",
    genres: [35, 18, 14],
    sortBy: "vote_average.desc",
    voteCountGte: 150,
    voteAverageGte: 6.8,
    keywords: [9840],
    signatureFilm: { tmdbId: 798286, title: "Beau Is Afraid", year: 2023, posterPath: "/wgVkkjigF31r1nZV80uV0xNIoun.jpg" },
  },
};

// All moods as an array for UI iteration
export const allMoods = Object.values(moodMap);

// Convert a mood key into TMDB API query params
export function buildTMDBParams(moodKey: string): Record<string, string> {
  const mood = moodMap[moodKey];
  if (!mood) throw new Error(`Unknown mood: ${moodKey}`);

  const params: Record<string, string> = {
    with_genres: mood.genres.join(","),
    sort_by: mood.sortBy,
    "vote_count.gte": mood.voteCountGte.toString(),
    watch_region: "NO",
    with_watch_monetization_types: "flatrate",
  };

  if (mood.excludeGenres) {
    params.without_genres = mood.excludeGenres.join(",");
  }
  if (mood.voteAverageGte) {
    params["vote_average.gte"] = mood.voteAverageGte.toString();
  }
  if (mood.keywords && mood.keywords.length > 0) {
    params.with_keywords = mood.keywords.join(",");
  }

  return params;
}

// Merge multiple moods into one TMDB query.
// Uses shared genres (or primary genre from each), strictest quality thresholds,
// rating sort for cross-genre gems, and union of exclusions (minus target genres).
export function buildMergedTMDBParams(moodKeys: string[]): Record<string, string> {
  if (moodKeys.length === 1) return buildTMDBParams(moodKeys[0]);

  const configs = moodKeys.map((k) => {
    const mood = moodMap[k];
    if (!mood) throw new Error(`Unknown mood: ${k}`);
    return mood;
  });

  // 1. Genre selection — find shared genres, or combine primary genres
  const genreCounts = new Map<number, number>();
  for (const cfg of configs) {
    for (const g of cfg.genres) {
      genreCounts.set(g, (genreCounts.get(g) ?? 0) + 1);
    }
  }

  const sharedGenres = [...genreCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([genre]) => genre);

  let targetGenres: number[];
  if (sharedGenres.length > 0) {
    targetGenres = sharedGenres;
  } else {
    targetGenres = [...new Set(configs.map((c) => c.genres[0]))];
  }

  // 2. Quality thresholds (strictest wins)
  const voteCountGte = Math.max(...configs.map((c) => c.voteCountGte));
  const voteAverageGte = Math.max(...configs.map((c) => c.voteAverageGte ?? 0));

  const sortBy = "vote_average.desc";

  // 3. Exclusions (union, but never exclude target genres)
  const targetSet = new Set(targetGenres);
  const allExcludes = new Set<number>();
  for (const cfg of configs) {
    if (cfg.excludeGenres) {
      for (const g of cfg.excludeGenres) {
        if (!targetSet.has(g)) allExcludes.add(g);
      }
    }
  }

  // Build params
  const params: Record<string, string> = {
    with_genres: targetGenres.join(","),
    sort_by: sortBy,
    "vote_count.gte": voteCountGte.toString(),
    watch_region: "NO",
    with_watch_monetization_types: "flatrate",
  };

  if (allExcludes.size > 0) {
    params.without_genres = [...allExcludes].join(",");
  }
  if (voteAverageGte > 0) {
    params["vote_average.gte"] = voteAverageGte.toString();
  }

  // 4. Keywords (union across moods — TMDB treats comma as OR, so more = broader)
  const allKeywords = new Set<number>();
  for (const cfg of configs) {
    if (cfg.keywords) {
      for (const k of cfg.keywords) allKeywords.add(k);
    }
  }
  if (allKeywords.size > 0) {
    params.with_keywords = [...allKeywords].join(",");
  }

  return params;
}
