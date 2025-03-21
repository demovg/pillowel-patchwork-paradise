
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

// Create auth context to manage admin authentication
export const AuthContext = createContext<{
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check for admin status in local storage on initial load
  useEffect(() => {
    const storedAdminStatus = localStorage.getItem("isAdmin");
    if (storedAdminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Simple authentication for demo purposes
  const login = (password: string) => {
    if (password === "admin123") { // In a real app, use proper authentication
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAdmin, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={isAdmin ? <Admin /> : <AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
