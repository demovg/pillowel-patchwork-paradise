
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, SlidersHorizontal } from 'lucide-react';

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: '1',
    name: 'Organic Cotton Sweater',
    price: 120,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=3327&auto=format&fit=crop',
    category: 'Knitwear',
    isNew: true
  },
  {
    id: '2',
    name: 'Merino Wool Cardigan',
    price: 145,
    image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=3387&auto=format&fit=crop',
    category: 'Knitwear',
    isNew: true
  },
  {
    id: '3',
    name: 'Linen Blend Shirt',
    price: 85,
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3311&auto=format&fit=crop',
    category: 'Shirts',
    isNew: true
  },
  {
    id: '4',
    name: 'Silk Scarf',
    price: 65,
    image: 'https://images.unsplash.com/photo-1599391398502-967381c4795a?q=80&w=3387&auto=format&fit=crop',
    category: 'Accessories',
    isNew: true
  },
  {
    id: '5',
    name: 'Wool Blend Coat',
    price: 230,
    image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=3387&auto=format&fit=crop',
    category: 'Outerwear',
    isNew: false
  },
  {
    id: '6',
    name: 'Cotton T-Shirt',
    price: 40,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=3280&auto=format&fit=crop',
    category: 'T-Shirts',
    isNew: false
  },
  {
    id: '7',
    name: 'Leather Handbag',
    price: 190,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=3435&auto=format&fit=crop',
    category: 'Accessories',
    isNew: false
  },
  {
    id: '8',
    name: 'Denim Jeans',
    price: 95,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=3270&auto=format&fit=crop',
    category: 'Pants',
    isNew: false
  }
];

const categories = [
  "All",
  "Knitwear",
  "Shirts",
  "T-Shirts",
  "Pants",
  "Outerwear",
  "Accessories"
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesNewFilter = showNewOnly ? product.isNew : true;
    
    return matchesCategory && matchesPriceRange && matchesNewFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Shop</h1>
          
          {/* Mobile filter button */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <p className="text-pillowel-600">{filteredProducts.length} products</p>
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-gray-200 rounded-md"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar - desktop and conditionally mobile */}
            <aside className={`w-full md:w-64 flex-shrink-0 transition-all duration-300 ${
              showMobileFilters ? 'block' : 'hidden md:block'
            }`}>
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`text-sm transition-colors ${
                            selectedCategory === category
                              ? 'font-medium text-black'
                              : 'text-pillowel-600 hover:text-black'
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 250]}
                    max={250}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-pillowel-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new-only"
                    checked={showNewOnly}
                    onCheckedChange={(checked) => setShowNewOnly(checked === true)}
                  />
                  <label
                    htmlFor="new-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    New Arrivals Only
                  </label>
                </div>
                
                <button 
                  className="md:hidden w-full py-2.5 bg-black text-white rounded-md text-sm font-medium"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </aside>
            
            {/* Products grid */}
            <div className="flex-1">
              <div className="hidden md:flex justify-between items-center mb-6">
                <p className="text-pillowel-600">{filteredProducts.length} products</p>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  <span className="text-sm font-medium">Sort by:</span>
                  <select className="text-sm bg-transparent border-none focus:ring-0">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      category={product.category}
                      isNew={product.isNew}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-pillowel-600">No products match your filters.</p>
                  <button 
                    onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange([0, 250]);
                      setShowNewOnly(false);
                    }}
                    className="mt-4 underline text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
