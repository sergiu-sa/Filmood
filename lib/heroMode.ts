export type HeroMode =
  | "guest"
  | "authed-full"
  | "authed-history-only"
  | "authed-watchlist-only";

export interface HeroModeInput {
  isAuthed: boolean;
  hasHistory: boolean;
  hasWatchlist: boolean;
  hasActiveGroup: boolean;
}

/**
 * Decide which hero variant to render. Single source of truth for the
 * empty-state matrix in the V1+ Billboard spec §14.
 *
 * - guest                  → full guest composition (also the fallback)
 * - authed-full            → authed headline + personalized right column
 * - authed-history-only    → authed headline + feature-film right column
 * - authed-watchlist-only  → guest headline + watchlist peek right column
 */
export function getHeroMode(input: HeroModeInput): HeroMode {
  const { isAuthed, hasHistory, hasWatchlist, hasActiveGroup } = input;
  if (!isAuthed) return "guest";
  if (hasHistory && (hasWatchlist || hasActiveGroup)) return "authed-full";
  if (hasHistory) return "authed-history-only";
  if (hasWatchlist) return "authed-watchlist-only";
  return "guest";
}
