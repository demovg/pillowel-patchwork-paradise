
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ProductCard from '../ui/ProductCard';

// Sample product data
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
  }
];

const NewArrivals = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">New Arrivals</h2>
            <p className="text-pillowel-600">The latest additions to our collection of premium essentials.</p>
          </div>
          <Link to="/shop/new" className="inline-flex items-center mt-4 md:mt-0 text-sm font-medium hover:underline">
            <span>View All</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
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
      </div>
    </section>
  );
};

export default NewArrivals;
