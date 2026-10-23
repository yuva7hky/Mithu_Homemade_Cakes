import { useEffect, useState, useRef } from 'react';

const IntroVideo = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt play immediately
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled silently
      });
    }

    // Failsafe timer (video is ~4.9s long)
    const timer = setTimeout(() => {
      handleComplete();
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 700); // Smooth 700ms fade out
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 select-none ${
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
        <source src="/assets/intro_video.mp4" type="video/mp4" />
        <source src="/assets/Intro_Video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default IntroVideo;

