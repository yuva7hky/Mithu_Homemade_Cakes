import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { WhatsAppIcon } from './Icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cakes', path: '/category/cakes' },
    { name: 'Customized', path: '/category/customized' },
    { name: 'Brownies', path: '/category/brownies' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden w-1/4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary p-2 -ml-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Logo & Brand Name - Center on Mobile, Left on Desktop */}
          <div className="flex flex-1 md:flex-none justify-center md:justify-start items-center overflow-hidden">
            <Link to="/" className="flex items-center space-x-2 truncate">
              <img src="/assets/Logo.png" alt="Mithu Homemade Cakes" className="h-10 sm:h-12 md:h-16 w-auto object-contain flex-shrink-0" />
              <span className="font-bold text-[15px] sm:text-lg md:text-xl text-primary md:tracking-wide truncate">
                <span className="md:hidden">Mithu Homemade Cakes</span>
                <span className="hidden md:inline">MITHU HOMEMADE CAKES</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex flex-grow justify-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-textMain'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side icons & FSSAI (Desktop) */}
          <div className="flex items-center justify-end w-1/4 md:w-auto space-x-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-whatsapp hover:text-green-600 transition-colors">
                <WhatsAppIcon size={16} className="mr-1" />
                8825740442
              </a>
              <span className="text-[10px] text-textMuted font-medium">FSSAI: 22426021000575</span>
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-primary hover:bg-softPink rounded-full transition-colors -mr-2 md:mr-0"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-softPink py-4 px-4 flex flex-col space-y-4 fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={`block px-4 py-2 text-base font-medium rounded-lg ${
                location.pathname === link.path ? 'bg-softPink text-primary' : 'text-textMain'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-softPink px-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full clay-button bg-whatsapp shadow-none hover:shadow-none hover:bg-green-600">
              <WhatsAppIcon size={20} className="mr-2" />
              Chat on WhatsApp
            </a>
            <div className="text-center mt-3 text-xs text-textMuted">
              FSSAI Lic. No. 22426021000575
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
