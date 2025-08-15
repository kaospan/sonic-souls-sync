import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, Link, Image, MapPin } from "lucide-react";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [trackUrl, setTrackUrl] = useState("");

  const platforms = [
    { name: "Spotify", color: "text-green-500", icon: "🎵" },
    { name: "Apple Music", color: "text-gray-300", icon: "🎶" },
    { name: "YouTube Music", color: "text-red-500", icon: "📺" },
    { name: "Tidal", color: "text-blue-400", icon: "🌊" },
    { name: "Deezer", color: "text-orange-500", icon: "🎤" },
  ];

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex gap-3 mb-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>YU</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea 
            placeholder="Share what you're listening to..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-20 bg-background border-border resize-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Link className="h-4 w-4 text-music-primary" />
          <span className="text-sm font-medium text-foreground">Add Music Link</span>
        </div>
        <Input 
          placeholder="Paste link from Spotify, Apple Music, YouTube Music, etc."
          value={trackUrl}
          onChange={(e) => setTrackUrl(e.target.value)}
          className="bg-background border-border"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Music className="h-4 w-4 text-music-secondary" />
          <span className="text-sm font-medium text-foreground">Supported Platforms</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm">
              <span>{platform.icon}</span>
              <span className={platform.color}>{platform.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="music" disabled={!caption.trim()}>
          Share
        </Button>
      </div>
    </Card>
  );
};

export default CreatePost;