import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, Heart, UserPlus } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalPosts: number;
  totalLikes: number;
  totalFollows: number;
  byCountry: Record<string, number>;
}

export default function InvestorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/demo/stats")
      .then((r) => r.json())
      .then((data: Stats) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  const topCountries = stats
    ? Object.entries(stats.byCountry)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">📊 Investor Dashboard</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Live metrics from the demo seed dataset (400 users, 60% Israeli).
        </p>

        {loading ? (
          <p className="text-center py-16 text-muted-foreground">Loading metrics…</p>
        ) : stats ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <MetricCard icon={<Users className="h-5 w-5" />} label="Total Users" value={stats.totalUsers} />
              <MetricCard icon={<Music className="h-5 w-5" />} label="Total Posts" value={stats.totalPosts} />
              <MetricCard icon={<Heart className="h-5 w-5" />} label="Total Likes" value={stats.totalLikes} />
              <MetricCard icon={<UserPlus className="h-5 w-5" />} label="Follow Edges" value={stats.totalFollows} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Users by Country</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topCountries.map(([country, count]) => (
                    <div key={country} className="flex items-center gap-3">
                      <span className="w-8 text-sm font-medium">{country}</span>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(count / stats.totalUsers) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <p className="text-center text-destructive">Failed to load stats.</p>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          {icon}
          <span className="text-xs">{label}</span>
        </div>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
