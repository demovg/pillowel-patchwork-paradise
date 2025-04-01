
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Eye } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "86452",
      date: "May 15, 2023",
      items: 2,
      total: 230.00,
      status: "Delivered",
      deliveryDate: "May 20, 2023"
    },
    {
      id: "86123",
      date: "April 2, 2023",
      items: 1,
      total: 145.00,
      status: "Delivered",
      deliveryDate: "April 8, 2023"
    },
    {
      id: "85764",
      date: "March 17, 2023",
      items: 3,
      total: 310.00,
      status: "Delivered",
      deliveryDate: "March 22, 2023"
    },
    {
      id: "84982",
      date: "February 5, 2023",
      items: 1,
      total: 89.00,
      status: "Delivered",
      deliveryDate: "February 10, 2023"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                <Button>Start Shopping</Button>
              </div>
            ) : (
              <>
                <div className="hidden md:grid grid-cols-5 font-medium text-sm py-2 border-b">
                  <div>Order #</div>
                  <div>Date</div>
                  <div>Items</div>
                  <div>Total</div>
                  <div>Status</div>
                </div>
                
                {orders.map((order) => (
                  <div key={order.id} className="border-b pb-6">
                    <div className="md:hidden flex justify-between items-center mb-4">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                    
                    <div className="hidden md:grid md:grid-cols-5 items-center">
                      <div className="font-medium">#{order.id}</div>
                      <div>{order.date}</div>
                      <div>{order.items} {order.items === 1 ? 'item' : 'items'}</div>
                      <div>${order.total.toFixed(2)}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600">{order.status}</span>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:hidden mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Items:</div>
                      <div>{order.items} {order.items === 1 ? 'item' : 'items'}</div>
                      
                      <div className="text-gray-500">Total:</div>
                      <div>${order.total.toFixed(2)}</div>
                      
                      <div className="text-gray-500">Status:</div>
                      <div className="text-green-600">{order.status}</div>
                      
                      <div className="text-gray-500">Delivery:</div>
                      <div>{order.deliveryDate}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
