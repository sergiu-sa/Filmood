import { NextRequest } from "next/server";

vi.mock("@/lib/supabase-server", () => ({
  getSupabaseAdmin: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            limit: (n: number) =>
              Promise.resolve({
                data: Array.from({ length: n }).map((_, i) => ({
                  id: i, movie_id: i, title: `Film ${i}`,
                })),
                error: null,
              }),
          }),
        }),
      }),
    }),
  }),
  getAuthUser: async () => ({ id: "user-1" }),
}));

describe("GET /api/watchlist ?limit=N", () => {
  it("limits results when ?limit=3 is provided", async () => {
    const { GET } = await import("@/app/api/watchlist/route");
    const req = new NextRequest("http://localhost/api/watchlist?limit=3");
    const res = await GET(req);
    const body = await res.json();
    expect(body.watchlist).toHaveLength(3);
  });

  it("returns all rows when no limit is given", async () => {
    vi.resetModules();
    vi.doMock("@/lib/supabase-server", () => ({
      getSupabaseAdmin: () => ({
        from: () => ({
          select: () => ({
            eq: () => ({
              order: () =>
                Promise.resolve({
                  data: Array.from({ length: 7 }).map((_, i) => ({ id: i })),
                  error: null,
                }),
            }),
          }),
        }),
      }),
      getAuthUser: async () => ({ id: "user-1" }),
    }));
    const { GET } = await import("@/app/api/watchlist/route");
    const req = new NextRequest("http://localhost/api/watchlist");
    const res = await GET(req);
    const body = await res.json();
    expect(body.watchlist).toHaveLength(7);
  });
});
