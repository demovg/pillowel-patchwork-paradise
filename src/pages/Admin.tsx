
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, Package, Users, ShoppingBag, Settings, LogOut,
  Edit, Trash, Plus, Search
} from 'lucide-react';
import { Input } from "@/components/ui/input";

// Mock data
const orders = [
  { id: '#ORD-001', customer: 'John Smith', date: '2023-05-12', status: 'Delivered', total: 145.00 },
  { id: '#ORD-002', customer: 'Emily Johnson', date: '2023-05-15', status: 'Processing', total: 89.50 },
  { id: '#ORD-003', customer: 'Michael Brown', date: '2023-05-16', status: 'Shipped', total: 215.75 },
  { id: '#ORD-004', customer: 'Sarah Wilson', date: '2023-05-18', status: 'Pending', total: 67.20 },
  { id: '#ORD-005', customer: 'David Lee', date: '2023-05-20', status: 'Delivered', total: 178.30 }
];

const products = [
  { id: '1', name: 'Organic Cotton Sweater', stock: 24, price: 120, category: 'Knitwear' },
  { id: '2', name: 'Merino Wool Cardigan', stock: 18, price: 145, category: 'Knitwear' },
  { id: '3', name: 'Linen Blend Shirt', stock: 32, price: 85, category: 'Shirts' },
  { id: '4', name: 'Silk Scarf', stock: 45, price: 65, category: 'Accessories' },
  { id: '5', name: 'Wool Blend Coat', stock: 12, price: 230, category: 'Outerwear' },
  { id: '6', name: 'Cotton T-Shirt', stock: 56, price: 40, category: 'T-Shirts' }
];

const customers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', orders: 3, total: 345.00 },
  { id: '2', name: 'Emily Johnson', email: 'emily@example.com', orders: 1, total: 89.50 },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', orders: 5, total: 678.25 },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', orders: 2, total: 245.70 },
  { id: '5', name: 'David Lee', email: 'david@example.com', orders: 4, total: 512.80 }
];

const Admin = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Make sure only admins can access this page
  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out of the admin panel.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="font-serif font-semibold text-xl tracking-tight">pillowel</h1>
            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                    activeTab === "dashboard" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("products")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                    activeTab === "products" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  <span>Products</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                    activeTab === "orders" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Orders</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("customers")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                    activeTab === "customers" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Customers</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                    activeTab === "settings" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile Navbar */}
      <div className="md:hidden w-full fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="font-serif font-semibold text-lg tracking-tight">pillowel</h1>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="mt-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
              <LayoutDashboard className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="products" onClick={() => setActiveTab("products")}>
              <Package className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="orders" onClick={() => setActiveTab("orders")}>
              <ShoppingBag className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="customers" onClick={() => setActiveTab("customers")}>
              <Users className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
              <Settings className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto md:pt-8 pt-32">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
                <p className="text-2xl font-semibold mt-2">$12,345</p>
                <p className="text-green-600 text-xs mt-1">↑ 12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">Orders</h3>
                <p className="text-2xl font-semibold mt-2">154</p>
                <p className="text-green-600 text-xs mt-1">↑ 8% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">Customers</h3>
                <p className="text-2xl font-semibold mt-2">86</p>
                <p className="text-green-600 text-xs mt-1">↑ 24% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">Avg. Order Value</h3>
                <p className="text-2xl font-semibold mt-2">$80.16</p>
                <p className="text-red-600 text-xs mt-1">↓ 3% from last month</p>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Recent Orders</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-t border-gray-100">
                        <td className="py-3">{order.id}</td>
                        <td className="py-3">{order.customer}</td>
                        <td className="py-3">{order.date}</td>
                        <td className="py-3">
                          <span 
                            className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Button 
                className="h-auto py-6 flex-col"
                onClick={() => setActiveTab("products")}
              >
                <Package className="h-6 w-6 mb-2" />
                <span>Add New Product</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex-col"
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingBag className="h-6 w-6 mb-2" />
                <span>Manage Orders</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex-col"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-6 w-6 mb-2" />
                <span>Store Settings</span>
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === "products" && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-semibold">Products</h2>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-10 w-full sm:w-60"
                  />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 bg-gray-50">
                      <th className="px-6 py-3 font-medium">Product Name</th>
                      <th className="px-6 py-3 font-medium">Category</th>
                      <th className="px-6 py-3 font-medium">Stock</th>
                      <th className="px-6 py-3 font-medium">Price</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t border-gray-100">
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">
                          <span className={`font-medium ${
                            product.stock > 20 ? 'text-green-600' :
                            product.stock > 10 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "orders" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Orders</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search orders..." 
                    className="pl-10 w-60"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 bg-gray-50">
                      <th className="px-6 py-3 font-medium">Order ID</th>
                      <th className="px-6 py-3 font-medium">Customer</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Amount</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-100">
                        <td className="px-6 py-4 font-medium">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">
                          <span 
                            className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "customers" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Customers</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search customers..." 
                    className="pl-10 w-60"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 bg-gray-50">
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Email</th>
                      <th className="px-6 py-3 font-medium">Orders</th>
                      <th className="px-6 py-3 font-medium text-right">Total Spent</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-t border-gray-100">
                        <td className="px-6 py-4 font-medium">{customer.name}</td>
                        <td className="px-6 py-4">{customer.email}</td>
                        <td className="px-6 py-4">{customer.orders}</td>
                        <td className="px-6 py-4 text-right">${customer.total.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-medium mb-4">Store Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="store-name" className="text-sm font-medium">
                    Store Name
                  </label>
                  <Input id="store-name" defaultValue="Pillowel" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="store-email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="store-email" defaultValue="hello@pillowel.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="store-phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="store-phone" defaultValue="+1 (234) 567-890" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="store-address" className="text-sm font-medium">
                    Address
                  </label>
                  <Input id="store-address" defaultValue="123 Fashion Avenue, New York" />
                </div>
              </div>
              <Button className="mt-6">Save Changes</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4">Admin Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input id="current-password" type="password" />
                </div>
                <div></div>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">
                    New Password
                  </label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="mt-6">Update Password</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
