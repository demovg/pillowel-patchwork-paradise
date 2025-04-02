import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import { Heart, Search, ShoppingBag, User, LogOut, UserCircle, Settings, Package, ShoppingCart, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useShop } from "@/contexts/ShopContext"

export function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Sweaters", "Cotton", "Accessories"
  ]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (!recentSearches.includes(searchTerm)) {
        setRecentSearches(prev => [searchTerm, ...prev.slice(0, 2)]);
      }
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center hover:text-black/70">
          <Search className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[320px]" align="end" sideOffset={10}>
        <div className="space-y-4">
          <h4 className="font-medium">Search</h4>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-black text-white px-3 py-1 rounded-sm text-sm"
            >
              Search
            </button>
          </form>
          <div className="text-sm text-gray-500">
            <p>Recent searches:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {recentSearches.map((term, i) => (
                <Link 
                  key={i} 
                  to={`/shop?search=${encodeURIComponent(term)}`} 
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function UserMenu() {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center hover:text-black/70">
          <User className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('/account')}>
          <UserCircle className="h-4 w-4" />
          <span className="flex-1">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('/orders')}>
          <Package className="h-4 w-4" />
          <span className="flex-1">Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('/settings')}>
          <Settings className="h-4 w-4" />
          <span className="flex-1">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <LogOut className="h-4 w-4" />
          <span className="flex-1">Logout</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigation('/admin/login')}>
          <span className="text-sm text-muted-foreground w-full text-center">
            Admin Access
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function WishlistMenu() {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, addToCart } = useShop();
  
  const handleRemoveFromWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromWishlist(id);
  };
  
  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
  };
  
  const viewWishlist = () => {
    navigate('/wishlist');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center hover:text-black/70">
          <Heart className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px] p-2">
        <DropdownMenuLabel>My Wishlist ({wishlistItems.length})</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto py-1">
          {wishlistItems.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-gray-500 mb-2">Your wishlist is empty</p>
              <Link to="/shop" className="text-sm text-blue-600 hover:underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            wishlistItems.map(item => (
              <div 
                key={item.id} 
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {typeof item.price === 'string' ? item.price : `$${item.price.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="text-gray-500 hover:text-black"
                    onClick={(e) => handleAddToCart(item, e)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={(e) => handleRemoveFromWishlist(item.id, e)}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button 
            onClick={viewWishlist}
            className="w-full justify-center bg-black text-white py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors rounded-sm"
          >
            View All Wishlist Items
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CartMenu() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCartQuantity } = useShop();
  
  const handleRemoveItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromCart(id);
  };
  
  const viewCart = () => {
    navigate('/cart');
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center hover:text-black/70 relative">
          <ShoppingBag className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[350px] p-4">
        <DropdownMenuLabel className="text-lg font-medium pb-2">Your Cart ({cartItems.length})</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {cartItems.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/shop">
              <Button variant="outline" size="sm">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="max-h-[300px] overflow-y-auto py-2 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-3 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                  <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                      <button 
                        onClick={(e) => handleRemoveItem(item.id, e)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <DropdownMenuSeparator className="my-3" />
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">Shipping & taxes calculated at checkout</p>
              
              <div className="space-y-2 pt-2">
                <button 
                  onClick={viewCart}
                  className="block w-full text-center border border-black text-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors rounded-sm"
                >
                  View Cart
                </button>
                <button 
                  onClick={handleCheckout}
                  className="block w-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/80 transition-colors rounded-sm"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
