
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // This would normally send the email to a backend service
      setIsSubmitted(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };
  
  return (
    <section className="py-24 md:py-32 bg-pillowel-900 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Stay in Touch</h2>
          <p className="text-pillowel-300 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter to receive updates on new collections, special offers, and styling inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="bg-white text-black hover:bg-white/90 transition-colors duration-200 px-6 py-3 rounded-sm text-sm font-medium flex items-center justify-center"
              >
                {isSubmitted ? (
                  "Thank you!"
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          <p className="text-pillowel-400 text-xs mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
