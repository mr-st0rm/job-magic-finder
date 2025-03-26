
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

// Page components
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import MyJobs from "./pages/MyJobs";
import CreateJob from "./pages/CreateJob";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Search from "./pages/Search";
import EditJob from "./pages/EditJob";

/**
 * Create a query client instance for React Query
 * This will be used for data fetching and caching
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetches when window is focused
      retry: 1, // Only retry failed requests once
    },
  },
});

/**
 * Main application component
 * Sets up providers and routing for the application
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        {/* Toast notifications */}
        <Toaster />
        <Sonner />
        
        {/* Application routing */}
        <BrowserRouter>
          <Routes>
            {/* All routes are wrapped with the Layout component for consistent UI */}
            <Route path="/" element={<Layout>{<Home />}</Layout>} />
            <Route path="/job/:id" element={<Layout>{<JobDetail />}</Layout>} />
            <Route path="/profile" element={<Layout>{<Profile />}</Layout>} />
            <Route path="/my-jobs" element={<Layout>{<MyJobs />}</Layout>} />
            <Route path="/create-job" element={<Layout>{<CreateJob />}</Layout>} />
            <Route path="/edit-job/:id" element={<Layout>{<EditJob />}</Layout>} />
            <Route path="/edit-profile" element={<Layout>{<EditProfile />}</Layout>} />
            <Route path="/settings" element={<Layout>{<Settings />}</Layout>} />
            <Route path="/notifications" element={<Layout>{<Notifications />}</Layout>} />
            <Route path="/help" element={<Layout>{<Help />}</Layout>} />
            <Route path="/search" element={<Layout>{<Search />}</Layout>} />
            
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
