
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Premium garments crafted with exceptional materials',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=3570&auto=format&fit=crop',
    link: '/shop?category=clothing'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Elegant additions to elevate any outfit',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=3465&auto=format&fit=crop',
    link: '/shop?category=accessories'
  },
  {
    id: 'home',
    name: 'Home',
    description: 'Beautiful textiles to enhance your living space',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=3647&auto=format&fit=crop',
    link: '/shop?category=home'
  }
];

const Categories = () => {
  return (
    <section className="py-24 md:py-32 bg-pillowel-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Shop by Category</h2>
          <p className="text-pillowel-600">Explore our curated collections designed with exceptional attention to detail.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group">
              <Link to={category.link} className="block">
                <div className="relative overflow-hidden rounded-md">
                  <div className="aspect-[3/4]">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-30 opacity-0"></div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <h3 className="text-xl font-medium">{category.name}</h3>
                  <p className="text-pillowel-600 text-sm">{category.description}</p>
                  <div className="inline-flex items-center text-sm font-medium pt-2 group-hover:underline">
                    <span>Shop Now</span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
