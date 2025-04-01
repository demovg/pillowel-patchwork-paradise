
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '@/contexts/ShopContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, editProduct } = useShop();
  const { toast } = useToast();
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inventory: '',
    image: '',
    active: true
  });

  useEffect(() => {
    if (id) {
      const product = getProduct(id);
      if (product) {
        setProductForm({
          name: product.name,
          description: product.description || '',
          price: product.price.toString(),
          category: product.category,
          inventory: product.inventory.toString(),
          image: product.image,
          active: product.active !== false
        });
      } else {
        // Product not found, redirect to admin page
        navigate('/admin');
        toast({
          variant: "destructive",
          title: "Product not found",
          description: "The requested product could not be found."
        });
      }
    }
  }, [id, getProduct, navigate, toast]);
  
  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
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
    
    // Update the product
    editProduct({
      id: id!,
      name: productForm.name,
      description: productForm.description,
      price: parseFloat(productForm.price),
      category: productForm.category,
      inventory: parseInt(productForm.inventory),
      image: productForm.image,
      active: productForm.active
    });
    
    // Redirect back to admin page
    navigate('/admin');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-black">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold">Edit Product</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>Update product details</CardDescription>
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
                    <option value="Knitwear">Knitwear</option>
                    <option value="Shirts">Shirts</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Accessories">Accessories</option>
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
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={productForm.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {productForm.image && (
                    <div className="mt-2">
                      <img 
                        src={productForm.image} 
                        alt="Product preview" 
                        className="h-24 w-24 object-cover rounded" 
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <CardFooter className="flex justify-end px-0 pb-0 pt-4">
                <Button type="submit">Update Product</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditProduct;
