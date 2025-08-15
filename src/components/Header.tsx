import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, User, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <Music className="h-8 w-8 text-music-primary" />
          <span className="text-xl font-bold bg-gradient-music bg-clip-text text-transparent">
            SonicSync
          </span>
        </div>
        
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
          <Button variant="musicGhost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="musicGhost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;