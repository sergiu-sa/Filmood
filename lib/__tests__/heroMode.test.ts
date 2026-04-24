import { getHeroMode } from "@/lib/heroMode";

describe("getHeroMode", () => {
  it("returns 'guest' when not authed", () => {
    const mode = getHeroMode({
      isAuthed: false,
      hasHistory: false,
      hasWatchlist: false,
      hasActiveGroup: false,
    });
    expect(mode).toBe("guest");
  });

  it("returns 'authed-full' when authed with history AND watchlist or group", () => {
    expect(
      getHeroMode({ isAuthed: true, hasHistory: true, hasWatchlist: true, hasActiveGroup: false }),
    ).toBe("authed-full");
    expect(
      getHeroMode({ isAuthed: true, hasHistory: true, hasWatchlist: false, hasActiveGroup: true }),
    ).toBe("authed-full");
  });

  it("returns 'authed-history-only' when authed with history but no watchlist/group", () => {
    expect(
      getHeroMode({ isAuthed: true, hasHistory: true, hasWatchlist: false, hasActiveGroup: false }),
    ).toBe("authed-history-only");
  });

  it("returns 'authed-watchlist-only' when authed with watchlist but no history", () => {
    expect(
      getHeroMode({ isAuthed: true, hasHistory: false, hasWatchlist: true, hasActiveGroup: false }),
    ).toBe("authed-watchlist-only");
  });

  it("returns 'guest' when authed but nothing personalizable exists", () => {
    const mode = getHeroMode({
      isAuthed: true,
      hasHistory: false,
      hasWatchlist: false,
      hasActiveGroup: false,
    });
    expect(mode).toBe("guest");
  });
});
