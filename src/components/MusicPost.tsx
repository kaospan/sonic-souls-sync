import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Play, MapPin } from "lucide-react";

interface MusicPostProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    location: string;
  };
  track: {
    title: string;
    artist: string;
    album: string;
    artwork: string;
    platform: string;
  };
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const MusicPost = ({ user, track, caption, timestamp, likes, comments }: MusicPostProps) => {
  const platformColors = {
    spotify: "text-green-500",
    apple: "text-gray-300",
    youtube: "text-red-500",
    tidal: "text-blue-400",
    deezer: "text-orange-500",
  };

  return (
    <Card className="p-6 bg-gradient-card border-border hover:border-music-primary/20 transition-all duration-300">
      <div className="flex items-start gap-3 mb-4">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <span className="text-muted-foreground">@{user.username}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground text-sm">{timestamp}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {user.location}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative group">
          <img 
            src={track.artwork} 
            alt={`${track.album} by ${track.artist}`}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{track.title}</h4>
          <p className="text-muted-foreground">{track.artist}</p>
          <p className="text-sm text-muted-foreground">{track.album}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
              via <span className={platformColors[track.platform as keyof typeof platformColors] || "text-foreground"}>{track.platform}</span>
            </span>
          </div>
        </div>
      </div>

      <p className="text-foreground mb-4">{caption}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-music-primary">
            <Heart className="h-4 w-4" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-music-secondary">
            <MessageCircle className="h-4 w-4" />
            {comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-music-tertiary">
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default MusicPost;