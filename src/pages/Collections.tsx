
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Sample collections data
const collections = [
  {
    id: 'summer-essentials',
    name: 'Summer Essentials',
    description: 'Lightweight, breathable pieces for warm weather comfort.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=3270&auto=format&fit=crop',
    itemCount: 18
  },
  {
    id: 'winter-wardrobe',
    name: 'Winter Wardrobe',
    description: 'Cozy layers and refined knits for the colder months.',
    image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=3270&auto=format&fit=crop',
    itemCount: 24
  },
  {
    id: 'minimalist-basics',
    name: 'Minimalist Basics',
    description: 'Timeless essentials designed with simplicity in mind.',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=3435&auto=format&fit=crop',
    itemCount: 15
  },
  {
    id: 'sustainable-edit',
    name: 'Sustainable Edit',
    description: 'Eco-conscious clothing made from organic and recycled materials.',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=3270&auto=format&fit=crop',
    itemCount: 12
  },
  {
    id: 'evening-wear',
    name: 'Evening Wear',
    description: 'Sophisticated pieces for special occasions and elegant events.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=3270&auto=format&fit=crop',
    itemCount: 9
  },
  {
    id: 'outdoor-collection',
    name: 'Outdoor Collection',
    description: 'Functional and stylish garments designed for adventure and exploration.',
    image: 'https://images.unsplash.com/photo-1604176424472-9d69d6129232?q=80&w=3270&auto=format&fit=crop',
    itemCount: 16
  }
];

const Collections = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Collections</h1>
          <p className="text-pillowel-600 max-w-2xl mb-12">
            Explore our thoughtfully curated collections, each telling a unique story through 
            premium fabrics and timeless designs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {collections.map((collection) => (
              <Link 
                key={collection.id} 
                to={`/collections/${collection.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-md aspect-[3/4] mb-4">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-medium mb-1">{collection.name}</h3>
                    <p className="text-white/80 text-sm">{collection.itemCount} items</p>
                  </div>
                </div>
                <p className="text-pillowel-600 text-sm line-clamp-2">{collection.description}</p>
                <div className="flex items-center mt-3 text-sm font-medium">
                  <span>View Collection</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* Featured Collection */}
          <div className="my-20">
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=3270&auto=format&fit=crop" 
                alt="Limited Edition Collection" 
                className="w-full h-[60vh] object-cover object-center"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center p-6">
                <h2 className="text-3xl md:text-5xl font-semibold mb-4">Limited Edition Collection</h2>
                <p className="max-w-md text-white/90 mb-8">
                  Exclusive pieces crafted with rare fabrics and unique details, available for a limited time only.
                </p>
                <Link 
                  to="/collections/limited-edition" 
                  className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
          
          {/* Upcoming Collections */}
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-md p-8">
                <h3 className="text-xl font-medium mb-3">Spring/Summer 2024</h3>
                <p className="text-pillowel-600 mb-4">
                  A vibrant celebration of color and natural textures. Launching April 2024.
                </p>
                <button className="text-sm font-medium underline">
                  Join the waitlist
                </button>
              </div>
              <div className="border border-gray-200 rounded-md p-8">
                <h3 className="text-xl font-medium mb-3">Artisan Collaboration</h3>
                <p className="text-pillowel-600 mb-4">
                  A special collection featuring handcrafted pieces by global artisans. Launching May 2024.
                </p>
                <button className="text-sm font-medium underline">
                  Join the waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
