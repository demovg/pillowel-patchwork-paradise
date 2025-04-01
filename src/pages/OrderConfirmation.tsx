
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const OrderConfirmation = () => {
  const [orderId, setOrderId] = useState('');
  
  // Generate a random order ID for demo purposes
  useEffect(() => {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    setOrderId(`ORD-${randomId}`);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-semibold mb-2">Thank You for Your Order!</h1>
          <p className="text-xl mb-6">Your order has been confirmed</p>
          
          <div className="bg-gray-50 p-6 rounded-md mb-8">
            <p className="text-gray-600 mb-2">Order Number:</p>
            <p className="text-xl font-medium mb-6">{orderId}</p>
            <p className="text-gray-600 text-sm">
              We've sent a confirmation email with details and tracking info to your email address.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/orders">
              <Button variant="outline" className="w-full">
                View Order Details
              </Button>
            </Link>
            <Link to="/shop">
              <Button className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
