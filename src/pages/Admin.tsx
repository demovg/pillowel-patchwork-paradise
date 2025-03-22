
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

const Admin = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inventory: '',
    image: null as File | null,
    imagePreview: ''
  });
  
  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Create a preview URL for the image
      const imagePreview = URL.createObjectURL(file);
      setProductForm(prev => ({
        ...prev,
        image: file,
        imagePreview
      }));
    }
  };
  
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // For this demo, we'll just show a toast
    toast({
      title: "Product added successfully",
      description: `${productForm.name} has been added to the inventory.`,
    });
    
    // Reset the form
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      inventory: '',
      image: null,
      imagePreview: ''
    });
  };
  
  // If not logged in as admin, redirect (handled by App.tsx)
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-black">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Add New Product Form */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Enter the details for a new product</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={productForm.name} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input 
                          id="price" 
                          name="price" 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          value={productForm.price} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select 
                          id="category" 
                          name="category" 
                          value={productForm.category} 
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="clothing">Clothing</option>
                          <option value="accessories">Accessories</option>
                          <option value="home">Home</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="inventory">Inventory</Label>
                        <Input 
                          id="inventory" 
                          name="inventory" 
                          type="number" 
                          min="0" 
                          value={productForm.inventory} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          value={productForm.description} 
                          onChange={handleInputChange} 
                          rows={4} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="image">Product Image</Label>
                        <div className="flex items-center gap-4">
                          <label 
                            htmlFor="image" 
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4" />
                            <span>Upload Image</span>
                            <input 
                              type="file" 
                              id="image" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageUpload} 
                            />
                          </label>
                          {productForm.imagePreview && (
                            <div className="relative h-16 w-16 rounded overflow-hidden">
                              <img 
                                src={productForm.imagePreview} 
                                alt="Product preview" 
                                className="h-full w-full object-cover" 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <CardFooter className="flex justify-end px-0 pb-0">
                      <Button type="submit">Add Product</Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
              
              {/* Product Management Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Summary</CardTitle>
                  <CardDescription>Overview of your product inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Total Products</p>
                      <p className="text-2xl font-semibold">24</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Categories</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Clothing</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Accessories</span>
                          <span className="font-medium">8</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Home</span>
                          <span className="font-medium">4</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Low Stock Items</p>
                      <p className="text-lg font-medium">3 products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">Order management would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>View and manage customer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">Customer management would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
