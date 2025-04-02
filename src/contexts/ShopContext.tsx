import { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define types for our context
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type WishlistItem = {
  id: number;
  name: string;
  price: string | number;
  image: string;
};

type Product = {
  id: string | number;
  name: string;
  price: number;
  category: string;
  description?: string;
  inventory: number;
  image: string;
  active?: boolean;
  colors?: string[];
  sizes?: string[];
  gallery?: string[];
  details?: string[];
  rating?: number;
  reviewCount?: number;
};

type ShopContextType = {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  products: Product[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, change: number) => void;
  addToWishlist: (product: any) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number | string) => boolean;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  getProduct: (id: string | number) => Product | undefined;
  clearCart: () => void;
};

// Create context with default values
const ShopContext = createContext<ShopContextType>({
  cartItems: [],
  wishlistItems: [],
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  addProduct: () => {},
  editProduct: () => {},
  getProduct: () => undefined,
  clearCart: () => {},
});

// Export the provider component
export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  // Sample initial products data
  const initialProducts = [
    {
      id: '1',
      name: 'Organic Cotton Sweater',
      price: 120,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=3327&auto=format&fit=crop',
      category: 'Knitwear',
      inventory: 25,
      description: 'Our organic cotton sweater combines comfort with style. Made from 100% GOTS-certified organic cotton.',
      active: true
    },
    {
      id: '2',
      name: 'Merino Wool Cardigan',
      price: 145,
      image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=3387&auto=format&fit=crop',
      category: 'Knitwear',
      inventory: 18,
      description: 'Our premium Merino wool cardigan offers exceptional warmth and softness.',
      active: true
    },
    {
      id: '3',
      name: 'Linen Blend Shirt',
      price: 85,
      image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3311&auto=format&fit=crop',
      category: 'Shirts',
      inventory: 30,
      description: 'A breathable linen blend shirt perfect for warm weather.',
      active: true
    },
    {
      id: '4',
      name: 'Silk Scarf',
      price: 65,
      image: 'https://images.unsplash.com/photo-1599391398502-967381c4795a?q=80&w=3387&auto=format&fit=crop',
      category: 'Accessories',
      inventory: 40,
      description: 'A luxurious silk scarf with a beautiful print.',
      active: true
    }
  ];

  // Initialize state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Organic Cotton Sweater",
      price: 120.0,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68"
    },
    {
      id: 2,
      name: "Merino Wool Cardigan",
      price: 145.0,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1564859228273-274232fdb516"
    }
  ]);
  
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Cashmere Sweater",
      price: "$189.00",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27"
    },
    {
      id: 2,
      name: "Linen Shirt Dress",
      price: "$145.00",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8"
    },
    {
      id: 3,
      name: "Leather Crossbody Bag",
      price: "$210.00",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7"
    }
  ]);
  
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Cart functions
  const addToCart = (product: any, quantity: number = 1) => {
    const productId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prev, { 
          id: productId, 
          name: product.name, 
          price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price, 
          quantity: quantity,
          image: product.image 
        }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart."
    });
  };

  const updateCartQuantity = (id: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Wishlist functions
  const addToWishlist = (product: any) => {
    const productId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
    
    if (!wishlistItems.some(item => item.id === productId)) {
      setWishlistItems(prev => [...prev, { 
        id: productId, 
        name: product.name, 
        price: product.price,
        image: product.image 
      }]);
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`
      });
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist."
    });
  };

  const isInWishlist = (id: number | string) => {
    const numId = typeof id === 'string' ? parseInt(id) : id;
    return wishlistItems.some(item => item.id === numId);
  };

  // Product management functions
  const addProduct = (product: Product) => {
    const highestId = Math.max(...products.map(p => typeof p.id === 'string' ? parseInt(p.id) : p.id), 0);
    const newProduct = { ...product, id: (highestId + 1).toString() };
    
    setProducts(prev => [...prev, newProduct]);
    toast({
      title: "Product added",
      description: `${product.name} has been added to the inventory.`
    });
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated.`
    });
  };

  const getProduct = (id: string | number) => {
    return products.find(product => product.id.toString() === id.toString());
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    });
  };

  // Provide context value
  const value = {
    cartItems,
    wishlistItems,
    products,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addProduct,
    editProduct,
    getProduct,
    clearCart
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Export hook for consuming the context
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
