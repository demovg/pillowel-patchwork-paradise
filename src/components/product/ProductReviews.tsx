import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/App';
import { useContext } from 'react';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  userHasMarkedHelpful?: boolean;
}

interface ProductReviewsProps {
  productId: string;
  initialReviews?: Review[];
}

const ProductReviews = ({ productId, initialReviews = [] }: ProductReviewsProps) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews.length > 0 ? initialReviews : [
    {
      id: '1',
      user: 'Sarah L.',
      rating: 5,
      date: 'March 15, 2025',
      comment: 'This is an excellent product! The quality is outstanding and it fits perfectly. Highly recommend.',
      helpful: 7
    },
    {
      id: '2',
      user: 'Michael T.',
      rating: 4,
      date: 'March 2, 2025',
      comment: "Very good quality and comfortable. The only reason I'm giving 4 stars instead of 5 is because the color is slightly different than what's shown in the pictures.",
      helpful: 3
    },
    {
      id: '3',
      user: 'Jessica W.',
      rating: 5,
      date: 'February 20, 2025',
      comment: 'Absolutely love it! Fast shipping and the product exceeded my expectations.',
      helpful: 5
    }
  ]);
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(prev => ({ ...prev, comment: e.target.value }));
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.comment.trim()) {
      toast({
        variant: "destructive",
        title: "Review cannot be empty",
        description: "Please enter a comment for your review"
      });
      return;
    }
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const newReviewObj: Review = {
      id: Date.now().toString(),
      user: user?.name || 'Anonymous User',
      rating: newReview.rating,
      date: formattedDate,
      comment: newReview.comment,
      helpful: 0
    };
    
    setReviews(prev => [newReviewObj, ...prev]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!"
    });
  };
  
  const markReviewHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful: review.helpful + 1,
          userHasMarkedHelpful: true
        };
      }
      return review;
    }));
  };
  
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-medium mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({reviews.length} reviews)</span>
          </div>
        </div>
        
        <Button 
          onClick={() => {
            if (isLoggedIn) {
              setShowReviewForm(prev => !prev);
            } else {
              toast({
                title: "Login required",
                description: "You must be logged in to leave a review",
                variant: "destructive"
              });
            }
          }}
        >
          Write a Review
        </Button>
      </div>
      
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-medium mb-4">Your Review</h3>
          
          <div className="mb-4">
            <p className="mb-2">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="review-comment" className="block mb-2">
              Comment
            </label>
            <Textarea
              id="review-comment"
              rows={4}
              placeholder="Share your thoughts about this product..."
              value={newReview.comment}
              onChange={handleCommentChange}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Submit Review
            </Button>
          </div>
        </form>
      )}
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{review.user}</span>
              <span className="text-gray-500 text-sm">{review.date}</span>
            </div>
            
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            
            <p className="text-gray-700 mb-4">{review.comment}</p>
            
            <button 
              onClick={() => markReviewHelpful(review.id)}
              disabled={review.userHasMarkedHelpful}
              className={`flex items-center gap-1 text-sm ${
                review.userHasMarkedHelpful 
                  ? 'text-gray-400 cursor-default' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ThumbsUp size={14} />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
