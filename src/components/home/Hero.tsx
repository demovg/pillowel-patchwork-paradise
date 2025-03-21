
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="md:col-span-5 space-y-8 animate-fade-up">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-medium">
                <Link to="/collections/new-collection">New Collection</Link>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Timeless Elegance for Modern Living
              </h1>
              <p className="text-pillowel-600 text-lg max-w-md">
                Discover our premium collection of thoughtfully crafted clothing and accessories designed for everyday elegance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center bg-black hover:bg-pillowel-800 text-white px-6 py-3 rounded-sm text-sm font-medium transition-colors duration-200"
              >
                Shop Collection
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center border border-black/20 hover:border-black bg-transparent text-black px-6 py-3 rounded-sm text-sm font-medium transition-colors duration-200"
              >
                Discover More
              </Link>
            </div>
          </div>
          
          {/* Image Grid */}
          <div className="md:col-span-7 grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <div className="relative rounded-md overflow-hidden aspect-[4/5] animate-fade-in animation-delay-200">
                <img 
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=3287&auto=format&fit=crop" 
                  alt="Featured product" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/30 to-transparent text-white">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide">New Arrival</p>
                    <p className="font-medium">Premium Linen Collection</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 space-y-4">
              <div className="relative rounded-md overflow-hidden aspect-square animate-fade-in animation-delay-400">
                <img 
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=3270&auto=format&fit=crop" 
                  alt="Complementary product" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-md overflow-hidden aspect-square animate-fade-in animation-delay-600">
                <img 
                  src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=3387&auto=format&fit=crop" 
                  alt="Complementary product" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Brands */}
        <div className="mt-20 md:mt-32">
          <p className="text-center text-pillowel-500 text-sm mb-8">Trusted by the World's Best Brands</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 lg:gap-24">
            {['Brand', 'Brand', 'Brand', 'Brand', 'Brand'].map((brand, index) => (
              <div key={index} className="text-pillowel-400 font-serif text-lg md:text-xl">
                {brand} {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
