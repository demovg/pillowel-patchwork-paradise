
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Sample order data - in a real app, you would fetch this from your backend
  const order = {
    id: id,
    customer: {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com"
    },
    date: "March 21, 2025",
    status: "Completed",
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress: "123 Main St, Anytown, USA 12345",
    items: [
      { id: "1", name: "Organic Cotton Sweater", price: "$120.00", quantity: 1, total: "$120.00" },
      { id: "2", name: "Merino Wool Cardigan", price: "$145.00", quantity: 1, total: "$145.00" }
    ],
    subtotal: "$265.00",
    shipping: "$0.00",
    total: "$265.00"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-black">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold">Order Details</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">#{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`bg-${order.status === 'Completed' ? 'green' : 'yellow'}-100 text-${order.status === 'Completed' ? 'green' : 'yellow'}-800 px-2 py-1 rounded-full text-xs`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">{order.customer.email}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm" 
                    onClick={() => navigate(`/admin/customer/${order.customer.id}`)}
                  >
                    View Customer
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shipping Address</p>
                  <p className="font-medium">{order.shippingAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.total}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                    <TableCell className="text-right">{order.subtotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">Shipping</TableCell>
                    <TableCell className="text-right">{order.shipping}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
                    <TableCell className="text-right font-semibold">{order.total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;
