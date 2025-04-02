
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "@/contexts/ShopContext";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCartQuantity, clearCart } = useShop();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 12.00 : 0;
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id: number, change: number) => {
    updateCartQuantity(id, change);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add items to start shopping</p>
              <Link to="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-6">
                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0 rounded overflow-hidden">
                      <Link to={`/product/${item.id}`}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium hover:underline">{item.name}</h3>
                        </Link>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-4">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="p-1 border rounded-l"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 border-t border-b">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="p-1 border rounded-r"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <span className="ml-auto font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 flex justify-between">
                  <Link to="/shop" className="text-sm text-gray-600 hover:text-black flex items-center">
                    <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                    Continue Shopping
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => clearCart()} 
                    className="text-sm"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="border rounded-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3"></div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Free shipping on orders over $200
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
