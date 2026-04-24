import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, getAuthUser } from "@/lib/supabase-server";
import { internalError, badRequest } from "@/lib/api-errors";

// GET /api/watchlist?limit=N
// Returns all saved films for the logged-in user, newest first.
// Optional ?limit=N caps the result set (1 ≤ N ≤ 100).
export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limitParam = request.nextUrl.searchParams.get("limit");
  let limit: number | null = null;
  if (limitParam !== null) {
    const n = Number(limitParam);
    if (!Number.isInteger(n) || n < 1 || n > 100) {
      return badRequest("limit must be an integer between 1 and 100");
    }
    limit = n;
  }

  let query = getSupabaseAdmin()
    .from("watchlists")
    .select("*")
    .eq("user_id", user.id)
    .order("added_at", { ascending: false });

  if (limit !== null) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return internalError(error, "Failed to load watchlist");
  }

  return NextResponse.json({ watchlist: data });
}
