"use client";

interface HeroCornerMarksProps {
  /** CSS variable name for the accent, e.g. "--gold" (default) or "--teal" (authed) */
  accentVar?: string;
}

/**
 * Four L-shaped corner marks that frame the hero content. Decorative, aria-hidden.
 * Hidden on mobile via the hero's CSS; always off in prefers-reduced-motion (no animation anyway).
 */
export default function HeroCornerMarks({ accentVar = "--gold" }: HeroCornerMarksProps) {
  const accent = `rgba(var(${accentVar}-rgb), 0.4)`;
  const base = {
    position: "absolute" as const,
    width: "14px",
    height: "14px",
    pointerEvents: "none" as const,
  };
  return (
    <>
      <span aria-hidden style={{ ...base, top: 18, left: 18, borderTop: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` }} />
      <span aria-hidden style={{ ...base, top: 18, right: 18, borderTop: `1px solid ${accent}`, borderRight: `1px solid ${accent}` }} />
      <span aria-hidden style={{ ...base, bottom: 18, left: 18, borderBottom: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` }} />
      <span aria-hidden style={{ ...base, bottom: 18, right: 18, borderBottom: `1px solid ${accent}`, borderRight: `1px solid ${accent}` }} />
    </>
  );
}
