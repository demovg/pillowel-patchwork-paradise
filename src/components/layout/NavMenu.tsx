
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Search, ShoppingBag, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function SearchMenu() {
  return (
    <Popover>
      <PopoverTrigger>
        <Search className="h-5 w-5" />
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[320px] right-0">
        <div className="space-y-4">
          <h4 className="font-medium">Search</h4>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <div className="text-sm text-gray-500">
            <p>Recent searches:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link to="/shop" className="text-xs bg-gray-100 px-2 py-1 rounded">Sweaters</Link>
              <Link to="/shop" className="text-xs bg-gray-100 px-2 py-1 rounded">Cotton</Link>
              <Link to="/shop" className="text-xs bg-gray-100 px-2 py-1 rounded">Accessories</Link>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function UserMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            <User className="h-5 w-5" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 bg-white shadow-lg rounded-md border w-[240px] right-0 z-50">
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="block text-sm hover:underline">Login</Link>
              </li>
              <li>
                <Link to="/register" className="block text-sm hover:underline">Register</Link>
              </li>
              <li>
                <Link to="/account" className="block text-sm hover:underline">My Account</Link>
              </li>
              <li>
                <Link to="/orders" className="block text-sm hover:underline">Order History</Link>
              </li>
              <li>
                <Link to="/wishlist" className="block text-sm hover:underline">Wishlist</Link>
              </li>
              <li className="border-t border-gray-100 pt-2">
                <Link to="/admin/login" className="block text-sm hover:underline">Admin</Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function CartMenu() {
  const { toast } = useToast();
  
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would redirect to checkout in a real implementation.",
    });
  };
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            <ShoppingBag className="h-5 w-5" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 bg-white shadow-lg rounded-md border w-[300px] right-0 z-50">
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
