
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from 'lucide-react';
import SortMenu from '@/components/shop/SortMenu';
import SearchBar from '@/components/shop/SearchBar';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';

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
  const { products } = useShop();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Apply filters and search when relevant state changes
  useEffect(() => {
    let result = products
      .filter(product => product.active !== false) // Only show active products
      .filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesNewFilter = showNewOnly ? (product as any).isNew : true;
        const matchesSearch = searchTerm.trim() === '' || 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesCategory && matchesPriceRange && matchesNewFilter && matchesSearch;
      });

    // Sort products based on selected option
    result.sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Popularity":
          // For demo purposes, just random sorting
          return 0.5 - Math.random();
        case "Newest":
        default:
          // For demo purposes, just use the isNew property or id
          if ((a as any).isNew !== undefined && (b as any).isNew !== undefined) {
            return (b as any).isNew === (a as any).isNew ? 0 : (b as any).isNew ? 1 : -1;
          }
          return Number(b.id) - Number(a.id);
      }
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, showNewOnly, sortOption, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 250]);
    setShowNewOnly(false);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Shop</h1>
          
          {/* Search bar - visible on all devices */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
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
                
                <Button 
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full mt-4"
                >
                  Clear Filters
                </Button>
                
                <button 
                  className="md:hidden w-full py-2.5 bg-black text-white rounded-md text-sm font-medium mt-4"
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
                <SortMenu onSort={setSortOption} />
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id.toString()}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      category={product.category}
                      isNew={(product as any).isNew}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-pillowel-600">No products match your filters.</p>
                  <button 
                    onClick={clearFilters}
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
