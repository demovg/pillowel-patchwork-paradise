
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { ShopProvider } from "./contexts/ShopContext";
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
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import EditProduct from "./pages/EditProduct";
import CustomerDetail from "./pages/CustomerDetail";
import OrderDetail from "./pages/OrderDetail";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

// Create auth context to manage admin authentication
export const AuthContext = createContext<{
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  userLogin: (email: string, password: string) => boolean;
  userRegister: (name: string, email: string, password: string) => boolean;
  user: { name: string; email: string } | null;
}>({
  isAdmin: false,
  isLoggedIn: false,
  login: () => false,
  logout: () => {},
  userLogin: () => false,
  userRegister: () => false,
  user: null,
});

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Check for admin status in local storage on initial load
  useEffect(() => {
    const storedAdminStatus = localStorage.getItem("isAdmin");
    if (storedAdminStatus === "true") {
      setIsAdmin(true);
    }
    
    // Check for user login status
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
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
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
  };
  
  // User authentication
  const userLogin = (email: string, password: string) => {
    // In a real app, validate credentials against a database
    // This is just a simple demo
    if (email && password) {
      const userData = { name: email.split('@')[0], email };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };
  
  const userRegister = (name: string, email: string, password: string) => {
    // In a real app, store user data in a database
    // This is just a simple demo
    if (name && email && password) {
      const userData = { name, email };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAdmin, isLoggedIn, login, logout, userLogin, userRegister, user }}>
        <ShopProvider>
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
                <Route path="/admin/edit-product/:id" element={isAdmin ? <EditProduct /> : <AdminLogin />} />
                <Route path="/admin/customer/:id" element={isAdmin ? <CustomerDetail /> : <AdminLogin />} />
                <Route path="/admin/order/:id" element={isAdmin ? <OrderDetail /> : <AdminLogin />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/sign-up" element={<SignUp />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ShopProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
