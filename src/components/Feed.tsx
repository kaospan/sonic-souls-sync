import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  audioUrl: string;
  likes: number;
  comments: { id: string; username: string; text: string }[];
  createdAt: string;
}

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

interface FeedResponse {
  total: number;
  page: number;
  limit: number;
  items: Post[];
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/demo/posts?page=${page}&limit=10`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: FeedResponse) => {
        setPosts(data.items);
        setTotal(data.total);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetch("/api/demo/users?limit=400")
      .then((r) => r.json())
      .then((data: { items: User[] }) => {
        const map = new Map<string, User>();
        data.items.forEach((u) => map.set(u.id, u));
        setUsers(map);
      })
      .catch(() => { /* non-fatal */ });
  }, []);

  if (loading) return <p className="text-center py-8 text-muted-foreground">Loading posts…</p>;
  if (error) return <p className="text-center py-8 text-destructive">Error: {error}</p>;

  return (
    <div>
      {posts.map((post) => {
        const author = users.get(post.userId);
        return (
          <PostCard
            key={post.id}
            post={post}
            authorName={author?.displayName}
            authorAvatar={author?.avatar}
          />
        );
      })}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="text-sm text-primary disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Prev
        </button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.ceil(total / 10)}
        </span>
        <button
          className="text-sm text-primary disabled:opacity-40"
          disabled={page >= Math.ceil(total / 10)}
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
