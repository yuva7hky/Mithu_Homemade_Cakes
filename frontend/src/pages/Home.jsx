import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, ShieldCheck, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { WhatsAppIcon } from '../components/Icons';

const Home = () => {
  const featuredCakes = products.filter(p => p.category === 'cakes').slice(0, 4);
  const featuredCustom = products.filter(p => p.category === 'customized').slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-softPink to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto mt-4 md:mt-10 fade-in">
          <span className="inline-block py-1 px-3 rounded-full bg-white text-primary text-xs sm:text-sm font-bold tracking-wide shadow-sm mb-6 border border-primary/20">
            Freshly Baked with Love
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-textMain mb-6 leading-tight">
            Premium Homemade <br className="hidden sm:block" />
            <span className="text-primary">Cakes & Treats</span>
          </h1>
          <p className="text-lg sm:text-xl text-textMuted mb-10 max-w-2xl mx-auto leading-relaxed">
            Delicious, freshly baked cakes for every occasion. Made to order with premium ingredients and no artificial preservatives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/category/cakes" className="w-full sm:w-auto clay-button text-center">
              Explore Cakes
            </Link>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto clay-button-secondary text-center flex justify-center items-center gap-2 border-2 border-transparent"
            >
              <WhatsAppIcon size={20} /> Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </section>

      {/* Featured Cakes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-textMain mb-2">Popular Cakes</h2>
            <p className="text-textMuted">Our most loved freshly baked cakes</p>
          </div>
          <Link to="/category/cakes" className="hidden sm:flex items-center text-primary font-semibold hover:text-deepPink transition-colors">
            View All <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredCakes.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/category/cakes" className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-semibold rounded-full hover:bg-softPink transition-colors">
            View All Cakes
          </Link>
        </div>
      </section>

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
