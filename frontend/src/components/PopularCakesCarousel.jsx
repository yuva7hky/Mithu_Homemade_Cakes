import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, X, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { generateCakeInquiryWhatsAppLink } from '../utils/whatsapp';

// Explicit Vite asset imports for the cake images in src/assets
import blueberryCakeImg from '../assets/Blueberry_Cake.jpeg';
import fruitCakeImg from '../assets/Fruit_Cake.jpeg';
import themeCakeImg from '../assets/Theme_Cake.jpeg';
import tireCakeImg from '../assets/Tire_cake.jpeg';
import customizedCakeImg from '../assets/Customaized_Cake.jpeg';
import calendarBrownieImg from '../assets/calendar_Brownie.jpeg';

// Curated popular cakes featuring newly placed cake images and verified favorites
const POPULAR_CAKES = [
  {
    id: 'fruit-cake',
    name: 'Fruit Cake',
    image: fruitCakeImg,
    fallbackImage: '/assets/Fruit_Cake.jpeg',
    category: 'cakes',
    badge: 'Fresh',
    priceOnRequest: true,
    description: 'Freshly baked rich sponge cake loaded with luscious glazed seasonal fruits and light vanilla cream.'
  },
  {
    id: 'theme-cake',
    name: 'Theme Cake',
    image: themeCakeImg,
    fallbackImage: '/assets/Theme_Cake.jpeg',
    category: 'customized',
    badge: 'Custom',
    priceOnRequest: true,
    description: 'Handcrafted celebration theme cake meticulously decorated to match your special party theme.'
  },
  {
    id: 'tier-cake',
    name: 'Tier Cake',
    image: tireCakeImg,
    fallbackImage: '/assets/Tire_cake.jpeg',
    category: 'customized',
    badge: 'Grand',
    priceOnRequest: true,
    description: 'Spectacular multi-tier designer celebration cake crafted for weddings, receptions, and milestone celebrations.'
  },
  {
    id: 'blueberry-cake',
    name: 'Blueberry Cake',
    image: blueberryCakeImg,
    fallbackImage: '/assets/Blueberry_Cake.jpeg',
    category: 'cakes',
    badge: 'Popular',
    basePrice: 350,
    baseWeight: '0.5 KG',
    availableWeights: [0.5, 1, 1.5, 2],
    description: 'Sweet and tangy blueberry cake layered with fresh cream and real blueberry compote.'
  },
  {
    id: 'customized-cake',
    name: 'Customized Cake',
    image: customizedCakeImg,
    fallbackImage: '/assets/Customaized_Cake.jpeg',
    category: 'customized',
    badge: 'Bespoke',
    priceOnRequest: true,
    description: 'Artfully designed bespoke cake tailored to your favorite flavor, color palette, and occasion.'
  },
  {
    id: 'calendar-brownie',
    name: 'Calendar Brownie',
    image: calendarBrownieImg,
    fallbackImage: '/assets/calendar_Brownie.jpeg',
    category: 'brownies',
    badge: 'Special',
    priceOnRequest: true,
    description: 'Personalized date celebration brownie slab with custom calendar markings made for anniversaries and birthdays.'
  },
  {
    id: 'rasamalai-cake',
    name: 'Rasamalai Cake',
    image: '/assets/Rasamalai cake.jpeg',
    category: 'cakes',
    badge: 'Bestseller',
    basePrice: 450,
    baseWeight: '0.5 KG',
    availableWeights: [0.5, 1, 1.5, 2],
    description: 'Delectable fusion dessert combining authentic rasamalai, saffron-infused milk cream, and soft sponge.'
  },
  {
    id: 'red-velvet-cake',
    name: 'Red Velvet Cake',
    image: '/assets/Red-velvet.jpeg',
    category: 'cakes',
    badge: 'Classic',
    basePrice: 550,
    baseWeight: '0.5 KG',
    availableWeights: [0.5, 1, 1.5, 2],
    description: 'Rich, vibrant red velvet cake with velvety cream cheese frosting and a smooth texture.'
  },
  {
    id: 'butterscotch-cake',
    name: 'Butterscotch Cake',
    image: '/assets/Butterscotch cake.jpeg',
    category: 'cakes',
    badge: 'Popular',
    basePrice: 450,
    baseWeight: '0.5 KG',
    availableWeights: [0.5, 1, 1.5, 2],
    description: 'Crunchy and sweet butterscotch cake topped with buttery caramel sauce and homemade cashew praline.'
  },
  {
    id: 'white-forest-cake',
    name: 'White Forest Cake',
    image: '/assets/White forest.jpeg',
    category: 'cakes',
    badge: 'Popular',
    basePrice: 450,
    baseWeight: '0.5 KG',
    availableWeights: [0.5, 1, 1.5, 2],
    description: 'Delicate vanilla sponge layered with fluffy whipped cream, sweet cherries, and fine white chocolate curls.'
  }
];

const PopularCakesCarousel = () => {
  const scrollRef = useRef(null);
  const [selectedCake, setSelectedCake] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const resumeTimeoutRef = useRef(null);

  const openModal = (cake) => {
    setSelectedCake(cake);
    setSelectedWeight(cake.availableWeights ? cake.availableWeights[0] : null);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCake(null);
    };
    if (selectedCake) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCake]);

  // Scroll function
  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    // Calculate card width dynamically based on visible child
    const firstCard = container.querySelector('[data-carousel-card]');
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 260; // card width + gap
    
    if (direction === 'left') {
      if (container.scrollLeft <= 10) {
        // Wrap around to end
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    } else {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        // Wrap around to start
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }
  }, []);

  // Pause interaction and schedule resume
  const handleUserInteractionStart = useCallback(() => {
    setIsInteracting(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  const handleUserInteractionEnd = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    // Resume auto-scroll after 3.5s of inactivity
    resumeTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3500);
  }, []);

  // Automatic carousel movement every 4.5 seconds
  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      // Don't auto-scroll if user is interacting, modal is open, or tab is hidden
      if (!isInteracting && !selectedCake && document.visibilityState === 'visible') {
        scroll('right');
      }
    }, 4500);

    return () => {
      clearInterval(interval);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isInteracting, selectedCake, scroll]);

  // Handle WhatsApp inquiry click
  const handleWhatsAppInquiry = (cake) => {
    const link = generateCakeInquiryWhatsAppLink(cake.name);
    window.open(link, '_blank');
  };

  return (
    <section 
      id="popular-cakes-section"
      className="pt-1.5 pb-3 sm:py-8 md:py-12 bg-gradient-to-b from-white via-softPink/30 to-white relative overflow-hidden border-y border-softPink/50"
      aria-label="Popular Cakes Carousel"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-2 sm:mb-5">
          <div>
            <div className="flex items-center gap-1 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">
              <Sparkles size={13} className="text-primary animate-pulse" />
              <span>CUSTOMER FAVOURITES</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-textMain tracking-tight">
              Popular Cakes
            </h2>
            <p className="text-textMuted text-[11px] sm:text-sm md:text-base mt-0.5">
              Freshly baked favourites, made with love.
            </p>
          </div>

          {/* Desktop Controls & View All */}
          <div className="flex items-center gap-3">
            <Link 
              to="/category/cakes" 
              className="hidden sm:inline-flex items-center gap-1 text-primary text-sm font-semibold hover:text-deepPink transition-colors py-1 px-2.5 rounded-full hover:bg-softPink/60"
            >
              View All <ArrowRight size={16} />
            </Link>

            {/* Navigation arrows (desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => {
                  handleUserInteractionStart();
                  scroll('left');
                  handleUserInteractionEnd();
                }}
                className="w-9 h-9 rounded-full bg-white shadow-clay-pink hover:bg-softPink text-primary flex items-center justify-center transition-all duration-200 active:scale-95 border border-white"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => {
                  handleUserInteractionStart();
                  scroll('right');
                  handleUserInteractionEnd();
                }}
                className="w-9 h-9 rounded-full bg-white shadow-clay-pink hover:bg-softPink text-primary flex items-center justify-center transition-all duration-200 active:scale-95 border border-white"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative -mx-3 px-3 sm:mx-0 sm:px-0"
          onMouseEnter={handleUserInteractionStart}
          onMouseLeave={handleUserInteractionEnd}
          onTouchStart={handleUserInteractionStart}
          onTouchEnd={handleUserInteractionEnd}
        >
          <div
            ref={scrollRef}
            className="flex gap-2.5 sm:gap-5 overflow-x-auto scroll-smooth py-1.5 px-1 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {POPULAR_CAKES.map((cake) => {
              const hasVerifiedPrice = !cake.priceOnRequest && cake.basePrice;

              return (
                <div
                  key={cake.id}
                  data-carousel-card
                  onClick={() => openModal(cake)}
                  className="snap-start flex-shrink-0 w-[44vw] min-w-[150px] max-w-[185px] sm:w-[28vw] sm:max-w-[240px] md:w-[28vw] md:max-w-[260px] lg:w-[22vw] lg:max-w-[280px] bg-white rounded-2xl p-2 sm:p-3.5 shadow-clay-pink hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer border border-white/80 active:scale-[0.98]"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-softPink/40 mb-1.5 sm:mb-2.5">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      loading="lazy"
                      onError={(e) => {
                        if (cake.fallbackImage && e.target.src !== cake.fallbackImage) {
                          e.target.src = cake.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {cake.badge && (
                      <span className="absolute top-1.5 left-1.5 bg-white/95 backdrop-blur-md text-primary text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                        {cake.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-bold text-xs sm:text-base text-textMain line-clamp-1 group-hover:text-primary transition-colors">
                      {cake.name}
                    </h3>
                    <p className="text-[9px] sm:text-xs text-textMuted line-clamp-1 mt-0.5 mb-1 sm:mb-2">
                      {cake.description}
                    </p>

                    {/* Price and CTA row */}
                    <div className="mt-auto pt-1 sm:pt-2 border-t border-softPink/60 flex items-center justify-between gap-1">
                      {hasVerifiedPrice ? (
                        <div className="flex flex-col">
                          <span className="text-[8px] sm:text-[9px] text-textMuted uppercase font-semibold leading-none">Starts from</span>
                          <span className="font-extrabold text-primary text-xs sm:text-base leading-tight">
                            ₹{cake.basePrice}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-[8px] sm:text-[9px] text-textMuted uppercase font-semibold leading-none">Custom</span>
                          <span className="font-bold text-primary text-[10px] sm:text-xs leading-tight">
                            Price on Request
                          </span>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(cake);
                        }}
                        className="bg-softPink text-primary hover:bg-primary hover:text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm whitespace-nowrap"
                      >
                        {hasVerifiedPrice ? 'View Details' : 'Get Details'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View All link */}
        <div className="mt-2 text-center sm:hidden">
          <Link
            to="/category/cakes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-white px-4 py-1.5 rounded-full shadow-sm border border-primary/20 hover:bg-softPink active:scale-95"
          >
            Explore All Cakes <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedCake && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
          onClick={() => setSelectedCake(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cake-title"
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden border border-white/80 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCake(null)}
              className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md text-textMuted hover:text-primary flex items-center justify-center transition-colors"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-softPink/40 mb-4 shadow-inner">
              <img
                src={selectedCake.image}
                alt={selectedCake.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                {selectedCake.category}
              </span>
            </div>

            {/* Cake Title & Details */}
            <div className="mb-4">
              <h3 id="modal-cake-title" className="text-xl sm:text-2xl font-extrabold text-textMain mb-1">
                {selectedCake.name}
              </h3>
              <p className="text-textMuted text-xs sm:text-sm leading-relaxed">
                {selectedCake.description}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="bg-lightPink/70 rounded-2xl p-3.5 sm:p-4 mb-5 border border-softPink">
              {!selectedCake.priceOnRequest && selectedCake.basePrice ? (
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
                      Price Details
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-primary">
                      ₹{selectedWeight ? selectedCake.basePrice * (selectedWeight / 0.5) : selectedCake.basePrice}
                    </span>
                  </div>

                  {selectedCake.availableWeights && selectedCake.availableWeights.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-textMuted block mb-1.5">
                        Select Weight:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedCake.availableWeights.map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => setSelectedWeight(w)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                              selectedWeight === w
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-white text-textMain border border-softPink hover:border-primary'
                            }`}
                          >
                            {w} KG
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">Pricing</span>
                    <span className="text-base sm:text-lg font-bold text-primary">Price on Request</span>
                  </div>
                  <p className="text-xs text-textMuted">
                    Freshly baked to your custom design and size specifications. Connect with us on WhatsApp for exact pricing and available options.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => handleWhatsAppInquiry(selectedCake)}
                className="w-full bg-whatsapp hover:bg-green-600 text-white font-bold py-3 px-5 rounded-full text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <WhatsAppIcon size={20} />
                Get Details on WhatsApp
              </button>

              <div className="flex items-center justify-between pt-1">
                <Link
                  to={`/product/${selectedCake.id}`}
                  onClick={() => setSelectedCake(null)}
                  className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View Full Product Page <ArrowRight size={12} />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedCake(null)}
                  className="text-xs text-textMuted hover:text-textMain font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularCakesCarousel;
