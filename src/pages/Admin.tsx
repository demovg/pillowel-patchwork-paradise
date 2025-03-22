
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

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

  // Mock product data for the products table
  const [products] = useState([
    { id: 1, name: 'Organic Cotton Sweater', category: 'clothing', price: 120, inventory: 25, active: true },
    { id: 2, name: 'Merino Wool Cardigan', category: 'clothing', price: 145, inventory: 18, active: true },
    { id: 3, name: 'Linen Tote Bag', category: 'accessories', price: 45, inventory: 32, active: true },
    { id: 4, name: 'Ceramic Vase', category: 'home', price: 65, inventory: 12, active: false },
  ]);
  
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
  
  // Function to clear image selection
  const clearImageSelection = () => {
    if (productForm.imagePreview) {
      URL.revokeObjectURL(productForm.imagePreview);
    }
    setProductForm(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
  };
  
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!productForm.name || !productForm.price || !productForm.category || !productForm.inventory) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill out all required fields."
      });
      return;
    }
    
    // Here you would typically send the data to your backend
    // For this demo, we'll just show a toast
    toast({
      title: "Product added successfully",
      description: `${productForm.name} has been added to the inventory.`
    });
    
    // Reset the form
    clearImageSelection();
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
  
  // Redirect to login if not admin - fix the conditional rendering
  if (!isAdmin) {
    // Just redirect and don't render anything else
    navigate('/admin/login');
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
                        <Label htmlFor="name">Product Name *</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={productForm.name} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($) *</Label>
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
                        <Label htmlFor="category">Category *</Label>
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
                        <Label htmlFor="inventory">Inventory *</Label>
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
                            <div className="relative h-16 w-16 rounded overflow-hidden group">
                              <img 
                                src={productForm.imagePreview} 
                                alt="Product preview" 
                                className="h-full w-full object-cover" 
                              />
                              <button
                                type="button"
                                onClick={clearImageSelection}
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Remove
                              </button>
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
                      <p className="text-2xl font-semibold">{products.length}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Categories</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Clothing</span>
                          <span className="font-medium">{products.filter(p => p.category === 'clothing').length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Accessories</span>
                          <span className="font-medium">{products.filter(p => p.category === 'accessories').length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Home</span>
                          <span className="font-medium">{products.filter(p => p.category === 'home').length}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Low Stock Items</p>
                      <p className="text-lg font-medium">{products.filter(p => p.inventory < 20).length} products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Products Table */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Product List</CardTitle>
                <CardDescription>Manage your existing products</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Inventory</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="capitalize">{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.inventory}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch id={`status-${product.id}`} defaultChecked={product.active} />
                            <Label htmlFor={`status-${product.id}`}>
                              {product.active ? 'Active' : 'Inactive'}
                            </Label>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#1001</TableCell>
                      <TableCell>John Smith</TableCell>
                      <TableCell>March 21, 2025</TableCell>
                      <TableCell>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Completed
                        </span>
                      </TableCell>
                      <TableCell>$265.00</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#1002</TableCell>
                      <TableCell>Sarah Johnson</TableCell>
                      <TableCell>March 20, 2025</TableCell>
                      <TableCell>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          Processing
                        </span>
                      </TableCell>
                      <TableCell>$120.00</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">1</TableCell>
                      <TableCell>John Smith</TableCell>
                      <TableCell>john.smith@example.com</TableCell>
                      <TableCell>Feb 10, 2025</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2</TableCell>
                      <TableCell>Sarah Johnson</TableCell>
                      <TableCell>sarah.j@example.com</TableCell>
                      <TableCell>Jan 25, 2025</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
