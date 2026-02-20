import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, User, Bell, Compass, MessageCircle, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-8 w-8 text-music-primary" />
          <span className="text-xl font-bold bg-gradient-music bg-clip-text text-transparent">
            CladeSync
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 ml-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-music-primary ${
              location.pathname === '/' ? 'text-music-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/discover" 
            className={`text-sm font-medium transition-colors hover:text-music-primary ${
              location.pathname === '/discover' ? 'text-music-primary' : 'text-muted-foreground'
            }`}
          >
            Discover
          </Link>
          <Link 
            to="/messages" 
            className={`text-sm font-medium transition-colors hover:text-music-primary ${
              location.pathname === '/messages' ? 'text-music-primary' : 'text-muted-foreground'
            }`}
          >
            Messages
          </Link>
          <Link 
            to="/profile" 
            className={`text-sm font-medium transition-colors hover:text-music-primary ${
              location.pathname === '/profile' ? 'text-music-primary' : 'text-muted-foreground'
            }`}
          >
            Profile
          </Link>
          <Link 
            to="/artists" 
            className={`text-sm font-medium transition-colors hover:text-music-primary ${
              location.pathname === '/artists' ? 'text-music-primary' : 'text-muted-foreground'
            }`}
          >
            Artists
          </Link>
        </nav>
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search artists, users, or songs..." 
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="musicGhost" size="icon" asChild>
            <Link to="/discover">
              <Compass className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="musicGhost" size="icon" asChild>
            <Link to="/messages">
              <MessageCircle className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="musicGhost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="musicGhost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="musicGhost" size="icon" asChild>
            <Link to="/profile">
              <User className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;