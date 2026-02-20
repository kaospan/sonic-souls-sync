/**
 * src/lib/mockServer.ts
 *
 * In-memory mock social backend for development only.
 * Loads scripts/seeds.json and intercepts fetch calls to /api/demo/* using
 * a lightweight service-worker-free approach (monkey-patches globalThis.fetch).
 *
 * Gate with VITE_USE_MOCK=true or the vite dev mode check.
 *
 * ⚠️  NEVER import this file in production builds.
 */

interface SeedComment {
  id: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

interface SeedPost {
  id: string;
  userId: string;
  title: string;
  description: string;
  audioUrl: string;
  likes: number;
  comments: SeedComment[];
  createdAt: string;
}

interface SeedUser {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  country: string;
  locale: string;
  avatar: string;
  createdAt: string;
  posts: SeedPost[];
  followingIds: string[];
}

type UsersMap = Map<string, SeedUser>;

let usersMap: UsersMap = new Map();
let _initialized = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function notFound(msg = "Not found"): Response {
  return json({ error: msg }, 404);
}

function handleRequest(url: URL): Response | null {
  const p = url.pathname;

  // GET /api/demo/users
  if (p === "/api/demo/users") {
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);
    const users = Array.from(usersMap.values());
    const start = (page - 1) * limit;
    const items = users.slice(start, start + limit).map(({ followingIds: _, posts: __, ...u }) => u);
    return json({ total: users.length, page, limit, items });
  }

  // GET /api/demo/users/:id
  const userMatch = p.match(/^\/api\/demo\/users\/([^/]+)$/);
  if (userMatch) {
    const user = usersMap.get(userMatch[1]);
    if (!user) return notFound("User not found");
    const { followingIds: _, posts: __, ...rest } = user;
    return json({ ...rest, postCount: user.posts.length, followingCount: user.followingIds.length });
  }

  // GET /api/demo/posts
  if (p === "/api/demo/posts") {
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);
    const all: SeedPost[] = [];
    usersMap.forEach((u) => all.push(...u.posts));
    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const start = (page - 1) * limit;
    return json({ total: all.length, page, limit, items: all.slice(start, start + limit) });
  }

  // GET /api/demo/users/:id/posts
  const userPostsMatch = p.match(/^\/api\/demo\/users\/([^/]+)\/posts$/);
  if (userPostsMatch) {
    const user = usersMap.get(userPostsMatch[1]);
    if (!user) return notFound("User not found");
    return json({ items: user.posts });
  }

  // GET /api/demo/stats — investor dashboard
  if (p === "/api/demo/stats") {
    const users = Array.from(usersMap.values());
    const totalPosts = users.reduce((s, u) => s + u.posts.length, 0);
    const totalLikes = users.reduce((s, u) => u.posts.reduce((ps, p) => ps + p.likes, s), 0);
    const totalFollows = users.reduce((s, u) => s + u.followingIds.length, 0);
    const byCountry: Record<string, number> = {};
    users.forEach((u) => { byCountry[u.country] = (byCountry[u.country] ?? 0) + 1; });
    return json({ totalUsers: users.length, totalPosts, totalLikes, totalFollows, byCountry });
  }

  return null;
}

function handleMutationRequest(method: string, url: URL, body: unknown): Response | null {
  const p = url.pathname;

  // POST /api/demo/users/:id/follow
  const followMatch = p.match(/^\/api\/demo\/users\/([^/]+)\/(follow|unfollow)$/);
  if (followMatch && method === "POST") {
    const targetId = followMatch[1];
    const action = followMatch[2];
    const { followerId } = (body ?? {}) as { followerId?: string };
    if (!followerId) return json({ error: "followerId required" }, 400);
    const follower = usersMap.get(followerId);
    if (!follower) return notFound("Follower not found");
    if (!usersMap.has(targetId)) return notFound("Target user not found");
    if (action === "follow") {
      if (!follower.followingIds.includes(targetId)) follower.followingIds.push(targetId);
    } else {
      follower.followingIds = follower.followingIds.filter((id) => id !== targetId);
    }
    return json({ success: true, following: follower.followingIds.includes(targetId) });
  }

  // POST /api/demo/posts/:id/like
  const likeMatch = p.match(/^\/api\/demo\/posts\/([^/]+)\/like$/);
  if (likeMatch && method === "POST") {
    for (const user of usersMap.values()) {
      const post = user.posts.find((p) => p.id === likeMatch[1]);
      if (post) {
        post.likes += 1;
        return json({ success: true, likes: post.likes });
      }
    }
    return notFound("Post not found");
  }

  // POST /api/demo/posts/:id/comment
  const commentMatch = p.match(/^\/api\/demo\/posts\/([^/]+)\/comment$/);
  if (commentMatch && method === "POST") {
    const { userId, text } = (body ?? {}) as { userId?: string; text?: string };
    if (!userId || !text) return json({ error: "userId and text required" }, 400);
    const commenter = usersMap.get(userId);
    if (!commenter) return notFound("User not found");
    for (const user of usersMap.values()) {
      const post = user.posts.find((p) => p.id === commentMatch[1]);
      if (post) {
        const comment: SeedComment = {
          id: `c-${Date.now()}`,
          userId,
          username: commenter.username,
          text,
          createdAt: new Date().toISOString(),
        };
        post.comments.push(comment);
        return json({ success: true, comment });
      }
    }
    return notFound("Post not found");
  }

  return null;
}

/**
 * Initialise the mock server by patching globalThis.fetch.
 * @param seedsPath  Optional path to seeds.json (used in Node test environments).
 *                   In the browser the data is fetched from the public folder.
 */
export async function initMockServer(seedsPath?: string): Promise<void> {
  if (_initialized) return;
  _initialized = true;

  let seedData: SeedUser[];

  if (seedsPath) {
    // Node / test environment
    const { readFileSync } = await import("fs");
    seedData = JSON.parse(readFileSync(seedsPath, "utf-8")) as SeedUser[];
  } else {
    // Browser: Vite resolves this JSON import at build/dev time
    const mod = await import("../../scripts/seeds.json");
    seedData = mod.default as SeedUser[];
  }

  usersMap = new Map(seedData.map((u) => [u.id, { ...u }]));

  const originalFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async function mockedFetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    const urlStr = typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url;

    if (!urlStr.includes("/api/demo/")) {
      return originalFetch(input, init);
    }

    const url = new URL(urlStr, "http://localhost");
    const method = (init?.method ?? "GET").toUpperCase();

    if (method === "GET") {
      const res = handleRequest(url);
      if (res) return res;
    } else {
      let body: unknown = null;
      if (init?.body) {
        try { body = JSON.parse(init.body as string); } catch { /* ignore */ }
      }
      const res = handleMutationRequest(method, url, body);
      if (res) return res;
    }

    return json({ error: "Not found" }, 404);
  };

  console.info("[MockServer] Initialized with", usersMap.size, "users");
}
