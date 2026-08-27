import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/components/AdminAuthProvider";
import { AdminRoute } from "@/components/AdminRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Beliefs from "./pages/Beliefs";
import Missions from "./pages/Missions";
import Purpose from "./pages/Purpose";
import History from "./pages/History";
import Calendar from "./pages/Calendar";
import ThisWeek from "./pages/ThisWeek";
import Booknight from "./pages/Booknight";
import Campfire from "./pages/Campfire";
import Donations from "./pages/Donations";
import ChurchRental from "./pages/ChurchRental";
import Newsletter from "./pages/Newsletter";
import NotFound from "./pages/NotFound";
import TacoBarSignup from "./pages/TacoBarSignup";
import LegacySunday from "./pages/LegacySunday";
import WomensTea from "./pages/WomensTea";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
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
            <Route path="/this-week" element={<ThisWeek />} />
            <Route path="/booknight" element={<Booknight />} />
            <Route path="/campfire" element={<Campfire />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/church-rental" element={<ChurchRental />} />
            <Route path="/taco-bar-signup" element={<TacoBarSignup />} />
            <Route path="/legacy-sunday" element={<LegacySunday />} />
            <Route path="/womens-tea" element={<WomensTea />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
