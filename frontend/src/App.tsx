import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LanguageProvider } from "@/context/LanguageContext";
import Navigation from "@/components/Navigation";
import Home from "./pages/Home";
import DiseaseDetection from "./pages/DiseaseDetection";
import Weather from "./pages/Weather";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import StreamlitRedirect from "./pages/StreamlitRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="farming-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/disease-detection" element={<StreamlitRedirect />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/chatbot" element={<Chatbot />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
