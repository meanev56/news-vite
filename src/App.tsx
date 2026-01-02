import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./pages/Article";
import Sports from "./pages/Sports";
import Banking from "./pages/Banking";
import Markets from "./pages/Markets";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRouter";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Bookmarks from "./pages/dashboard/Bookmarks";
import Profile from "./pages/dashboard/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
