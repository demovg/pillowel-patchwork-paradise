
import { useState, useContext } from 'react';
import { AuthContext } from '@/App';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Account = () => {
  const { isLoggedIn, user, userLogin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please enter both email and password."
      });
      return;
    }
    
    const success = userLogin(formData.email, formData.password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "You have been logged in successfully."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again."
      });
    }
  };
  
  // If user is logged in, show account info
  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-semibold mb-8">My Account</h1>
              
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-medium">Account Information</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/orders')}
                      className="mr-4"
                    >
                      View Orders
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => navigate('/settings')}
                      className="mr-4"
                    >
                      Account Settings
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={() => {
                        logout();
                        toast({
                          title: "Logged out",
                          description: "You have been logged out successfully."
                        });
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If user is not logged in, show login form
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-3xl font-semibold mb-8 text-center">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Forgot Password?
                </Button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          
          <p className="text-center mt-6">
            Don't have an account?{' '}
            <Button variant="link" className="p-0" onClick={() => navigate('/sign-up')}>
              Create one
            </Button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
