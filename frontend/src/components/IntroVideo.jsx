import { useEffect, useState, useRef } from 'react';

const IntroVideo = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Failsafe in case video doesn't play or end event doesn't fire
    const timer = setTimeout(() => {
      handleComplete();
    }, 6000); // Intro is approx 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // 1s fade out duration matching CSS
  };

  return (
    <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center ${isFading ? 'video-fade-out' : ''}`}>
      <video 
        ref={videoRef}
        className="w-full h-full object-cover sm:object-contain" // object-contain on larger screens to not crop logo
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
