import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, getAuthUser } from "@/lib/supabase-server";
import { internalError } from "@/lib/api-errors";

// GET /api/group/mine
// Returns the caller's most recent active group session or { session: null }.
// "Active" = status in ('lobby','mood','swiping') — 'done' sessions are excluded.
export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ session: null });

  try {
    const supabase = getSupabaseAdmin();

    // Find the caller's most recent participation row, joined to the session.
    const { data: rows, error } = await supabase
      .from("session_participants")
      .select("session_id, sessions(id, code, status, created_at)")
      .eq("user_id", user.id)
      .order("joined_at", { ascending: false })
      .limit(1);

    if (error) return internalError(error, "Failed to load active session");
    const row = (rows ?? [])[0];
    const session = row?.sessions as unknown as
      | { id: string; code: string; status: string; created_at: string }
      | undefined;
    if (!session) return NextResponse.json({ session: null });

    // Filter out ended sessions
    if (!["lobby", "mood", "swiping"].includes(session.status)) {
      return NextResponse.json({ session: null });
    }

    // Count participants who are NOT the caller (i.e. "waiting")
    const { count, error: countErr } = await supabase
      .from("session_participants")
      .select("id", { count: "exact", head: true })
      .eq("session_id", session.id)
      .neq("user_id", user.id);

    if (countErr) return internalError(countErr, "Failed to load participant count");

    return NextResponse.json({
      session: {
        code: session.code,
        status: session.status,
        waiting: count ?? 0,
        createdAt: session.created_at,
      },
    });
  } catch (error) {
    return internalError(error, "Failed to load active session");
  }
}
