import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Music, Users, Heart } from "lucide-react";

interface UserProfileProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    location: string;
    bio: string;
    followers: number;
    following: number;
    totalScrobbles: number;
  };
  recentTracks: Array<{
    title: string;
    artist: string;
    artwork: string;
    platform: string;
  }>;
}

const UserProfile = ({ user, recentTracks }: UserProfileProps) => {
  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-start gap-4 mb-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
          <p className="text-muted-foreground mb-2">@{user.username}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3 w-3" />
            {user.location}
          </div>
          <p className="text-foreground mb-4 break-words overflow-hidden">{user.bio}</p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-music-primary" />
              <span className="font-semibold">{user.followers}</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-music-secondary" />
              <span className="font-semibold">{user.following}</span>
              <span className="text-muted-foreground">following</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4 text-music-tertiary" />
              <span className="font-semibold">{user.totalScrobbles}</span>
              <span className="text-muted-foreground">scrobbles</span>
            </div>
          </div>
        </div>
        <Button variant="music">Follow</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Tracks</h3>
        <div className="space-y-3">
          {recentTracks.slice(0, 5).map((track, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <img 
                src={track.artwork} 
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{track.title}</p>
                <p className="text-muted-foreground text-xs">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground">{track.platform}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;