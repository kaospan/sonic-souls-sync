import Header from "@/components/Header";
import CreatePost from "@/components/CreatePost";
import MusicPost from "@/components/MusicPost";
import UserProfile from "@/components/UserProfile";
import MusicDiscovery from "@/components/MusicDiscovery";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  // Mock data for demo
  const mockUser = {
    name: "Alex Chen",
    username: "alexmusic",
    avatar: "/placeholder.svg",
    location: "San Francisco, CA",
    bio: "Music enthusiast 🎵 | Love discovering new artists | Currently obsessed with indie rock",
    followers: 1234,
    following: 567,
    totalScrobbles: 45678
  };

  const mockRecentTracks = [
    { title: "Midnight City", artist: "M83", artwork: "/placeholder.svg", platform: "Spotify" },
    { title: "Electric Feel", artist: "MGMT", artwork: "/placeholder.svg", platform: "Apple Music" },
    { title: "Time to Dance", artist: "The Sounds", artwork: "/placeholder.svg", platform: "YouTube Music" },
    { title: "Digital Love", artist: "Daft Punk", artwork: "/placeholder.svg", platform: "Tidal" },
    { title: "Sleepyhead", artist: "Passion Pit", artwork: "/placeholder.svg", platform: "Deezer" }
  ];

  const mockPosts = [
    {
      user: {
        name: "Sarah Wilson",
        username: "sarahbeats",
        avatar: "/placeholder.svg",
        location: "Brooklyn, NY"
      },
      track: {
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        artwork: "/placeholder.svg",
        platform: "spotify"
      },
      caption: "This song never gets old! Perfect for late night drives 🌃",
      timestamp: "2h",
      likes: 42,
      comments: 8
    },
    {
      user: {
        name: "Mike Rodriguez",
        username: "mikevibes",
        avatar: "/placeholder.svg",
        location: "Los Angeles, CA"
      },
      track: {
        title: "As It Was",
        artist: "Harry Styles",
        album: "Harry's House",
        artwork: "/placeholder.svg",
        platform: "apple"
      },
      caption: "Harry Styles absolutely killed it with this album. Pure vibes! ✨",
      timestamp: "4h",
      likes: 89,
      comments: 15
    }
  ];

  const mockNearbyUsers = [
    {
      id: "1",
      name: "Emma Thompson",
      username: "emmamusic",
      avatar: "/placeholder.svg",
      location: "2.3 km",
      distance: "2.3 km",
      commonArtists: ["Arctic Monkeys", "The Strokes", "Vampire Weekend"],
      matchPercentage: 87
    },
    {
      id: "2", 
      name: "David Kim",
      username: "davidbeats",
      avatar: "/placeholder.svg",
      location: "1.8 km",
      distance: "1.8 km",
      commonArtists: ["Tame Impala", "Glass Animals", "Foster the People"],
      matchPercentage: 73
    }
  ];

  const mockTrendingTracks = [
    { title: "As It Was", artist: "Harry Styles", artwork: "/placeholder.svg", listeners: 123456 },
    { title: "Heat Waves", artist: "Glass Animals", artwork: "/placeholder.svg", listeners: 98765 },
    { title: "Shivers", artist: "Ed Sheeran", artwork: "/placeholder.svg", listeners: 87654 },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber", artwork: "/placeholder.svg", listeners: 76543 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Connect Through Music
          </h1>
          <p className="text-xl text-gray-200">
            Discover people with your musical taste. Share, connect, and explore together.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <UserProfile user={mockUser} recentTracks={mockRecentTracks} />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-1 space-y-6">
            <CreatePost />
            
            <div className="space-y-6">
              {mockPosts.map((post, index) => (
                <MusicPost key={index} {...post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Discovery */}
          <div className="lg:col-span-1">
            <MusicDiscovery 
              nearbyUsers={mockNearbyUsers}
              trendingTracks={mockTrendingTracks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
