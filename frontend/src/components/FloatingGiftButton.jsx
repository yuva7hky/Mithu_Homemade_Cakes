const FloatingGiftButton = ({ onClick }) => {
  return (
    <aside
      aria-label="Surprise Combo Promotion"
      className="fixed z-40 right-3.5 sm:right-6 bottom-[calc(3.5rem+14px+env(safe-area-inset-bottom,0px))] md:bottom-8 md:right-8 pointer-events-auto"
    >
      <button
        onClick={onClick}
        type="button"
        id="floating-surprise-combo-btn"
        aria-label="Open Surprise Combo promotion"
        title="Open Surprise Combo promotion"
        className="group relative flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-primary shadow-[0_8px_25px_rgba(233,30,99,0.28),inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#fce4ec] border-2 border-pink-200/90 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {/* Pulsing indicator badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-[9px] text-white font-bold items-center justify-center">
            ★
          </span>
        </span>

        {/* Circular Gift Icon Container */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-softPink via-white to-softPink flex items-center justify-center shadow-inner border border-pink-100">
          <span 
            className="text-2xl sm:text-[26px] transform transition-transform group-hover:scale-110 animate-gentle-float select-none"
            role="img" 
            aria-label="gift"
          >
            🎁
          </span>
        </div>

        {/* Responsive Desktop Label */}
        <div className="hidden md:flex flex-col text-left pr-3.5 pl-1">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-deepPink">Special Offer</span>
          <span className="text-xs font-bold text-textMain group-hover:text-primary transition-colors flex items-center gap-1">
            Surprise Combo 💝
          </span>
        </div>
      </button>
    </aside>
  );
};

export default FloatingGiftButton;
