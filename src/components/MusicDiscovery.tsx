import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Music, TrendingUp } from "lucide-react";

interface NearbyUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  location: string;
  distance: string;
  commonArtists: string[];
  matchPercentage: number;
}

interface MusicDiscoveryProps {
  nearbyUsers: NearbyUser[];
  trendingTracks: Array<{
    title: string;
    artist: string;
    artwork: string;
    listeners: number;
  }>;
}

const MusicDiscovery = ({ nearbyUsers, trendingTracks }: MusicDiscoveryProps) => {
  return (
    <div className="space-y-6">
      {/* Nearby Music Lovers */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-music-primary" />
          <h3 className="text-lg font-semibold text-foreground">Nearby Music Lovers</h3>
        </div>
        <div className="space-y-4">
          {nearbyUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{user.name}</span>
                  <span className="text-sm px-2 py-1 bg-music-primary/20 text-music-primary rounded-full">
                    {user.matchPercentage}% match
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{user.distance} away</p>
                <p className="text-xs text-muted-foreground">
                  Common: {user.commonArtists.slice(0, 3).join(", ")}
                </p>
              </div>
              <Button variant="musicGhost" size="sm">Connect</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Trending Now */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-music-secondary" />
          <h3 className="text-lg font-semibold text-foreground">Trending Now</h3>
        </div>
        <div className="space-y-3">
          {trendingTracks.map((track, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-music-primary/20 text-music-primary rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <img 
                src={track.artwork} 
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{track.title}</p>
                <p className="text-muted-foreground text-xs">{track.artist}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                <Music className="h-3 w-3 inline mr-1" />
                {track.listeners.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MusicDiscovery;