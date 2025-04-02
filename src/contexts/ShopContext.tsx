
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "../App";

// Define types for our context
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type WishlistItem = {
  id: number | string;
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
  removeFromWishlist: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  getProduct: (id: string | number) => Product | undefined;
  clearCart: () => void;
  fetchWishlistItems: () => Promise<void>;
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
  fetchWishlistItems: async () => {},
});

// Export the provider component
export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { isLoggedIn, user } = useContext(AuthContext);
  
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
  
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Fetch wishlist items from Supabase on login status change
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchWishlistItems();
    } else {
      setWishlistItems([]);
    }
  }, [isLoggedIn, user]);

  // Fetch wishlist items from Supabase
  const fetchWishlistItems = async () => {
    if (!isLoggedIn || !user) {
      console.log("User not logged in, can't fetch wishlist items");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*');
      
      if (error) {
        console.error('Error fetching wishlist items:', error);
        toast({
          title: "Error",
          description: "Failed to load wishlist items"
        });
        return;
      }
      
      if (data) {
        const formattedItems: WishlistItem[] = data.map(item => ({
          id: item.id,
          name: item.product_name,
          price: item.product_price,
          image: item.product_image
        }));
        
        setWishlistItems(formattedItems);
      }
    } catch (err) {
      console.error('Exception fetching wishlist items:', err);
      toast({
        title: "Error",
        description: "Failed to load wishlist items"
      });
    }
  };

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
  const addToWishlist = async (product: any) => {
    if (!isLoggedIn || !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your wishlist."
      });
      return;
    }
    
    const productId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
    
    // Check if already in wishlist
    if (isInWishlist(productId)) {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist.`
      });
      return;
    }
    
    try {
      // Add to Supabase
      const { data, error } = await supabase
        .from('wishlist_items')
        .insert([{
          user_id: user.email, // Using the email as user ID for demo
          product_id: productId,
          product_name: product.name,
          product_price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price,
          product_image: product.image
        }])
        .select();
      
      if (error) {
        console.error("Error adding to wishlist:", error);
        toast({
          title: "Error",
          description: "Failed to add item to wishlist"
        });
        return;
      }
      
      if (data && data.length > 0) {
        // Add to local state
        setWishlistItems(prev => [...prev, { 
          id: data[0].id,
          name: product.name, 
          price: product.price,
          image: product.image 
        }]);
        
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`
        });
      }
    } catch (err) {
      console.error("Exception adding to wishlist:", err);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist"
      });
    }
  };

  const removeFromWishlist = async (id: number | string) => {
    if (!isLoggedIn || !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to remove items from your wishlist."
      });
      return;
    }
    
    try {
      // Remove from Supabase
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error removing from wishlist:", error);
        toast({
          title: "Error",
          description: "Failed to remove item from wishlist"
        });
        return;
      }
      
      // Remove from local state
      setWishlistItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist."
      });
    } catch (err) {
      console.error("Exception removing from wishlist:", err);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist"
      });
    }
  };

  const isInWishlist = (id: number | string) => {
    const stringId = id.toString();
    return wishlistItems.some(item => 
      item.id.toString() === stringId || 
      (typeof item.id === 'number' && item.id === Number(id))
    );
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
    clearCart,
    fetchWishlistItems
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
