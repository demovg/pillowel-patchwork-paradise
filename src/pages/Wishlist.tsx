
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = [
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
  ];

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Add items you love to your wishlist</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="font-medium mb-4">{item.price}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
