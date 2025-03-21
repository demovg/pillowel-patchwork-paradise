
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-20">
            <h1 className="text-3xl md:text-5xl font-semibold mb-6">Our Story</h1>
            <p className="text-lg md:text-xl text-pillowel-600 max-w-3xl">
              Pillowel was founded on the belief that clothing should be as comfortable as it is elegant,
              and as sustainable as it is beautiful.
            </p>
          </div>
          
          {/* Image with text section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">The Vision</h2>
              <p className="text-pillowel-600 mb-4">
                Started in 2018, our founder Emma Wright set out to create a brand that harmoniously
                blends comfort with luxury, sustainability with style. Having worked in the fashion
                industry for over a decade, Emma noticed the gap between comfortable daily wear and
                elegant fashion pieces.
              </p>
              <p className="text-pillowel-600 mb-4">
                The name "Pillowel" itself embodies our ethos - combining the comfort of a pillow
                with the elegance of premium apparel. We believe that looking your best shouldn't
                mean sacrificing comfort, and feeling comfortable shouldn't mean compromising on style.
              </p>
              <p className="text-pillowel-600">
                Today, Pillowel is recognized for its thoughtful designs, premium materials,
                and commitment to ethical manufacturing practices.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://images.unsplash.com/photo-1595689918271-e72c6c41a0d6?q=80&w=3270&auto=format&fit=crop" 
                alt="Founder of Pillowel" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Mission and Values */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission & Values</h2>
              <p className="text-pillowel-600 max-w-2xl mx-auto">
                At the heart of everything we do are these core principles that guide our decisions,
                designs, and relationships.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Sustainable Practices</h3>
                <p className="text-pillowel-600">
                  We are committed to minimizing our environmental footprint through responsible
                  sourcing, biodegradable packaging, and low-waste manufacturing processes.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Ethical Production</h3>
                <p className="text-pillowel-600">
                  We work exclusively with factories that provide fair wages, safe working conditions,
                  and opportunities for growth to their employees.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Timeless Design</h3>
                <p className="text-pillowel-600">
                  We focus on creating pieces that transcend seasonal trends, designed to be cherished
                  and worn for years rather than months.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="aspect-square mb-4 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop" 
                    alt="Emma Wright" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Emma Wright</h3>
                <p className="text-pillowel-600 text-sm">Founder & Creative Director</p>
              </div>
              <div className="text-center">
                <div className="aspect-square mb-4 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop" 
                    alt="James Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">James Chen</h3>
                <p className="text-pillowel-600 text-sm">Head of Design</p>
              </div>
              <div className="text-center">
                <div className="aspect-square mb-4 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3387&auto=format&fit=crop" 
                    alt="Maya Rodriguez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Maya Rodriguez</h3>
                <p className="text-pillowel-600 text-sm">Sustainability Manager</p>
              </div>
              <div className="text-center">
                <div className="aspect-square mb-4 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop" 
                    alt="Alex Kim" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Alex Kim</h3>
                <p className="text-pillowel-600 text-sm">Product Development</p>
              </div>
            </div>
          </div>
          
          {/* Journey Timeline */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Our Journey</h2>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-1 font-semibold text-xl">2018</div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium mb-2">From Concept to Reality</h3>
                  <p className="text-pillowel-600">
                    Pillowel was established with a small collection of premium essentials 
                    that quickly gained attention for their exceptional comfort and quality.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-1 font-semibold text-xl">2020</div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium mb-2">Sustainability Commitment</h3>
                  <p className="text-pillowel-600">
                    We launched our first fully sustainable collection, using only organic 
                    and recycled materials, and began transitioning all packaging to biodegradable options.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-1 font-semibold text-xl">2022</div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium mb-2">Global Expansion</h3>
                  <p className="text-pillowel-600">
                    Opened our first flagship stores in New York and London, and expanded 
                    our online presence to serve customers worldwide.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-1 font-semibold text-xl">Today</div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium mb-2">Community & Beyond</h3>
                  <p className="text-pillowel-600">
                    As we continue to grow, we remain dedicated to our original vision while embracing 
                    innovation and deepening our connection with our community of customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Journey</h2>
            <p className="text-pillowel-600 max-w-xl mx-auto mb-8">
              Experience the perfect blend of comfort and elegance. Explore our collections
              and become part of the Pillowel story.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/shop" 
                className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-black/90 transition-colors"
              >
                Shop Collection
              </a>
              <a 
                href="/contact" 
                className="bg-white border border-black text-black px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
