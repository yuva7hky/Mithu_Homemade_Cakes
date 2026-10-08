import { Link } from 'react-router-dom';
import { generateGeneralEnquiryLink } from '../utils/whatsapp';
import { WhatsAppIcon } from '../components/Icons';

const MenuPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-textMain mb-4">Our Menu</h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">
          Take a look at our complete menu and pricing.
        </p>
      </div>

      <div className="clay-card p-4 sm:p-8 mb-12 relative overflow-hidden">
        <div className="w-full flex justify-center">
          <img 
            src="/assets/Menu.jpeg" 
            alt="Mithu Homemade Cakes Menu" 
            className="max-w-full h-auto rounded-xl shadow-sm border border-softPink"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link to="/category/cakes" className="w-full sm:w-auto clay-button text-center">
          Order Cakes Online
        </Link>
        <a 
          href={generateGeneralEnquiryLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto clay-button bg-whatsapp shadow-none hover:shadow-none hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <WhatsAppIcon size={20} /> Contact on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default MenuPage;
