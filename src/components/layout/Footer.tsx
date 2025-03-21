
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 mt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="font-serif font-semibold text-2xl tracking-tight">
              pillowel
            </Link>
            <p className="text-pillowel-600 text-sm max-w-xs">
              Crafting premium clothing and accessories designed for modern elegance.
            </p>
            <div className="flex space-x-5">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-pillowel-600 hover:text-black transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-pillowel-600 hover:text-black transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-pillowel-600 hover:text-black transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="mailto:info@pillowel.com" 
                className="text-pillowel-600 hover:text-black transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div className="space-y-6">
            <h3 className="font-medium text-base uppercase tracking-wider">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">All Products</Link></li>
              <li><Link to="/shop" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Clothing</Link></li>
              <li><Link to="/shop" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Accessories</Link></li>
              <li><Link to="/collections" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Collections</Link></li>
              <li><Link to="/shop" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Sale</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div className="space-y-6">
            <h3 className="font-medium text-base uppercase tracking-wider">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">About Us</Link></li>
              <li><Link to="/about" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Sustainability</Link></li>
              <li><Link to="/about" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Careers</Link></li>
              <li><Link to="/about" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Stores</Link></li>
              <li><Link to="/contact" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Help column */}
          <div className="space-y-6">
            <h3 className="font-medium text-base uppercase tracking-wider">Help</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Customer Care</Link></li>
              <li><Link to="/faq" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Size Guide</Link></li>
              <li><Link to="/faq" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">FAQs</Link></li>
              <li><Link to="/faq" className="text-pillowel-600 hover:text-black transition-colors text-sm duration-200">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-pillowel-600 text-xs">
            © {new Date().getFullYear()} Pillowel. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/faq" className="text-pillowel-600 hover:text-black transition-colors text-xs duration-200">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-pillowel-600 hover:text-black transition-colors text-xs duration-200">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-pillowel-600 hover:text-black transition-colors text-xs duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
