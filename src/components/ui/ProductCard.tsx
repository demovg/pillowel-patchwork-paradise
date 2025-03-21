
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ id, name, price, image, category, isNew = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: `${name} has been ${isLiked ? "removed from" : "added to"} your wishlist.`,
    });
  };
  
  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm bg-gray-100 mb-4">
        {isNew && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-black text-white text-xs px-2 py-1 font-medium">
              New
            </span>
          </div>
        )}
        
        <Link to={`/product/${id}`}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img 
              src={image} 
              alt={name}
              loading="lazy"
              className={cn(
                "w-full h-full object-cover transition-transform duration-700",
                isHovered ? "scale-105" : "scale-100"
              )}
            />
          </div>
        </Link>
        
        <div 
          className={cn(
            "absolute inset-x-0 bottom-0 flex justify-between items-center px-4 py-3 bg-white/90 backdrop-blur-behind transition-all duration-300",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
        >
          <button 
            aria-label="Add to wishlist"
            className={`${isLiked ? "text-red-500" : "text-pillowel-800"} hover:text-pillowel transition-colors`}
            onClick={handleLike}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
          
          <button 
            aria-label="Add to cart"
            className="text-white bg-black hover:bg-pillowel-800 transition-colors px-4 py-1.5 text-xs font-medium flex items-center space-x-1 rounded-sm"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={14} />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-xs text-pillowel-500 uppercase tracking-wide">
          {category}
        </div>
        <h3 className="font-medium text-base">
          <Link 
            to={`/product/${id}`}
            className="hover:underline underline-offset-4"
          >
            {name}
          </Link>
        </h3>
        <div className="font-medium text-sm">
          ${price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
