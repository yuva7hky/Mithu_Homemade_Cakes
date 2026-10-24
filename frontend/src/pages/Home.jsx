import { Link } from 'react-router-dom';
import { Star, Heart, ShieldCheck, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PopularCakesCarousel from '../components/PopularCakesCarousel';
import { products } from '../data/products';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { WhatsAppIcon } from '../components/Icons';

const Home = () => {
  const featuredCustom = products.filter(p => p.category === 'customized').slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section - Compact & Responsive matching Screenshot 2 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-softPink to-white pt-3 pb-3 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto mt-0 sm:mt-4 md:mt-8 fade-in">
          <span className="inline-block py-0.5 px-3 rounded-full bg-white text-primary text-[11px] sm:text-sm font-bold tracking-wide shadow-sm mb-2 sm:mb-4 border border-primary/20">
            Freshly Baked with Love
          </span>
          <h1 className="text-2xl min-[360px]:text-[26px] min-[400px]:text-3xl sm:text-5xl md:text-6xl font-extrabold text-textMain mb-2 sm:mb-4 leading-tight tracking-tight">
            Premium Homemade <span className="text-primary block sm:inline">Cakes & Treats</span>
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-textMuted mb-3.5 sm:mb-6 max-w-sm sm:max-w-xl mx-auto leading-normal px-1">
            Delicious, freshly baked cakes for every occasion. Made to order with premium ingredients and no artificial preservatives.
          </p>
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-5 w-full max-w-xs sm:max-w-md mx-auto px-1">
            <Link 
              to="/category/cakes" 
              className="bg-primary text-white rounded-full shadow-md hover:shadow-lg font-bold text-xs sm:text-base px-3.5 py-2 sm:px-8 sm:py-3.5 transition-all text-center whitespace-nowrap flex-1 sm:flex-none flex items-center justify-center active:scale-95"
            >
              Explore Cakes
            </Link>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-primary border border-primary/20 rounded-full shadow-sm hover:shadow-md font-bold text-xs sm:text-base px-3 py-2 sm:px-6 sm:py-3.5 transition-all text-center whitespace-nowrap flex-1 sm:flex-none flex items-center justify-center gap-1.5 active:scale-95"
            >
              <WhatsAppIcon size={16} /> Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob pointer-events-none"></div>
        <div className="absolute top-10 right-4 w-24 h-24 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000 pointer-events-none"></div>
      </section>

      {/* Popular Cakes - Flipkart-style Auto & Manual Moving Horizontal Carousel */}
      <PopularCakesCarousel />

      {/* Shop by Category */}
      <section className="py-16 bg-lightPink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-textMain mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Link to="/category/customized" className="group block h-64 relative rounded-3xl overflow-hidden shadow-clay-pink">
              <img src="/assets/Customize/Customized Doll cake!.jpeg" alt="Customized Cakes" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Customized Cakes</h3>
                <p className="text-white/80 text-sm">Special designs for your events</p>
              </div>
            </Link>
            
            <Link to="/category/brownies" className="group block h-64 relative rounded-3xl overflow-hidden shadow-clay-pink">
              <img src="/assets/Brownie/Brownie.jpeg" alt="Brownies" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Brownies</h3>
                <p className="text-white/80 text-sm">Rich, fudgy & delicious</p>
              </div>
            </Link>
            
            <Link to="/category/treats" className="group block h-64 relative rounded-3xl overflow-hidden shadow-clay-pink">
              <img src="/assets/Menu.jpeg" alt="Treats" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Treats</h3>
                <p className="text-white/80 text-sm">Cupcakes & Cookies</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Customized Cakes Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-textMain mb-4">Make It Special</h2>
          <p className="text-textMuted max-w-2xl mx-auto">We design beautiful customized cakes to make your celebrations unforgettable. Contact us with your ideas!</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredCustom.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white border-y border-softPink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center p-6 clay-card">
              <div className="w-16 h-16 bg-lightPink rounded-full flex items-center justify-center text-primary mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-lg font-bold text-textMain mb-2">Made with Love</h3>
              <p className="text-sm text-textMuted">Every cake is baked completely from scratch in our home kitchen.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 clay-card">
              <div className="w-16 h-16 bg-lightPink rounded-full flex items-center justify-center text-primary mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold text-textMain mb-2">Freshly Baked</h3>
              <p className="text-sm text-textMuted">We bake to order. Your cake is made fresh specifically for you.</p>
            </div>

            <div className="flex flex-col items-center p-6 clay-card">
              <div className="w-16 h-16 bg-lightPink rounded-full flex items-center justify-center text-primary mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-lg font-bold text-textMain mb-2">Premium Quality</h3>
              <p className="text-sm text-textMuted">We use only high-quality ingredients for the best taste and texture.</p>
            </div>

            <div className="flex flex-col items-center p-6 clay-card">
              <div className="w-16 h-16 bg-lightPink rounded-full flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-textMain mb-2">FSSAI Certified</h3>
              <p className="text-sm text-textMuted">Registered home baker ensuring hygiene and safety standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Order?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Browse our menu or chat with us directly on WhatsApp to discuss your order or customized cake needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/menu" className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              View Menu
            </Link>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="w-full sm:w-auto bg-whatsapp text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <WhatsAppIcon size={24} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
