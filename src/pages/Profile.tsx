import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Music, Users, ExternalLink, Settings } from "lucide-react";
import Header from "@/components/Header";
import MusicPost from "@/components/MusicPost";

const Profile = () => {
  const user = {
    name: "Alex Chen",
    username: "alexmusic",
    avatar: "/placeholder.svg",
    location: "San Francisco, CA",
    bio: "Music enthusiast 🎵 | Love discovering new artists | Currently obsessed with indie rock",
    followers: 1234,
    following: 567,
    totalScrobbles: 45678,
    joinDate: "March 2023",
    topGenres: ["Indie Rock", "Electronic", "Alternative", "Dream Pop"]
  };

  const recentTracks = [
    { title: "Midnight City", artist: "M83", artwork: "/placeholder.svg", platform: "Spotify", plays: 47 },
    { title: "Electric Feel", artist: "MGMT", artwork: "/placeholder.svg", platform: "Apple Music", plays: 32 },
    { title: "Time to Dance", artist: "The Sounds", artwork: "/placeholder.svg", platform: "YouTube Music", plays: 28 },
    { title: "Digital Love", artist: "Daft Punk", artwork: "/placeholder.svg", platform: "Tidal", plays: 41 },
    { title: "Sleepyhead", artist: "Passion Pit", artwork: "/placeholder.svg", platform: "Deezer", plays: 15 }
  ];

  const topArtists = [
    { name: "Tame Impala", artwork: "/placeholder.svg", plays: 234 },
    { name: "Arctic Monkeys", artwork: "/placeholder.svg", plays: 189 },
    { name: "Glass Animals", artwork: "/placeholder.svg", plays: 156 },
    { name: "MGMT", artwork: "/placeholder.svg", plays: 143 }
  ];

  const userPosts = [
    {
      user: {
        name: "Alex Chen",
        username: "alexmusic",
        avatar: "/placeholder.svg",
        location: "San Francisco, CA"
      },
      track: {
        title: "Borderline",
        artist: "Tame Impala",
        album: "The Slow Rush",
        artwork: "/placeholder.svg",
        platform: "spotify"
      },
      caption: "This track hits different every time. Kevin Parker is a genius! 🌀",
      timestamp: "6h",
      likes: 127,
      comments: 23
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8 bg-gradient-card border-border">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground mb-2">@{user.username}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.location}</span>
              </div>
              
              <p className="text-foreground mb-4 max-w-md">{user.bio}</p>
              
              <div className="flex gap-1 mb-4 justify-center md:justify-start flex-wrap">
                {user.topGenres.map((genre) => (
                  <Badge key={genre} variant="musicSecondary">
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-6 mb-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-xl font-bold text-music-primary">{user.followers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-music-secondary">{user.following.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-music-tertiary">{user.totalScrobbles.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Scrobbles</div>
                </div>
              </div>
              
              <div className="flex gap-2 justify-center md:justify-start">
                <Button variant="musicPrimary">Follow</Button>
                <Button variant="outline">Message</Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6 mt-6">
            {userPosts.map((post, index) => (
              <MusicPost key={index} {...post} />
            ))}
          </TabsContent>
          
          <TabsContent value="music" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Tracks</h2>
              <div className="space-y-3">
                {recentTracks.map((track, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <img src={track.artwork} alt={track.title} className="w-12 h-12 rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium">{track.title}</h3>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{track.plays} plays</p>
                      <Badge variant="outline" className="text-xs">{track.platform}</Badge>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="artists" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {topArtists.map((artist, index) => (
                  <div key={index} className="text-center">
                    <img src={artist.artwork} alt={artist.name} className="w-full aspect-square rounded-lg mb-2" />
                    <h3 className="font-medium">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">{artist.plays} plays</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Listening Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total listening time</span>
                    <span className="font-medium">2,456 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average daily listening</span>
                    <span className="font-medium">4.2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Favorite listening time</span>
                    <span className="font-medium">9 PM - 11 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discovery rate</span>
                    <span className="font-medium">23% new music</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Social Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Posts this month</span>
                    <span className="font-medium">14</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. likes per post</span>
                    <span className="font-medium">67</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Music shared</span>
                    <span className="font-medium">89 tracks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Member since</span>
                    <span className="font-medium">{user.joinDate}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;