import { Heart, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { WhatsAppIcon, InstagramIcon } from '../components/Icons';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 fade-in">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-textMain mb-4">About Us</h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
      </div>

      <div className="clay-card overflow-hidden mb-12 sm:mb-16">
        <div className="p-8 sm:p-12 text-center">
          <img src="/assets/Logo.png" alt="Mithu Homemade Cakes" className="h-32 sm:h-40 mx-auto object-contain mb-8" />
          
          <h2 className="text-2xl sm:text-3xl font-bold text-textMain mb-6">Baked With Love</h2>
          
          <div className="space-y-6 text-lg text-textMuted leading-relaxed max-w-2xl mx-auto">
            <p>
              Welcome to <span className="font-semibold text-primary">Mithu Homemade Cakes</span>, where every creation is baked with passion and crafted with care right from our home kitchen.
            </p>
            <p>
              We believe that special occasions deserve cakes that not only look beautiful but taste absolutely delicious. That's why we use premium ingredients, avoid unnecessary preservatives, and bake every order fresh just for you.
            </p>
            <p>
              From classic flavors to beautiful customized creations, we pour our heart into making your celebrations sweeter and more memorable.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="clay-card p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-lightPink rounded-full flex items-center justify-center text-primary mb-4">
            <Heart size={32} />
          </div>
          <h3 className="text-xl font-bold text-textMain mb-2">Our Promise</h3>
          <p className="text-textMuted">Freshly baked, homemade preparation, and beautiful packaging for every single order.</p>
        </div>

        <div className="clay-card p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-lightPink rounded-full flex items-center justify-center text-primary mb-4">
            <Phone size={32} />
          </div>
          <h3 className="text-xl font-bold text-textMain mb-6">Contact Us</h3>
          
          <div className="flex flex-col space-y-4 w-full text-textMuted">
            <div className="flex items-center justify-center space-x-3">
              <a href="https://wa.me/918825740442" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors cursor-pointer" title="Chat on WhatsApp">
                <WhatsAppIcon size={20} />
              </a>
              <span className="text-textMuted mx-1">/</span>
              <a href="tel:+918825740442" className="flex items-center hover:text-primary transition-colors cursor-pointer text-base font-medium">
                <Phone size={18} className="mr-2" />
                +91 8825740442
              </a>
            </div>
            
            <a href="https://www.instagram.com/mithu_homemade_cakes?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-primary transition-colors cursor-pointer text-base font-medium">
              <InstagramIcon size={20} className="mr-2" />
              @mithu_homemade_cakes
            </a>

            <div className="flex items-center justify-center text-base font-medium mt-2">
              <span className="text-primary font-bold mr-2">FSSAI</span>
              Lic. No. 22426021000575
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
