
import React, { useEffect, useState, useRef } from 'react';
import DannyChat from './DannyChat';

interface AboutProps {
  image: string; // Kept for interface consistency if needed elsewhere, but unused in primary UI now
}

const About: React.FC<AboutProps> = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxValue = (factor: number) => {
    if (!sectionRef.current) return 0;
    // Reduce parallax effect on mobile to prevent overlap issues
    const isMobile = window.innerWidth < 768;
    const adjustedFactor = isMobile ? factor * 0.3 : factor;
    const offsetTop = sectionRef.current.offsetTop;
    const distance = scrollY - offsetTop;
    return distance * adjustedFactor;
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black overflow-hidden py-32 px-6 md:px-20"
    >
      {/* Background Parallax Text */}
      <div 
        className="absolute top-1/4 -left-20 text-[20vw] font-black text-white/[0.03] leading-none pointer-events-none select-none whitespace-nowrap"
        style={{ transform: `translateX(${getParallaxValue(-0.2)}px)` }}
      >
        ARCHITECT
      </div>
      <div 
        className="absolute bottom-1/4 -right-20 text-[20vw] font-black text-white/[0.02] leading-none pointer-events-none select-none whitespace-nowrap"
        style={{ transform: `translateX(${getParallaxValue(0.15)}px)` }}
      >
        DEVELOPER
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
        {/* Left Content - Now order-1 on both mobile and desktop */}
        <div className="order-1 lg:order-1">
          <div className="mb-8">
            <span className="text-red-600 font-bold tracking-[0.5em] uppercase text-xs">The Philosophy</span>
            <h2 
              className="text-5xl md:text-7xl font-inter-black text-white tracking-tighter mt-4 leading-tight"
              style={{ wordSpacing: '0.2em' }}
            >
              ELEGANCE IN <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">EVERY PIXEL.</span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            <p>
              I believe that great software isn't just about code—it's about the <span className="text-white italic">emotional response</span> it evokes. 
              As a full-stack engineer with a designer's soul, I treat every project as a piece of digital architecture.
            </p>
            <p>
              My workflow bridges the traditional gap. I don't just hand off designs; I engineer them into existence, ensuring that the final product maintains the precision and soul of the original vision.
            </p>
            <p>
              From <span className="text-white">React micro-frontends</span> to <span className="text-white">robust design systems</span>, I build tools that scale without sacrificing their aesthetic integrity.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-6">Credentials</h3>
            <div className="flex flex-wrap gap-6 items-center">
              {/* Harvard */}
              <a 
                href="https://certificates.cs50.io/9d6b2668-29cb-450b-8890-eab8050930c3.pdf?size=letter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-red-600/50 transition-all duration-300 hover:bg-white/10">
                  <img src='/data/harvard.png' alt="Harvard" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">HARVARD</span>
              </a>

              {/* MIT xPRO */}
              <a 
                href="https://certificates.emeritus.org/3779189a-452b-4050-8c31-059ac6437d8e#gs.4d7xg9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-red-600/50 transition-all duration-300 hover:bg-white/10">
                  <img src='/data/mit.png' alt="MIT" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">MIT XPRO</span>
              </a>

              {/* Meta */}
              <a 
                href="https://www.coursera.org/account/accomplishments/certificate/2NAKJRD9XRSC" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-red-600/50 transition-all duration-300 hover:bg-white/10">
                  <img src='/data/meta.png' alt="META" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">META FRONTEND</span>
              </a>
              <a 
                href="https://www.coursera.org/account/accomplishments/certificate/6MSHPGVCLR9Y" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-red-600/50 transition-all duration-300 hover:bg-white/10">
                  <img src='/data/meta.png' alt="META" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">META JAVASCRIPT</span>
              </a>

              {/* Google */}
              <a 
                href="https://www.coursera.org/account/accomplishments/certificate/3E3MHWM2PHU6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-red-600/50 transition-all duration-300 hover:bg-white/10">
                 <img src='/data/google.png' alt="GOOGLE" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">GOOGLE UX/UI</span>
              </a>
{/*UC DAVIS*/}
<a 
                href="https://www.coursera.org/account/accomplishments/certificate/W4XY953Z39WK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-red-600/50 transition-all duration-300 hover:bg-white/10">
                  <img src='/data/ucdavis.png' alt="UCDAVIS" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] uppercase tracking-widest text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">UCDAVIS SEO</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Visual (Parallax AI Chat Window) - Now order-2 to appear under text on mobile */}
        <div className="order-2 lg:order-2 flex justify-center relative mt-12 lg:mt-0 z-[250]">
          <div 
            className="relative w-full flex justify-center"
            style={{ transform: `translateY(${getParallaxValue(0.1)}px)` }}
          >
            <DannyChat />
          </div>
          
          {/* Experience Badge */}
          <div 
            className="absolute -top-12 -right-8 bg-white p-6 md:p-8 rounded-3xl hidden md:block shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-20 border border-black/5"
            style={{ transform: `translateY(${getParallaxValue(-0.08)}px)` }}
          >
            <div className="text-black">
              <div className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-1">15+</div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold opacity-50 whitespace-nowrap">Years of Craft</div>
            </div>
            
            {/* Small decorative "verified" dot */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-red-600 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
