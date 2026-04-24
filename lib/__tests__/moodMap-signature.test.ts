import { allMoods } from "@/lib/moodMap";

describe("signatureFilm per mood", () => {
  it("every mood has a signatureFilm with tmdbId, title, year", () => {
    for (const mood of allMoods) {
      expect(mood.signatureFilm, `mood=${mood.key}`).toBeDefined();
      expect(typeof mood.signatureFilm!.tmdbId).toBe("number");
      expect(mood.signatureFilm!.tmdbId).toBeGreaterThan(0);
      expect(mood.signatureFilm!.title.length).toBeGreaterThan(0);
      expect(mood.signatureFilm!.year).toBeGreaterThan(1900);
    }
  });

  it("every signatureFilm has a TMDB poster_path (or is flagged for the fetch script)", () => {
    for (const mood of allMoods) {
      const sf = mood.signatureFilm!;
      expect(sf.posterPath === null || typeof sf.posterPath === "string", `mood=${mood.key}`).toBe(true);
    }
  });

  it("no two moods share the same signatureFilm tmdbId", () => {
    const ids = allMoods.map((m) => m.signatureFilm!.tmdbId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
