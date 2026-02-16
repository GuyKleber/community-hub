import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Beliefs from "./pages/Beliefs";
import Missions from "./pages/Missions";
import Purpose from "./pages/Purpose";
import History from "./pages/History";
import Calendar from "./pages/Calendar";
import Donations from "./pages/Donations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/beliefs" element={<Beliefs />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/purpose" element={<Purpose />} />
          <Route path="/history" element={<History />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/donations" element={<Donations />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
