
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { useToast } from "@/components/ui/use-toast";
import { Lock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Small delay to simulate authentication
    setTimeout(() => {
      const isSuccessful = login(password);
      
      if (isSuccessful) {
        navigate('/admin');
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Invalid admin credentials. Please try again.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Lock className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-2">
              Enter your password to access the admin panel
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Admin Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                For demo purposes, use: "admin123"
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
              Return to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
