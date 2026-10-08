import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, generateGeneralEnquiryLink } from '../utils/whatsapp';
import { WhatsAppIcon, InstagramIcon } from '../components/Icons';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-textMain mb-4">Contact Us</h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">
          We'd love to hear from you! Reach out for orders, customized cake enquiries, or any questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="clay-card p-8 sm:p-10 flex flex-col">
          <h2 className="text-2xl font-bold text-primary mb-8">Get In Touch</h2>
          
          <div className="space-y-6 flex-grow">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start group">
              <div className="bg-lightPink p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors mr-4">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-textMain text-lg mb-1">WhatsApp / Phone</h3>
                <p className="text-textMuted group-hover:text-primary transition-colors">+91 8825740442</p>
              </div>
            </a>

            <a href="https://www.instagram.com/mithu_homemade_cakes?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex items-start group">
              <div className="bg-lightPink p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors mr-4">
                <InstagramIcon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-textMain text-lg mb-1">Instagram</h3>
                <p className="text-textMuted group-hover:text-primary transition-colors">@mithu_homemade_cakes</p>
              </div>
            </a>
            
            <div className="flex items-start">
              <div className="bg-lightPink p-3 rounded-full text-primary mr-4">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-textMain text-lg mb-1">Location</h3>
                <p className="text-textMuted">Homemade Bakery<br/>Contact us for pickup details</p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-4 bg-lightPink rounded-2xl border border-softPink text-center">
            <p className="text-xs font-semibold text-primary uppercase mb-1">FSSAI Certified</p>
            <p className="text-sm font-bold text-textMain">Lic. No. 22426021000575</p>
          </div>
        </div>

        {/* WhatsApp CTA Card */}
        <div className="clay-card p-8 sm:p-10 bg-primary border-none flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-900 opacity-20 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md mb-6">
              <MessageCircle size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Message Us Directly</h2>
            <p className="text-white/90 text-lg mb-10">
              The fastest way to place an order or enquire about customized cakes is through WhatsApp.
            </p>
            <a 
              href={generateGeneralEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-white w-full py-4 rounded-full font-bold text-lg flex items-center justify-center hover:bg-green-500 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <WhatsAppIcon size={28} className="mr-2" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
