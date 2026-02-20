import { Feed } from "@/components/Feed";

export default function DemoFeed() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🎵 Demo Feed</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          This is a demo feed powered by the in-memory mock social backend (400 seeded users, 60%
          Israeli). Data is ephemeral and resets on page refresh.
        </p>
        <Feed />
      </div>
    </div>
  );
}
