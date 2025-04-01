
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Heart, Search, ShoppingBag, User, LogOut, UserCircle, Settings, Package, ShoppingCart } from "lucide-react"
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

export function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Sweaters", "Cotton", "Accessories"
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchTerm)) {
        setRecentSearches(prev => [searchTerm, ...prev.slice(0, 2)]);
      }
      // Redirect would happen here in a real implementation
      window.location.href = `/shop?search=${encodeURIComponent(searchTerm)}`;
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
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <UserCircle className="h-4 w-4" />
          <Link to="/account" className="flex-1">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Package className="h-4 w-4" />
          <Link to="/orders" className="flex-1">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Settings className="h-4 w-4" />
          <Link to="/settings" className="flex-1">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <LogOut className="h-4 w-4" />
          <span className="flex-1">Logout</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/admin/login" className="text-sm text-muted-foreground w-full text-center">
            Admin Access
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function WishlistMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center hover:text-black/70">
          <Heart className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px] p-2">
        <DropdownMenuLabel>My Wishlist (3)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto py-1">
          {[
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
          ].map(item => (
            <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
              <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-sm text-gray-500">{item.price}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-black">
                  <ShoppingCart className="h-4 w-4" />
                </button>
                <button className="text-gray-500 hover:text-red-500">
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            to="/wishlist"
            className="w-full justify-center bg-black text-white py-2 text-sm font-medium hover:bg-black/90 transition-colors rounded-sm"
          >
            View All Wishlist Items
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CartMenu() {
  const { toast } = useToast();
  
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would redirect to checkout in a real implementation."
    });
  };
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 bg-transparent p-0 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
            <ShoppingBag className="h-5 w-5" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute right-0 p-4 bg-white shadow-lg rounded-md border w-[300px] z-[100]">
            <div className="space-y-4">
              <h4 className="font-medium">Your Cart (2)</h4>
              
              <div className="space-y-3">
                <div className="flex gap-3 pb-3 border-b">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1562157873-818bc0726f68" 
                      alt="Product" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Organic Cotton Sweater</p>
                    <p className="text-sm text-gray-500">1 × $120.00</p>
                  </div>
                </div>
                
                <div className="flex gap-3 pb-3 border-b">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1564859228273-274232fdb516" 
                      alt="Product" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Merino Wool Cardigan</p>
                    <p className="text-sm text-gray-500">1 × $145.00</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>$265.00</span>
              </div>
              
              <div className="space-y-2">
                <Link 
                  to="/cart" 
                  className="block text-center border border-black text-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors rounded-sm"
                >
                  View Cart
                </Link>
                <button 
                  onClick={handleCheckout}
                  className="block w-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-pillowel-800 transition-colors rounded-sm"
                >
                  Checkout
                </button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
