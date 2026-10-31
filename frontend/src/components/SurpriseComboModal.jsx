import { useEffect } from 'react';
import { X, Sparkles, MessageCircle } from 'lucide-react';
import { generateSurpriseComboWhatsAppLink } from '../utils/whatsapp';
import surpriseComboImg from '../assets/Suprise_Combo.jpeg';

const CELEBRATION_EMOJIS = [
  { emoji: '🎉', className: 'top-[-18px] left-[10%] text-2xl sm:text-3xl animate-confetti-float' },
  { emoji: '🥳', className: 'top-[-22px] right-[14%] text-2xl sm:text-3xl animate-confetti-float-delayed' },
  { emoji: '✨', className: 'top-[22%] left-[-16px] text-xl sm:text-2xl animate-confetti-float' },
  { emoji: '💝', className: 'top-[35%] right-[-14px] text-xl sm:text-2xl animate-confetti-float-delayed' },
  { emoji: '🎈', className: 'bottom-[25%] left-[-18px] text-2xl sm:text-3xl animate-confetti-float-delayed' },
  { emoji: '🎉', className: 'bottom-[18%] right-[-16px] text-2xl sm:text-3xl animate-confetti-float' },
  { emoji: '🥳', className: 'bottom-[-16px] left-[18%] text-2xl sm:text-3xl animate-confetti-float' },
  { emoji: '✨', className: 'bottom-[-14px] right-[20%] text-xl sm:text-2xl animate-confetti-float-delayed' },
];

const SurpriseComboModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGetDetails = () => {
    const link = generateSurpriseComboWhatsAppLink();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-combo-title"
    >
      {/* Soft pink glowing backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        style={{
          background: 'radial-gradient(circle at center, rgba(233, 30, 99, 0.32) 0%, rgba(30, 10, 20, 0.65) 60%, rgba(10, 5, 10, 0.8) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Main Modal Card Wrapper with celebratory emojis */}
      <div className="relative w-full max-w-[420px] sm:max-w-md my-auto z-10 animate-popup-in">
        
        {/* Celebratory 🎉🥳 emojis floating around popup */}
        <div className="pointer-events-none select-none absolute inset-0 -m-3 sm:-m-5 overflow-visible hidden min-[340px]:block">
          {CELEBRATION_EMOJIS.map((item, idx) => (
            <span
              key={idx}
              className={`absolute transform transition-transform duration-500 filter drop-shadow-md ${item.className}`}
              aria-hidden="true"
            >
              {item.emoji}
            </span>
          ))}
        </div>

        {/* Dismiss Button (Ad-style prominent close X) */}
        <button
          onClick={onClose}
          aria-label="Close Surprise Combo promotion"
          className="absolute -top-3 -right-2 sm:-top-3.5 sm:-right-3 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-gray-700 hover:text-primary shadow-[0_4px_16px_rgba(0,0,0,0.25)] border-2 border-softPink/90 flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <X size={22} strokeWidth={2.6} />
        </button>

        {/* Modal Card */}
        <div className="relative bg-gradient-to-b from-white via-white to-[#FFF5F8] rounded-[26px] sm:rounded-3xl shadow-[0_20px_50px_rgba(233,30,99,0.35),0_0_0_1px_rgba(255,255,255,0.9)] border border-pink-100 overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Festive Top Banner Pill */}
          <div className="pt-4 pb-2 px-4 sm:px-6 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-gradient-to-r from-primary to-deepPink text-white text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
              Exclusive Celebration Offer
            </span>
          </div>

          {/* Scrollable Content Container */}
          <div className="px-4 sm:px-6 pb-5 sm:pb-6 overflow-y-auto">
            {/* Surprise Combo Photograph */}
            <div className="relative rounded-2xl overflow-hidden bg-softPink shadow-inner border border-pink-200/60 mb-3.5 sm:mb-4 group">
              <img
                src={surpriseComboImg || "/assets/Suprise_Combo.jpeg"}
                alt="Surprise Combo - Cake, Bouquet & Gift arrangement"
                className="w-full aspect-[4/3] max-h-[220px] sm:max-h-[250px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/Suprise_Combo.jpeg";
                }}
              />
              <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                🎁 Complete Hamper
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center mb-4 sm:mb-5">
              <h2 
                id="surprise-combo-title"
                className="text-2xl sm:text-[28px] font-extrabold text-textMain tracking-tight mb-1.5 flex items-center justify-center gap-1.5"
              >
                Surprise Combo 🎁
              </h2>
              
              <p className="text-base sm:text-lg font-bold text-primary mb-2">
                “Cake + Bouquet + Gift as your wish 💝”
              </p>

              <p className="text-xs sm:text-sm text-textMuted max-w-xs mx-auto leading-relaxed">
                Make your celebration unforgettable! Custom baked cake, fresh rose bouquet, and personalized gift tailored to your wish.
              </p>
              
              <div className="mt-2.5 inline-block text-[11px] sm:text-xs font-semibold text-deepPink/90 bg-softPink/60 px-3 py-1 rounded-full border border-pink-200/50">
                ✨ Customized Pricing on Request
              </div>
            </div>

            {/* Prominent Pink Button */}
            <button
              onClick={handleGetDetails}
              className="w-full bg-gradient-to-r from-primary via-[#F0286F] to-deepPink text-white font-bold text-base sm:text-lg py-3 sm:py-3.5 px-6 rounded-full shadow-[0_8px_25px_rgba(233,30,99,0.38)] hover:shadow-[0_12px_30px_rgba(233,30,99,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <MessageCircle size={20} className="transition-transform group-hover:scale-110" />
              <span>Get Surprise Details</span>
            </button>
            
            <p className="text-[10px] sm:text-[11px] text-center text-textMuted/70 mt-2">
              Chat directly on WhatsApp • Custom arrangements made to order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurpriseComboModal;
