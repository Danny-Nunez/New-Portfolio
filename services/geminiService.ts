
import { GoogleGenAI } from "@google/genai";

export interface HeroAssets {
  foreground: string;
  background: string[];
  aboutImage: string;
}

/**
 * Generates assets ensuring the specific user avatar is prioritized for the foreground.
 * Includes more defensive error handling to handle quota limits gracefully.
 */
export const generateHeroAssets = async (): Promise<HeroAssets> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const foregroundUrl = "https://dannyfullstack.dev/avatars/me1.png";

  const bgPrompts = [
    "Futuristic command center UI, glowing red and white, data nodes and connections, cinematic, 4k.",
    "Macro of a sleek black laptop keyboard with red glowing backlights, high-end tech.",
    "Abstract code visualization in 3D, glowing red syntax on dark glass panels.",
    "Sleek minimalist dashboard design, dark mode, red accent colors, premium software aesthetic.",
    "Geometric architectural structure, glowing red lines, night shot, technical precision.",
    "Close up of glowing optic fibers carrying red light pulses, dark technical background."
  ];

  // Map prompts to individual promises and catch errors individually
  const bgPromises = bgPrompts.map(async (prompt) => {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "3:4" } }
      });
      const part = res.candidates?.[0]?.content?.parts?.[0];
      if (part?.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
      return null;
    } catch (e) {
      console.warn("Asset generation part failed:", e);
      return null;
    }
  });

  const aboutImagePromise = (async () => {
    try {
      const aboutRes = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [{
            text: "Extreme macro of complex technical circuitry, red glowing traces on black carbon fiber, professional photography."
          }]
        },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      const part = aboutRes.candidates?.[0]?.content?.parts?.[0];
      if (part?.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
      return null;
    } catch (e) {
      return null;
    }
  })();

  const [aboutImageUrl, ...backgroundUrlsRaw] = await Promise.all([aboutImagePromise, ...bgPromises]);

  // Filter out any failed generations
  const backgroundUrls = backgroundUrlsRaw.filter((url): url is string => url !== null);

  // If we have zero background URLs, the quota might be totally hit. 
  // We'll return empty here and let the App component handle the global fallback with high-quality placeholders.
  if (backgroundUrls.length === 0) {
    throw new Error("Quota exceeded or all asset generation failed");
  }

  return {
    foreground: foregroundUrl,
    background: backgroundUrls,
    aboutImage: aboutImageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  };
};
