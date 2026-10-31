import { useEffect, useState, useRef, useCallback } from 'react';

const IntroVideo = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 600); // Smooth 600ms fade out
  }, [onComplete]);

  useEffect(() => {
    // Attempt play immediately
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay handled silently
      });
    }

    // Failsafe timer (video is 4.9s, 7.5s allows complete playback even if buffering occurs)
    const timer = setTimeout(() => {
      handleComplete();
    }, 7500);

    return () => clearTimeout(timer);
  }, [handleComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-600 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #F4F2EE 0%, #E7E5E0 65%, #DAD8D2 100%)'
      }}
      onClick={handleComplete}
    >
      <video 
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay 
        muted 
        playsInline 
        onEnded={handleComplete}
      >
        <source src="/assets/Intro_Video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default IntroVideo;
