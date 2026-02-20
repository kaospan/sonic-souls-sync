import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DemoFeed from "./pages/DemoFeed";
import InvestorDashboard from "./pages/InvestorDashboard";

const queryClient = new QueryClient();

const isDev = import.meta.env.DEV;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {isDev && (
          <nav className="fixed bottom-4 right-4 z-50 flex gap-2 bg-background border rounded-lg px-3 py-2 shadow text-xs">
            <Link to="/demo-feed" className="text-primary hover:underline">Demo Feed</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/investor" className="text-primary hover:underline">Investor</Link>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/demo-feed" element={<DemoFeed />} />
          <Route path="/investor" element={<InvestorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
