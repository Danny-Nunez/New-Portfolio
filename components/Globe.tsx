import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface GlobeProps {
  className?: string;
  config?: any;
}

const Globe: React.FC<GlobeProps> = ({ className = '', config = {} }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let globe: any = null;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 600 * 2,
        height: 600 * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.9, 0.1, 0.1],
        glowColor: [0.9, 0.1, 0.1],
        markers: [
          { location: [39.2904, -76.6122], size: 0.1 }, // Baltimore, Maryland
        ],
        onRender: (state: any) => {
          state.phi = phi;
          phi += 0.005;
        },
        ...config,
      });
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', contain: 'layout style paint' }}
    />
  );
};

export default Globe;

