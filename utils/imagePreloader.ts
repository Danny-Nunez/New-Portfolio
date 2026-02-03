// Utility function to preload images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      resolve(); // Resolve anyway to not block the app
    };
    img.src = src;
  });
};

// Hero section image URLs - single source of truth for loader and App assets
export const HERO_FOREGROUND = "/data/me1.png";
export const HERO_BACKGROUND = [
  "/data/tradiantixfullweb.jpg",
  "/data/negozeefullweb.jpg",
  "/data/briwebfull.jpg",
  "/data/chainfullweb.jpg",
  "/data/facilfullweb.jpg",
  "/data/beatinboxfullweb.jpg",
  "/data/slideshow/07.png",
];

// Get critical images (hero section - foreground + ImageLoop carousel)
export const getCriticalImagePaths = (): string[] => {
  return [HERO_FOREGROUND, ...HERO_BACKGROUND];
};

// Get non-critical images (below the fold - can load in background)
export const getNonCriticalImagePaths = (): string[] => {
  // About section (e.g. chat avatar)
  const aboutImages = ["/data/me2.png"];

  // Credential logos
  const credentialImages = [
    "/data/harvard.png",
    "/data/mit.png",
    "/data/meta.png",
    "/data/google.png",
    "/data/ucdavis.png"
  ];

  // Portfolio images
  const portfolioImages = [
    // TRADIANTIX
    "/data/tradiantixwide.png",
    "/data/tradiantix-web/trade1.png",
    "/data/tradiantix-web/trade2.png",
    "/data/tradiantix-web/trade3.png",
    // NEGOZEE
    "/data/negozee.png",
    "/data/negozeewide.png",
    "/data/negozee-web-app/web1.png",
    "/data/negozee-web-app/web2.png",
    "/data/negozee-web-app/web3.png",
    "/data/negozee-mobile-app/app1.webp",
    "/data/negozee-mobile-app/app2.webp",
    "/data/negozee-mobile-app/app3.webp",
    "/data/negozee-mobile-app/app4.webp",
    "/data/negozee-mobile-app/app5.webp",
    "/data/negozee-mobile-app/app6.webp",
    // BEATINBOX
    "/data/beatinbox.png",
    "/data/beatinbox-web/beatinbox-wide.png",
    "/data/beatinbox-web/beatinbox-web1.png",
    "/data/beatinbox-web/beatinbox-web2.png",
    "/data/beatinbox-web/beatinbox-web3.png",
    "/data/beatinbox-mobile-app/app1.png",
    "/data/beatinbox-mobile-app/app2.png",
    "/data/beatinbox-mobile-app/app3.png",
    "/data/beatinbox-mobile-app/app4.png",
    "/data/beatinbox-mobile-app/app5.png",
    "/data/beatinbox-mobile-app/app6.png",
    // BILL OF RIGHTS INSTITUTE
    "/data/bri.png",
    "/data/bri-web/bri-web1.png",
    "/data/bri-web/bri-web2.png",
    "/data/bri-web/bri-web3.png",
    // CHAIN IMPERIUM
    "/data/chain-web/chain-wide.png",
    "/data/chain-web/chain-web1.png",
    "/data/chain-web/chain-web2.png",
    "/data/chain-web/chain-web3.png",
    // FACILPAY
    "/data/facil-web/facil-wide.png",
    "/data/facil-web/facil-web1.png",
    "/data/facil-web/facil-web2.png",
    "/data/facil-web/facil-web3.png"
  ];

  // Combine and remove duplicates
  const allImages = [...aboutImages, ...credentialImages, ...portfolioImages];
  return Array.from(new Set(allImages));
};

// Get all images used in the application
export const getAllImagePaths = (): string[] => {
  return [...getCriticalImagePaths(), ...getNonCriticalImagePaths()];
};

// Preload critical images first (for fast initial render)
export const preloadCriticalImages = async (onProgress?: (loaded: number, total: number) => void): Promise<void> => {
  const imagePaths = getCriticalImagePaths();
  const total = imagePaths.length;
  let loaded = 0;

  await Promise.all(
    imagePaths.map(async (src) => {
      await preloadImage(src);
      loaded++;
      if (onProgress) {
        onProgress(loaded, total);
      }
    })
  );
};

// Preload non-critical images in background
export const preloadNonCriticalImages = async (onProgress?: (loaded: number, total: number) => void): Promise<void> => {
  const imagePaths = getNonCriticalImagePaths();
  const total = imagePaths.length;
  let loaded = 0;

  // Load images in parallel but don't block
  await Promise.all(
    imagePaths.map(async (src) => {
      await preloadImage(src);
      loaded++;
      if (onProgress) {
        onProgress(loaded, total);
      }
    })
  );
};

// Preload all images (legacy function - kept for compatibility)
export const preloadAllImages = async (onProgress?: (loaded: number, total: number) => void): Promise<void> => {
  await preloadCriticalImages(onProgress);
  await preloadNonCriticalImages(onProgress);
};

