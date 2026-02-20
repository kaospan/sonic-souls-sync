import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  targetUserId: string;
  currentUserId: string;
  initialFollowing?: boolean;
}

export function FollowButton({
  targetUserId,
  currentUserId,
  initialFollowing = false,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const action = following ? "unfollow" : "follow";
      const res = await fetch(`/api/demo/users/${targetUserId}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId: currentUserId }),
      });
      if (res.ok) {
        setFollowing((f) => !f);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={following ? "outline" : "default"}
      size="sm"
      onClick={toggle}
      disabled={loading}
    >
      {following ? "Unfollow" : "Follow"}
    </Button>
  );
}
