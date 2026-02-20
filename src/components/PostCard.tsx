import { useState } from "react";
import { Heart, MessageCircle, Music } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

interface PostCardProps {
  post: Post;
  authorName?: string;
  authorAvatar?: string;
}

export function PostCard({ post, authorName, authorAvatar }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    const res = await fetch(`/api/demo/posts/${post.id}/like`, { method: "POST" });
    if (res.ok) {
      setLikes((l) => l + 1);
      setLiked(true);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Avatar className="h-9 w-9">
          {authorAvatar ? (
            <AvatarImage src={authorAvatar} alt={authorName} />
          ) : null}
          <AvatarFallback>{(authorName ?? "U")[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold leading-none">{authorName ?? "Unknown"}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-1">
          <Music className="h-4 w-4 text-primary" />
          <span className="font-medium">{post.title}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={liked ? "text-red-500" : ""}
            onClick={handleLike}
          >
            <Heart className="h-4 w-4 mr-1" />
            {likes}
          </Button>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            {post.comments.length}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
