
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import FloatingSocials from './components/FloatingSocials';
import { generateHeroAssets, HeroAssets } from './services/geminiService';
import { preloadCriticalImages, preloadNonCriticalImages } from './utils/imagePreloader';

const App: React.FC = () => {
  const [assets, setAssets] = useState<HeroAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState({ loaded: 0, total: 0 });

  useEffect(() => {
    const initAssets = async () => {
      const startTime = Date.now();
      const MIN_LOAD_TIME = 800; // Minimum loader display time (800ms) for smooth UX
      
      try {
        setLoading(true);
        
        // Set assets first
        setAssets({
          foreground: "/data/me1.png",
          background: [
            "/data/slideshow/01.jpg",
            "/data/slideshow/02.jpg",
            "/data/slideshow/03.jpg",
            "/data/slideshow/04.png",
            "/data/slideshow/05.png",
            "/data/slideshow/06.png",
            "/data/slideshow/07.png"
          ],
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
        
        // Hide loader and show content
        setLoading(false);

        // Continue loading non-critical images in background
        preloadNonCriticalImages().catch(err => {
          console.warn("Background image loading failed:", err);
        });
        
      } catch (err) {
        console.error("App: Error loading assets.", err);
        // Fallback to slideshow images
        setAssets({
          foreground: "https://dannyfullstack.dev/avatars/me1.png",
          background: [
            "/data/slideshow/01.jpg",
            "/data/slideshow/02.jpg",
            "/data/slideshow/03.jpg",
            "/data/slideshow/04.png",
            "/data/slideshow/05.png",
            "/data/slideshow/06.png",
            "/data/slideshow/07.png"
          ],
          aboutImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
        });
        setLoading(false);
      }
    };

    initAssets();
  }, []);

  return (
    <div className="min-h-screen bg-[#000] relative">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-[#000]">
          <div className="relative">
             <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
             </div>
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
          <Hero assets={assets!} />
          <About image={assets!.aboutImage} />
          <Portfolio />
          <Contact />
          <FloatingSocials />
        </>
      )}
      
      <footer className="py-20 text-center text-gray-700 text-[10px] tracking-[0.5em] uppercase border-t border-white/5 mx-8 bg-black">
        <div className="mb-4 text-white font-black tracking-tighter text-xl">DANNYFULLSTACK.DEV</div>
        <p>&copy; 2026 | ARCHITECTING DIGITAL PRODUCTS</p>
      </footer>
    </div>
  );
};

export default App;
