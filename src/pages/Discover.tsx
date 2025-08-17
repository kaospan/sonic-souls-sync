import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Music, Users, TrendingUp } from "lucide-react";
import Header from "@/components/Header";

const Discover = () => {
  const nearbyUsers = [
    {
      id: "1",
      name: "Emma Thompson",
      username: "emmamusic",
      avatar: "/placeholder.svg",
      distance: "2.3 km",
      commonArtists: ["Arctic Monkeys", "The Strokes", "Vampire Weekend"],
      matchPercentage: 87,
      topGenres: ["Indie Rock", "Alternative"]
    },
    {
      id: "2", 
      name: "David Kim",
      username: "davidbeats",
      avatar: "/placeholder.svg",
      distance: "1.8 km",
      commonArtists: ["Tame Impala", "Glass Animals", "Foster the People"],
      matchPercentage: 73,
      topGenres: ["Psychedelic", "Indie Pop"]
    },
    {
      id: "3",
      name: "Sofia Martinez",
      username: "sofiavibes",
      avatar: "/placeholder.svg",
      distance: "3.1 km",
      commonArtists: ["Billie Eilish", "Lorde", "Clairo"],
      matchPercentage: 91,
      topGenres: ["Pop", "Alternative"]
    }
  ];

  const trendingGenres = [
    { name: "Hyperpop", listeners: 45678, growth: "+23%" },
    { name: "Bedroom Pop", listeners: 38291, growth: "+18%" },
    { name: "Dark Ambient", listeners: 29184, growth: "+31%" },
    { name: "Lo-Fi Hip Hop", listeners: 67432, growth: "+12%" }
  ];

  const events = [
    {
      id: "1",
      title: "Indie Rock Night",
      venue: "The Mercury Lounge",
      date: "Tomorrow 8 PM",
      attendees: 23,
      genre: "Indie Rock"
    },
    {
      id: "2",
      title: "Electronic Vibes",
      venue: "Club Nebula",
      date: "Friday 10 PM",
      attendees: 45,
      genre: "Electronic"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-music bg-clip-text text-transparent">
          Discover Music & People
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nearby Users */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-music-primary" />
              <h2 className="text-xl font-semibold">People Near You</h2>
            </div>
            
            <div className="space-y-4">
              {nearbyUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.distance} away</p>
                      <div className="flex gap-1 mt-1">
                        {user.topGenres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-music-primary">{user.matchPercentage}%</div>
                    <p className="text-xs text-muted-foreground">match</p>
                    <Button variant="musicPrimary" size="sm" className="mt-2">
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Trending Genres */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-music-secondary" />
              <h2 className="text-xl font-semibold">Trending Genres</h2>
            </div>
            
            <div className="space-y-4">
              {trendingGenres.map((genre) => (
                <div key={genre.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <h3 className="font-medium">{genre.name}</h3>
                    <p className="text-sm text-muted-foreground">{genre.listeners.toLocaleString()} listeners</p>
                  </div>
                  <Badge variant="musicSecondary" className="text-music-secondary">
                    {genre.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Local Events */}
          <Card className="p-6 bg-card border-border lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Music className="h-5 w-5 text-music-tertiary" />
              <h2 className="text-xl font-semibold">Music Events Near You</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 rounded-lg bg-gradient-card border border-border">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-muted-foreground">{event.venue}</p>
                  <p className="text-sm text-music-primary">{event.date}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                    <Badge variant="outline">{event.genre}</Badge>
                  </div>
                  <Button variant="musicPrimary" className="w-full mt-3">
                    Join Event
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Discover;