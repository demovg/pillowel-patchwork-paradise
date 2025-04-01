
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, UserCircle, Settings, CreditCard, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-semibold mb-8">My Account</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" defaultValue="alex.smith@example.com" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track your recent orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #86452</p>
                      <p className="text-sm text-gray-500">Placed on May 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">View Order</Button>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      <Package className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm">2 items - $230.00</p>
                      <p className="text-xs text-green-600">Delivered on May 20, 2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #86123</p>
                      <p className="text-sm text-gray-500">Placed on April 2, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">View Order</Button>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      <Package className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm">1 item - $145.00</p>
                      <p className="text-xs text-green-600">Delivered on April 8, 2023</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/orders" className="text-sm text-blue-600 hover:underline block text-center">
                  View All Orders
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>
                Manage your shipping and billing addresses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium">Shipping Address</p>
                      <p className="text-sm text-gray-500">Default</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="text-sm">
                    <p>Alex Smith</p>
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>San Francisco, CA 94107</p>
                    <p>United States</p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 border-dashed flex items-center justify-center">
                  <Button variant="outline">+ Add New Address</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium">Credit Card</p>
                      <p className="text-sm text-gray-500">Default</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-blue-100 rounded mr-4"></div>
                    <div className="text-sm">
                      <p>•••• •••• •••• 4242</p>
                      <p className="text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 border-dashed flex items-center justify-center">
                  <Button variant="outline">+ Add Payment Method</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email updates about your orders and account.</p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-gray-500">Change your account password.</p>
                </div>
                <Button variant="outline">Update</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data.</p>
                </div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
