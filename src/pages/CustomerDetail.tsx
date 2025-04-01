
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

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Sample customer data - in a real app, you would fetch this from your backend
  const customer = {
    id: id,
    name: "John Smith",
    email: "john.smith@example.com",
    joined: "Feb 10, 2025",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    orders: [
      { id: "1001", date: "March 21, 2025", status: "Completed", total: "$265.00" },
      { id: "1033", date: "February 15, 2025", status: "Completed", total: "$120.00" },
      { id: "1056", date: "January 5, 2025", status: "Completed", total: "$185.00" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-black">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold">Customer Details</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{customer.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{customer.joined}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="font-medium">{customer.orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span className={`bg-${order.status === 'Completed' ? 'green' : 'yellow'}-100 text-${order.status === 'Completed' ? 'green' : 'yellow'}-800 px-2 py-1 rounded-full text-xs`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/admin/order/${order.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerDetail;
