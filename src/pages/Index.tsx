
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import NewArrivals from '@/components/home/NewArrivals';
import Newsletter from '@/components/home/Newsletter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <NewArrivals />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
