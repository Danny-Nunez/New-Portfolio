
import React, { useState, useEffect } from 'react';

interface ImageLoopProps {
  images: string[];
}

const ImageLoop: React.FC<ImageLoopProps> = ({ images }) => {
  const [radius, setRadius] = useState(1150);
  
  // Triple the items for a dense, seamless ring
  const items = [...images, ...images, ...images];
  const itemCount = items.length;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Calculate responsive radius to maintain consistent gaps
      // More granular breakpoints for smoother spacing transitions
      if (width < 640) {
        // Mobile: smaller radius but enough for gaps
        setRadius(650);
      } else if (width < 768) {
        // Small tablet: medium radius
        setRadius(800);
      } else if (width < 1024) {
        // Tablet: larger radius to prevent touching between 769-1023px
        setRadius(1150);
      } else {
        // Desktop: reduced radius to tighten gap after 1024px
        setRadius(1150);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="relative w-full h-[450px] md:h-[700px] flex items-center justify-center overflow-hidden" 
      style={{ 
        perspective: '800px', 
        perspectiveOrigin: '50% 50%' 
      }}
    >
      <div 
        className="animate-carousel-3d relative w-full h-full flex items-center justify-center" 
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0px)' 
        }}
      >
        {items.map((src, idx) => {
          const angle = (idx / itemCount) * 360;
          return (
            <div
              key={idx}
              className="absolute w-[180px] sm:w-[220px] md:w-[330px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] border border-white/10 group"
              style={{
                transform: `rotateY(${angle}deg) translateZ(-${radius}px)`,
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              <img 
                src={src} 
                alt="" 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              />
              
              {/* Premium Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
              
              {/* Dynamic Shine Overlay */}
              <div className="absolute inset-0 card-shine pointer-events-none opacity-20" />
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes carousel-3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
        .animate-carousel-3d {
          animation: carousel-3d 60s linear infinite;
        }
        .card-shine {
          position: relative;
          overflow: hidden;
        }
        .card-shine::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 45%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 55%
          );
          transform: rotate(-45deg);
          animation: shine 12s infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(-45deg); }
          20%, 100% { transform: translateX(100%) rotate(-45deg); }
        }
      `}</style>
    </div>
  );
};

export default ImageLoop;
