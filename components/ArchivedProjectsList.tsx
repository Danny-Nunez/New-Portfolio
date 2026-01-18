import React from 'react';

interface Project {
  title: string;
  category: string;
  year: string;
  image?: string;
  modalImage?: string;
  stack?: string[];
  description?: string;
  screenshots?: string[];
  webScreenshots?: string[];
  mobileScreenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
}

// Separate archived projects data - edit this list as needed
const archivedProjects: Project[] = [
  {
    title: "STREET RUN",
    category: "Three.js Game",
    year: "2024",
    githubUrl: "https://github.com/Danny-Nunez/streetrungame",
    liveUrl: "https://streetrungame.vercel.app/",
  },
  {
    title: "THOMAS JEFFERSON CHATBOT",
    category: "NEXTJS, LANGCHAIN, OPENAI",
    year: "2024",
    githubUrl: "https://github.com/Danny-Nunez/chatbotai",
    liveUrl: "https://chatbotai-three.vercel.app/",
  },
  {
    title: "CRYPTO STATS APP",
    category: "REACT NATIVE",
    year: "2022",
    githubUrl: "https://github.com/Danny-Nunez/React-Crypto-Stats-Api",
    liveUrl: "https://react-crypto-stats-api.vercel.app/",
  },
  
  // Add more archived projects here
  // {
  //   title: "PROJECT NAME",
  //   category: "CATEGORY",
  //   year: "YEAR",
  //   githubUrl: "https://github.com/username/repo",
  //   liveUrl: "https://livesite.com",
  // },
];

interface ArchivedProjectsListProps {
  onClose: () => void;
}

const ArchivedProjectsList: React.FC<ArchivedProjectsListProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-white/10 rounded-3xl overflow-y-auto shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 rounded-full text-white/60 hover:text-red-600 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 md:p-12 border-b border-white/10">
          <h3 className="text-3xl md:text-4xl font-inter-black text-white tracking-tighter uppercase" style={{ wordSpacing: '0.2em' }}>
            Archived Projects
          </h3>
          <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mt-2">Complete Project Archive</p>
        </div>

        {/* Projects List */}
        <div className="p-8 md:p-12 space-y-1">
          {archivedProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em]">No archived projects yet</p>
            </div>
          ) : (
            archivedProjects.map((project) => (
              <div
                key={project.title}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 p-6 rounded-xl border border-white/5 hover:border-red-600/50 bg-white/0 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] transform origin-left overflow-hidden"
              >
                {/* Year Badge - Top Left Corner (Angled Ribbon) */}
                <div className="absolute top-11 left-[-24px] z-10 transform -rotate-45 origin-top-left overflow-hidden">
                  <div className="relative">
                    <div className="bg-red-600 px-8 py-0 shadow-xl">
                      <span className="text-white font-playfair italic text-sm font-semibold">{project.year}</span>
                    </div>
                    <div className="absolute top-full left-0 w-0 h-0 border-l-[12px] border-l-transparent border-t-[10px] border-t-red-800"></div>
                  </div>
                </div>

                {/* Title - Left (Not clickable) */}
                <div className="flex-1 text-left pl-4">
                  <h4 className="text-white/80 group-hover:text-white text-lg md:text-xl font-black uppercase tracking-tighter transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold mt-1">
                    {project.category}
                  </p>
                </div>
                
                {/* Buttons - Right */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-600/50 text-white/60 hover:text-red-600 text-xs uppercase tracking-[0.3em] font-black rounded-full transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 hover:border-red-600/50 text-red-600 text-xs uppercase tracking-[0.3em] font-black rounded-full transition-all duration-300 hover:scale-105"
                    >
                      <span>Live</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivedProjectsList;

