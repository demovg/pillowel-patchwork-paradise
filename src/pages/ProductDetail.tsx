
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: '1',
    name: 'Organic Cotton Sweater',
    price: 120,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=3327&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=3327&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=3464&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=3276&auto=format&fit=crop',
    ],
    description: 'Our organic cotton sweater combines comfort with style. Made from 100% GOTS-certified organic cotton, this piece features a classic design with a modern fit that looks great dressed up or down.',
    details: [
      'Made from 100% GOTS-certified organic cotton',
      'Medium weight, perfect for transitional seasons',
      'Ribbed cuffs and hem',
      'Classic crew neck design',
      'Available in sizes XS-XXL'
    ],
    category: 'Knitwear',
    isNew: true,
    colors: ['Cream', 'Navy', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '2',
    name: 'Merino Wool Cardigan',
    price: 145,
    image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=3387&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=3387&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596785233590-2a96a8f67ffc?q=80&w=3276&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515664069236-68a74c369fe0?q=80&w=3270&auto=format&fit=crop',
    ],
    description: 'Our premium Merino wool cardigan offers exceptional warmth and softness. Featuring a timeless design with practical button closure, this versatile piece works well for both casual and formal occasions.',
    details: [
      'Made from 100% non-mulesed Merino wool',
      'Breathable and temperature-regulating',
      'Button-up front closure',
      'Two practical front pockets',
      'Available in sizes XS-XXL'
    ],
    category: 'Knitwear',
    isNew: true,
    colors: ['Charcoal', 'Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  // Add more products with similar structure
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image || '');
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-medium mb-4">Product Not Found</h1>
            <p>Sorry, we couldn't find the product you're looking for.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}, ${selectedColor}) has been added to your cart.`,
    });
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isLiked ? "removed from" : "added to"} your wishlist.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((image, index) => (
                  <button 
                    key={index}
                    className="aspect-square bg-gray-100 rounded-sm overflow-hidden"
                    onClick={() => setMainImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-pillowel-500 uppercase text-sm tracking-wide mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl font-medium">{product.name}</h1>
                <p className="text-xl font-medium mt-2">${product.price.toFixed(2)}</p>
              </div>
              
              {/* Color Selection */}
              <div>
                <p className="font-medium mb-3">Color: <span className="font-normal">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : 'border-gray-200'
                      }`}
                      style={{ 
                        backgroundColor: 
                          color.toLowerCase() === 'cream' ? '#F5F5DC' : 
                          color.toLowerCase() === 'navy' ? '#000080' : 
                          color.toLowerCase() === 'black' ? '#000000' : 
                          color.toLowerCase() === 'charcoal' ? '#36454F' : 
                          color.toLowerCase() === 'burgundy' ? '#800020' : 
                          '#FFFFFF'
                      }}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div>
                <div className="flex justify-between mb-3">
                  <p className="font-medium">Size: <span className="font-normal">{selectedSize || 'Select Size'}</span></p>
                  <button className="text-sm underline">Size Guide</button>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div>
                <p className="font-medium mb-3">Quantity:</p>
                <div className="flex border border-gray-200 w-32">
                  <button 
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-pillowel-800"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button 
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-pillowel-800"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-black hover:bg-pillowel-800 text-white flex items-center justify-center gap-2 h-12"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </Button>
                <Button 
                  onClick={handleLike}
                  variant="outline"
                  className="w-12 h-12 flex items-center justify-center border-gray-200"
                >
                  <Heart 
                    size={18} 
                    className={isLiked ? "text-red-500 fill-red-500" : ""} 
                  />
                </Button>
              </div>
              
              {/* Product Information Tabs */}
              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="grid grid-cols-3 mb-6 border-b rounded-none bg-transparent h-auto">
                  <TabsTrigger 
                    value="description" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent h-12"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent h-12"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shipping" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent h-12"
                  >
                    Shipping
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="text-pillowel-600">
                  <p>{product.description}</p>
                </TabsContent>
                <TabsContent value="details">
                  <ul className="list-disc pl-5 space-y-2 text-pillowel-600">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="text-pillowel-600">
                  <p className="mb-4">Free standard shipping on all orders over $100.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery: 1-2 business days</li>
                    <li>Free returns within 30 days</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
