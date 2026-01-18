
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import FloatingSocials from './components/FloatingSocials';
import { generateHeroAssets, HeroAssets } from './services/geminiService';

const App: React.FC = () => {
  const [assets, setAssets] = useState<HeroAssets | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAssets = async () => {
      try {
        setLoading(true);
        // Use local slideshow images directly
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
      } finally {
        setLoading(false);
      }
    };

    initAssets();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className="relative">
             <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
             </div>
          </div>
          <div className="text-center px-6">
            <p className="text-white font-bold tracking-widest uppercase text-xs mb-2">Architecting Your Experience</p>
            <p className="text-gray-500 text-sm italic">Initializing environment...</p>
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
