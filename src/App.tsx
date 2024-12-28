import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./components/audio/AudioContext";
import { GlobalAudioPlayer } from "./components/audio/GlobalAudioPlayer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SongPurchaseForm from "./components/SongPurchaseForm";
import PublicSongs from "./pages/PublicSongs";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Privacy from "./pages/Privacy";
import LyricsEditor from "./pages/LyricsEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AudioProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/order" element={<SongPurchaseForm />} />
            <Route path="/public-songs" element={<PublicSongs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/lyrics/:id" element={<LyricsEditor />} />
          </Routes>
          <GlobalAudioPlayer />
        </BrowserRouter>
      </AudioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;