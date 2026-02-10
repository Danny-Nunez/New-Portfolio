import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import FloatingSocials from './components/FloatingSocials';
import { generateHeroAssets, HeroAssets } from './services/geminiService';
import { preloadCriticalImages, preloadNonCriticalImages, HERO_FOREGROUND, HERO_BACKGROUND } from './utils/imagePreloader';

const App: React.FC = () => {
  const [assets, setAssets] = useState<HeroAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState({ loaded: 0, total: 0 });
  const [loaderData, setLoaderData] = useState<object | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    const initAssets = async () => {
      const startTime = Date.now();
      const MIN_LOAD_TIME = 800; // Minimum loader display time (800ms) for smooth UX

      try {
        setLoading(true);

        // Load Lottie preloader first so we never show the old spinner
        try {
          const res = await fetch('/data/dnloader.json');
          if (res.ok) setLoaderData(await res.json());
        } catch {
          setLoaderData(null);
        }

        // Set assets first (use same URLs as preloader so Hero/ImageLoop images are preloaded)
        setAssets({
          foreground: HERO_FOREGROUND,
          background: [...HERO_BACKGROUND],
          aboutImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
        });

        // Preload critical images first (hero section)
        await preloadCriticalImages((loaded, total) => {
          setLoadingProgress({ loaded, total });
        });

        // Calculate elapsed time
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOAD_TIME - elapsed);

        // Wait for minimum load time if needed, then show content
        await new Promise(resolve => setTimeout(resolve, remainingTime));

        // Lock preloader for testing: open with ?preloader=1 in the URL
        const lockPreloader = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('preloader') === '1';
        if (!lockPreloader) setLoading(false);

        // Continue loading non-critical images in background
        preloadNonCriticalImages().catch(err => {
          console.warn("Background image loading failed:", err);
        });
        
      } catch (err) {
        console.error("App: Error loading assets.", err);
        // Fallback to slideshow images
        setAssets({
          foreground: HERO_FOREGROUND,
          background: [...HERO_BACKGROUND],
          aboutImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
        });
        const lockPreloader = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('preloader') === '1';
        if (!lockPreloader) setLoading(false);
      }
    };

    initAssets();
  }, []);

  return (
    <div className="min-h-screen bg-[#000] relative">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-[#000]">
          <div className="flex items-center justify-center overflow-visible">
            {loaderData ? (
              <>
                <div className="h-12 w-auto md:h-16" style={{ aspectRatio: '580/300' }}>
                  <Lottie animationData={loaderData} loop className="w-full h-full" />
                </div>
              </>
            ) : (
              /* Don't show the old spinner — keep placeholder until dnloader.json has loaded */
              <div className="h-24 md:h-32" style={{ aspectRatio: '580/300', width: 'auto', minWidth: 0 }} />
            )}
          </div>
          <div className="text-center px-6 max-w-sm">
            <p className="text-white font-bold tracking-widest uppercase text-xs mb-2">Architecting Your Experience</p>
            <p className="text-gray-400 text-sm mb-4">
              {loadingProgress.total > 0 
                ? `Loading critical assets... ${loadingProgress.loaded}/${loadingProgress.total}`
                : 'Initializing environment...'}
            </p>
            {loadingProgress.total > 0 && (
              <div className="space-y-2">
                <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-out shadow-lg shadow-red-600/50"
                    style={{ width: `${(loadingProgress.loaded / loadingProgress.total) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                  {Math.round((loadingProgress.loaded / loadingProgress.total) * 100)}%
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <Hero assets={assets!} onOpenChat={() => setIsChatModalOpen(true)} />
          <About image={assets!.aboutImage} isChatModalOpen={isChatModalOpen} onOpenChat={setIsChatModalOpen} />
          <Portfolio />
          <Contact />
          <FloatingSocials />
        </>
      )}
      
      <footer className="py-20 text-center text-gray-700 text-[10px] tracking-[0.5em] uppercase border-t border-white/5 mx-8 bg-black">
        <div className="mb-4 text-white font-black tracking-tighter text-xl">DANNYNUNEZ.DEV</div>
        <p>&copy; 2026 | ARCHITECTING DIGITAL PRODUCTS</p>
      </footer>
    </div>
  );
};

export default App;
