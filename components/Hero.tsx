
import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import ImageLoop from './ImageLoop';

interface HeroProps {
  assets: {
    foreground: string;
    background: string[];
  };
  onOpenChat?: () => void;
}

const Hero: React.FC<HeroProps> = ({ assets, onOpenChat }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [logoData, setLogoData] = useState<object | null>(null);
  const lottieRef = useRef<any>(null);
  const lastScrollRef = useRef(0);
  const playCooldownRef = useRef(false);
  const isAtStartRef = useRef(true);
  const playModeRef = useRef<'idle' | 'forward' | 'reverse'>('idle');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetch('/data/logo.json')
      .then((res) => res.json())
      .then(setLogoData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const TOP_THRESHOLD = 80; // px from top to trigger reverse play

    const handleScroll = () => {
      const current = window.scrollY;
      setScrollY(current);

      if (logoData && lottieRef.current) {
        const delta = current - lastScrollRef.current;
        const scrolled = Math.abs(delta) > 10;

        if (scrolled) {
          if (delta > 0) {
            // Scroll down: play forward only when at start frame
            if (!playCooldownRef.current && isAtStartRef.current) {
              playCooldownRef.current = true;
              playModeRef.current = 'forward';
              const item = lottieRef.current?.animationItem;
              if (item?.resetSegments) item.resetSegments(true);
              lottieRef.current.setDirection(1);
              lottieRef.current.goToAndPlay(0);
            }
          } else if (current < TOP_THRESHOLD) {
            // Scroll up AND reaching the top: play in reverse
            if (!playCooldownRef.current) {
              playCooldownRef.current = true;
              playModeRef.current = 'reverse';
              const anim = lottieRef.current;
              const item = anim?.animationItem;
              const totalFrames = item?.totalFrames ?? 60;
              anim.playSegments([totalFrames - 1, 0], true);
            }
          }
        }
        lastScrollRef.current = current;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [logoData]);

  const playReverseLogo = () => {
    if (logoData && lottieRef.current && !playCooldownRef.current) {
      playCooldownRef.current = true;
      playModeRef.current = 'reverse';
      const anim = lottieRef.current;
      const item = anim?.animationItem;
      const totalFrames = item?.totalFrames ?? 60;
      anim.playSegments([totalFrames - 1, 0], true);
    }
  };

  const handleNavLinkClick = (sectionId: string) => {
    // Close mobile menu immediately for responsive feel
    setIsMenuOpen(false);

    // Special case for Home: Scroll to absolute top
    if (sectionId === 'home') {
      // Trigger reverse Lottie when clicking Home (same as scrolling to top)
      if (window.scrollY > 80) {
        playReverseLogo();
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    // Standard section scroll - no offset
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = ['Home', 'About', 'Portfolio', 'Contact'];
  const isScrolled = scrollY > 20;

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />

      {/* Top Navigation */}
      <nav 
        className={`fixed top-0 left-0 w-full pt-6 pb-4 z-[130] transition-all duration-500 ${
          isScrolled && !isMenuOpen ? 'bg-black/40 backdrop-blur-md py-4' : 'bg-transparent'
        } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={{ transitionDelay: '0ms', transitionDuration: '800ms' }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
        {/* Logo - Left side (Lottie, plays on scroll, stops on last frame) */}
        <button
          onClick={() => handleNavLinkClick('home')}
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer focus:outline-none"
          aria-label="Home"
        >
          {logoData && (
            <Lottie
              lottieRef={lottieRef}
              animationData={logoData}
              loop={false}
              autoplay={false}
              onComplete={() => {
                playCooldownRef.current = false;
                if (playModeRef.current === 'forward') {
                  isAtStartRef.current = false;
                } else if (playModeRef.current === 'reverse') {
                  isAtStartRef.current = true;
                }
                playModeRef.current = 'idle';
              }}
              className="w-full h-full"
            />
          )}
        </button>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-1 justify-center pl-24">
          <div className="bg-black/20 backdrop-blur-md border border-white/5 px-6 py-3 rounded-full items-center shadow-2xl flex">
            <ul className="flex items-center space-x-12">
              {navItems.map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNavLinkClick(item.toLowerCase())}
                    className="text-xs font-black tracking-[0.3em] text-white/60 hover:text-red-500 uppercase transition-all duration-300 cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop - AI Chat button (right) */}
        {onOpenChat && (
        <div className="hidden md:flex flex-shrink-0">
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-red-600/20 border border-red-600/50 hover:border-red-600/50 rounded-full text-white/90 hover:text-red-500 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300"
          >
            MEET MY AI
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z" />
            </svg>
          </button>
        </div>
        )}

        {/* Mobile - Spacer for balance, Hamburger on right */}
        <div className="md:hidden flex-1" />
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center relative focus:outline-none z-[140] flex-shrink-0"
          aria-label="Toggle Menu"
        >
          <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 transform ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
          <span className={`absolute w-6 h-0.5 bg-white transition-all duration-200 ${isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
          <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 transform ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
        </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[115] bg-black/90 backdrop-blur-[40px] transition-all duration-700 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item, idx) => (
            <button 
              key={item}
              onClick={() => handleNavLinkClick(item.toLowerCase())}
              className={`text-4xl font-black tracking-tighter text-white hover:text-red-500 uppercase transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div 
        className="relative z-[60] text-center px-6 w-full max-w-[1200px] pt-32 md:pt-32 pointer-events-auto"
        style={{ transform: `translateY(${-scrollY * 0.12}px)` }}
      >
        <p className="font-playfair italic text-red-600 text-sm md:text-lg mb-2">
          Architecting digital harmony.
        </p>
        
        <h1 
          className="text-[3.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[4.8rem] font-inter-black tracking-tighter leading-[0.84] text-white mb-12 select-none uppercase mx-auto transition-all duration-500 max-w-5xl"
          style={{ wordSpacing: '0.2em' }}
        >
          <span className="opacity-90">When</span> Design <br className="hidden sm:block" /> <span className="opacity-90">Meets</span> Code
        </h1>
        <p className="text-white/60 text-xs md:text-md lg:text-lg mt-[-44px] select-none uppercase mx-auto transition-all duration-500 max-w-5xl tracking-tighter lg:leading-[0.84]">through thoughtful, modern web engineering.</p>
        <div className="flex justify-center">
          {/* <button 
            onClick={() => handleNavLinkClick('portfolio')}
            className="group flex items-center bg-[#f22e44] hover:bg-white text-white hover:text-black px-2 py-2 pr-10 rounded-full transition-all duration-300 shadow-xl shadow-black transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center mr-5 group-hover:bg-[#f22e44] transition-colors">
              <svg className="w-5 h-5 text-[#f22e44] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.25em]">View Portfolio</span>
          </button> */}
        </div>
      </div>

      <div 
        className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          transform: `translateY(${scrollY * 0.2}px)`,
          transitionDelay: '900ms'
        }}
      >
        <div className="w-full max-w-[1800px] mt-[25vh]">
           <ImageLoop images={assets.background} />
        </div>
      </div>

      <div 
        className="absolute bottom-0 w-full h-[60vh] md:h-[65vh] lg:h-[65vh] flex justify-center z-50 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="relative h-full flex justify-center items-end">
          <div className="absolute " />
          {/* Blue/Red Background Blur */}
          <div 
            className={`absolute top-[15%] left-1/2 -translate-x-1/2 w-64 h-64 lg:w-80 lg:h-80 blur-[70px] rounded-full z-[-1] bg-[#e82034] transition-all duration-1000 ${
              isLoaded ? 'opacity-95 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transitionDelay: '600ms' }}
          />
          {/* Center Subject Image */}
          <img 
            src={assets.foreground} 
            alt="Portfolio Subject" 
            className={`h-full w-auto object-contain select-none z-10 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.8))',
              transitionDelay: '300ms'
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[12vh] bg-gradient-to-t from-black via-black/90 to-transparent z-[55] pointer-events-none" />
    </section>
  );
};

export default Hero;
