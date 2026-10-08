import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { InstagramIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-8 border-t border-softPink mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/assets/Logo.png" alt="Mithu Homemade Cakes" className="h-20 object-contain mb-4" />
            <p className="text-textMuted text-sm max-w-xs mb-4">
              Premium homemade bakery. Freshly baked with love, carefully prepared for your special occasions.
            </p>
            <div className="flex space-x-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="p-2 text-whatsapp bg-green-50 rounded-full hover:bg-green-100 transition-colors">
                <Phone size={20} />
              </a>
              <a href="https://www.instagram.com/mithu_homemade_cakes?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-2 text-primary bg-softPink rounded-full hover:bg-pink-100 transition-colors" title="Instagram">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-primary text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/category/cakes" className="text-textMuted hover:text-primary transition-colors">Our Cakes</Link></li>
              <li><Link to="/category/customized" className="text-textMuted hover:text-primary transition-colors">Customized Cakes</Link></li>
              <li><Link to="/menu" className="text-textMuted hover:text-primary transition-colors">Full Menu</Link></li>
              <li><Link to="/about" className="text-textMuted hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-textMuted hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact & FSSAI */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-primary text-lg mb-4">Get In Touch</h3>
            <p className="text-textMuted text-sm mb-2">WhatsApp for Orders:</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-textMain hover:text-whatsapp transition-colors mb-4 block">
              +91 8825740442
            </a>
            <div className="bg-lightPink p-3 rounded-xl border border-softPink inline-block">
              <p className="text-xs font-semibold text-primary text-center">FSSAI LICENSE</p>
              <p className="text-sm font-bold text-textMain text-center tracking-wider">22426021000575</p>
            </div>
          </div>
        </div>

        <div className="border-t border-softPink pt-8 text-center">
          <p className="text-xs text-textMuted">
            &copy; {new Date().getFullYear()} Mithu Homemade Cakes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
