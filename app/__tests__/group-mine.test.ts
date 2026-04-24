import { NextRequest } from "next/server";

/**
 * Chainable thenable mock for Supabase queries — any chain method returns the
 * same object, and `await`-ing it resolves to `result`. This lets us mock both
 * queries the route makes against `session_participants` without branching on
 * method names.
 */
type ChainMock = {
  select: () => ChainMock;
  eq: () => ChainMock;
  neq: () => ChainMock;
  order: () => ChainMock;
  limit: () => ChainMock;
  then: (resolve: (v: unknown) => void) => void;
};

function makeChain(result: unknown): ChainMock {
  const chain: ChainMock = {
    select: () => chain,
    eq: () => chain,
    neq: () => chain,
    order: () => chain,
    limit: () => chain,
    then: (resolve) => resolve(result),
  };
  return chain;
}

describe("GET /api/group/mine", () => {
  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("returns { session: null } for unauthed", async () => {
    vi.doMock("@/lib/supabase-server", () => ({
      getSupabaseAdmin: () => ({}),
      getAuthUser: async () => null,
    }));
    const { GET } = await import("@/app/api/group/mine/route");
    const req = new NextRequest("http://localhost/api/group/mine");
    const res = await GET(req);
    const body = await res.json();
    expect(body).toEqual({ session: null });
  });

  it("returns the latest active session with waiting count", async () => {
    const results: unknown[] = [
      {
        data: [{
          session_id: "sess-1",
          sessions: { id: "sess-1", code: "EX72", status: "lobby", created_at: "2026-04-24T17:00:00Z" },
        }],
        error: null,
      },
      { count: 2, error: null },
    ];
    let idx = 0;
    vi.doMock("@/lib/supabase-server", () => ({
      getSupabaseAdmin: () => ({
        from: () => makeChain(results[idx++]),
      }),
      getAuthUser: async () => ({ id: "user-1" }),
    }));
    const { GET } = await import("@/app/api/group/mine/route");
    const req = new NextRequest("http://localhost/api/group/mine");
    const res = await GET(req);
    const body = await res.json();
    expect(body.session).toMatchObject({ code: "EX72", status: "lobby", waiting: 2 });
    expect(body.session.createdAt).toBe("2026-04-24T17:00:00Z");
  });

  it("returns { session: null } when user has no sessions", async () => {
    vi.doMock("@/lib/supabase-server", () => ({
      getSupabaseAdmin: () => ({
        from: () => makeChain({ data: [], error: null }),
      }),
      getAuthUser: async () => ({ id: "user-1" }),
    }));
    const { GET } = await import("@/app/api/group/mine/route");
    const req = new NextRequest("http://localhost/api/group/mine");
    const res = await GET(req);
    const body = await res.json();
    expect(body).toEqual({ session: null });
  });

  it("returns { session: null } when user's latest session is 'done'", async () => {
    vi.doMock("@/lib/supabase-server", () => ({
      getSupabaseAdmin: () => ({
        from: () => makeChain({
          data: [{
            session_id: "old",
            sessions: { id: "old", code: "OLD1", status: "done", created_at: "2026-04-01T10:00:00Z" },
          }],
          error: null,
        }),
      }),
      getAuthUser: async () => ({ id: "user-1" }),
    }));
    const { GET } = await import("@/app/api/group/mine/route");
    const req = new NextRequest("http://localhost/api/group/mine");
    const res = await GET(req);
    const body = await res.json();
    expect(body).toEqual({ session: null });
  });

  it("returns 500 when the session query errors", async () => {
    vi.doMock("@/lib/supabase-server", () => ({
      getSupabaseAdmin: () => ({
        from: () => makeChain({ data: null, error: new Error("db connection lost") }),
      }),
      getAuthUser: async () => ({ id: "user-1" }),
    }));
    const { GET } = await import("@/app/api/group/mine/route");
    const req = new NextRequest("http://localhost/api/group/mine");
    const res = await GET(req);
    expect(res.status).toBe(500);
  });
});
