
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    news: false,
    productUpdates: true
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved."
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-semibold mb-8">Account Settings</h1>
      
      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Manage which emails you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="order-updates" className="flex flex-col space-y-1">
                <span>Order Updates</span>
                <span className="font-normal text-sm text-gray-500">
                  Receive updates about your orders.
                </span>
              </Label>
              <Switch
                id="order-updates"
                checked={notifications.orders}
                onCheckedChange={() => handleNotificationChange('orders')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="promotions" className="flex flex-col space-y-1">
                <span>Promotions</span>
                <span className="font-normal text-sm text-gray-500">
                  Receive emails about sales and special offers.
                </span>
              </Label>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={() => handleNotificationChange('promotions')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="news" className="flex flex-col space-y-1">
                <span>News & Updates</span>
                <span className="font-normal text-sm text-gray-500">
                  Receive news about our company and industry.
                </span>
              </Label>
              <Switch
                id="news"
                checked={notifications.news}
                onCheckedChange={() => handleNotificationChange('news')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="product-updates" className="flex flex-col space-y-1">
                <span>Product Updates</span>
                <span className="font-normal text-sm text-gray-500">
                  Receive updates when products you like are back in stock.
                </span>
              </Label>
              <Switch
                id="product-updates"
                checked={notifications.productUpdates}
                onCheckedChange={() => handleNotificationChange('productUpdates')}
              />
            </div>
            
            <Button onClick={handleSaveNotifications}>Save Preferences</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your account password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" required />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Permanently delete your account and all your data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                When you delete your account, all of your data will be permanently removed. This action cannot be undone.
              </p>
              
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
