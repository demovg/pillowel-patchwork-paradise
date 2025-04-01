
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchMenu, UserMenu, CartMenu, WishlistMenu } from './NavMenu';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/90 shadow-sm backdrop-blur-behind py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex-shrink-0 font-serif font-semibold text-2xl md:text-3xl tracking-tight"
        >
          pillowel
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="relative text-base font-medium text-pillowel-800 hover:text-black transition-colors duration-200 group"
            >
              {link.name}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchMenu />
          <WishlistMenu />
          <UserMenu />
          <CartMenu />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <CartMenu />
          <button
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            onClick={toggleMenu}
            className="w-6 h-6 flex items-center justify-center text-pillowel-800"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out pt-24 px-6",
          isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-medium text-pillowel-800"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 flex flex-col space-y-8">
            <Link to="/account" className="text-2xl font-medium text-pillowel-800" onClick={() => setIsMenuOpen(false)}>
              Account
            </Link>
            <Link to="/wishlist" className="text-2xl font-medium text-pillowel-800" onClick={() => setIsMenuOpen(false)}>
              Wishlist
            </Link>
            <Link to="/search" className="text-2xl font-medium text-pillowel-800" onClick={() => setIsMenuOpen(false)}>
              Search
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
