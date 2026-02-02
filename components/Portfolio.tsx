
import React, { useState, useEffect } from 'react';
import ArchivedProjectsList from './ArchivedProjectsList';

interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
  modalImage?: string; // Optional separate image for modal
  stack: string[];
  description?: string;
  screenshots?: string[]; // Deprecated - use webScreenshots and mobileScreenshots
  webScreenshots?: string[]; // Web screenshots
  mobileScreenshots?: string[]; // Mobile screenshots
  githubUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string; // Optional Apple App Store link
  googlePlayUrl?: string; // Optional Google Play Store link
}

const allProjects: Project[] = [
  {
    title: "TRADIANTIX",
    category: "AI STOCK TRADING PLATFORM",
    year: "2025",
    image: "/data/tradiantixfullweb.jpg",
    modalImage: "/data/tradiantixwide.png",
    stack: ["NODE.JS", "VITEJS", "TAILWIND CSS", "MYSQL"],
    description: "Tradiantix is an AI-driven stock trading application built with Next.js, MySQL, and real-time market data from Polygon.io. The platform was engineered for low-latency trade execution, enabling instant buy and sell actions for favorited stocks. I designed and built a custom physical trading dongle that triggers trades directly from the app—developed end-to-end and currently in patent-pending (provisional) status. The platform also leverages AI to analyze live market news, surface high-potential stocks, and automatically generate buy/sell recommendations based on market signals and trend analysis. Result: A fast, extensible trading system combining real-time data, AI-driven insights, and novel hardware interaction.",
    githubUrl: "https://github.com/username/tradiantix",
    liveUrl: "https://tradiantix.com",
    webScreenshots: [
      "/data/tradiantix-web/trade1.png",
      "/data/tradiantix-web/trade2.png",
      "/data/tradiantix-web/trade3.png"
    ]
  },
  {
    title: "NEGOZEE",
    category: "LATIN SOCIAL NETWORKING PLATFORM FOR PROFESSIONALS",
    year: "2025",
    image: "/data/negozeefullweb.jpg",
    modalImage: "/data/negozeewide.png",
    stack: ["PYTHON", "WORDPRESS", "AWS", "PHP"],
    description: "Negozee's WordPress + BuddyBoss platform was crashing under user search and struggling to support its mobile app. I migrated the site from DigitalOcean to Rapyd Cloud, a BuddyBoss-specialized host, then optimized database indexing and restructured username search logic to eliminate crashes and drastically improve load times. With the web platform stabilized, I built custom API endpoints and rebuilt the mobile app using Expo, enabling a single codebase for iOS and Android. Result: Faster site performance, stable search, and scalable mobile infrastructure—helping Negozee grow from 10,000 to 40,000 users.",
    githubUrl: "https://github.com/Danny-Nunez/Negozee-App",
    liveUrl: "https://negozee.com",
    appStoreUrl: "https://apps.apple.com/app/negozee",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.negozee",
    webScreenshots: [
      "/data/negozee-web-app/web1.png",
      "/data/negozee-web-app/web2.png",
      "/data/negozee-web-app/web3.png"
    ],
    mobileScreenshots: [
      "/data/negozee-mobile-app/app1.webp",
      "/data/negozee-mobile-app/app2.webp",
      "/data/negozee-mobile-app/app3.webp",
      "/data/negozee-mobile-app/app4.webp",
      "/data/negozee-mobile-app/app5.webp",
      "/data/negozee-mobile-app/app6.webp"
    ]
  },
  {
    title: "BEATINBOX",
    category: "FREE MUSIC STREAMING PLATFORM",
    year: "2025",
    image: "/data/beatinboxfullweb.jpg",
    modalImage: "/data/beatinbox-web/beatinbox-wide.png",
    stack: ["NODE.JS", "EXPRESS", "NEXTJS", "POSTGRES"],
    description: "Beatinbox started as a personal frustration: coding while streaming music on YouTube meant constant interruptions from ads. I built Beatinbox to solve that problem—an uninterrupted, developer-friendly music experience. The backend was built with Express, paired with a Next.js frontend. The mobile app was developed in TypeScript using Expo, allowing a single codebase across iOS and Android. For data management, I used PostgreSQL with Prisma to handle playlists, playlist sharing, and user data with a clean, scalable schema. Result: A full-stack, cross-platform music app built to remove friction from the developer workflow and keep focus uninterrupted.",
    githubUrl: "https://github.com/Danny-Nunez/Music",
    liveUrl: "https://beatinbox.com",
    webScreenshots: [
      "/data/beatinbox-web/beatinbox-web1.png",
      "/data/beatinbox-web/beatinbox-web2.png",
      "/data/beatinbox-web/beatinbox-web3.png"
    ],
    mobileScreenshots: [
      "/data/beatinbox-mobile-app/app1.png",
      "/data/beatinbox-mobile-app/app2.png",
      "/data/beatinbox-mobile-app/app3.png",
      "/data/beatinbox-mobile-app/app4.png",
      "/data/beatinbox-mobile-app/app5.png",
      "/data/beatinbox-mobile-app/app6.png"
    ]
  },
  {
    title: "BILL OF RIGHTS INSTITUTE",
    category: "CIVIC EDUCATION WEBSITE",
    year: "2025",
    image: "/data/briwebfull.jpg",
    modalImage: "/data/bri-web/bri-web1.png",
    stack: ["NEXTJS", "NODEJS", "WORDPRESS", "AWS", "PHP", "MYSQL", "PYTHON", "JAVASCRIPT", "FASTAPI"],
    description: "I’m deeply passionate about my work with the Bill of Rights Institute. Its mission—to support educators and empower students to become civically engaged citizens—felt especially important in a time of global uncertainty. Understanding where we come from is essential to knowing where we’re going. BRI’s decoupled architecture impressed me from the start, as it allowed us to leverage modern, industry-standard tools like Next.js and Amazon Web Services to rapidly integrate and scale new features. When I took over the platform, it had been pieced together by multiple contractors, resulting in inconsistent UX, slow APIs, and underutilized tools. I led efforts to streamline the user experience, implemented improved analytics to track real user interactions, and connected dashboard features to live, meaningful data. I also optimized backend performance—reducing API load times by 75%—which made the educator and student dashboards genuinely usable. The result is a modern civic education platform built with Next.js, FastAPI, WordPress, and AWS, delivering interactive lessons, educator resources, assessments, and multimedia content at scale.",
    githubUrl: "https://github.com/billofrightsinstitute/billofrights-website",
    liveUrl: "https://billofrightsinstitute.org",
    webScreenshots: [
      "/data/bri-web/bri-web1.png",
      "/data/bri-web/bri-web2.png",
      "/data/bri-web/bri-web3.png"
    ]
  },
  {
    title: "CHAIN IMPERIUM",
    category: "BLOCK CHAIN MARKETING COMPANY",
    year: "2024",
    image: "/data/chainfullweb.jpg",
    modalImage: "/data/chain-web/chain-wide.png",
    stack: ["NEXTJS", "NODEJS"],
    description: "A blockchain marketing agency website showcasing services and case studies in the cryptocurrency and blockchain space. Built with Next.js for fast loading times and Node.js for server-side functionality. Features include service portfolios, client testimonials, blog integration, and contact forms for lead generation.",
    githubUrl: "https://github.com/Danny-Nunez/chain-imperium",
    liveUrl: "https://chainimperium.com",
    webScreenshots: [
      "/data/chain-web/chain-web1.png",
      "/data/chain-web/chain-web2.png",
      "/data/chain-web/chain-web3.png"
    ]
  },
  {
    title: "FACILPAY",
    category: "BLOCKCHAIN MOBILE MESSAGING APP",
    year: "2024",
    image: "/data/facilfullweb.jpg",
    modalImage: "/data/facil-web/facil-wide.png",
    stack: ["NEXTJS", "NODEJS"],
    description: "A blockchain-based mobile messaging application with integrated payment functionality. Built with Next.js for cross-platform compatibility and Node.js for real-time messaging infrastructure. Features include end-to-end encryption, cryptocurrency wallet integration, peer-to-peer transactions, and secure group messaging.",
    githubUrl: "https://github.com/Danny-Nunez/Facil",
    liveUrl: "https://facil-pay.vercel.app/services",
    webScreenshots: [
      "/data/facil-web/facil-web1.png",
      "/data/facil-web/facil-web2.png",
      "/data/facil-web/facil-web3.png"
    ]
  }
  // Add more projects here to show in the full archive
  // {
  //   title: "PROJECT NAME",
  //   category: "CATEGORY",
  //   year: "YEAR",
  //   image: "/data/project-image.png",
  //   stack: ["TECH", "STACK"]
  // },
];

const INITIAL_PROJECTS_COUNT = 4;

const Portfolio: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showArchivedProjects, setShowArchivedProjects] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  
  const displayedProjects = isExpanded ? allProjects : allProjects.slice(0, INITIAL_PROJECTS_COUNT);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setShowArchivedProjects(false);
      }
    };
    if (selectedProject || showArchivedProjects) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent body scroll when modal is open
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, showArchivedProjects]);

  // Intersection Observer for fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-card-index') || '0');
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of card is visible
        rootMargin: '0px 0px -50px 0px' // Start slightly before card enters viewport
      }
    );

    const cards = document.querySelectorAll('[data-card-index]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [displayedProjects.length]);
  return (
    <section id="portfolio" className="relative w-full py-32 bg-black px-6 md:px-20 overflow-hidden">
      {/* Decorative Technical Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-grid opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-red-600 font-bold tracking-[0.5em] uppercase text-xs">The Archive</span>
            <h2 
              className="text-5xl md:text-8xl font-inter-black text-white tracking-tighter mt-4 leading-none"
              style={{ wordSpacing: '0.2em' }}
            >
              SELECTED <br /> <span className="text-white/20 italic font-playfair">WORKS.</span>
            </h2>
          </div>
          <div className="text-gray-500 max-w-sm text-sm uppercase tracking-widest leading-relaxed">
            A collection of digital products where technical precision meets aesthetic intent.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {displayedProjects.map((project, idx) => {
            const isVisible = visibleCards.has(idx);
            return (
            <div 
              key={project.title}
              data-card-index={idx}
              onClick={() => setSelectedProject(project)}
              className={`group relative flex flex-col cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''} transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: isVisible ? `${(idx % 2) * 150}ms` : '0ms'
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/5 bg-zinc-900 shadow-2xl">
                {/* Click to view details hint */}
                <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-sm border border-red-600/50 px-6 py-3 rounded-full">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-red-600">Click to view details</span>
                  </div>
                </div>
                {/* The Main Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-[0.5]"
                />
                
                {/* Hover Blueprint Overlay */}
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-grid opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Technical Stack Reveal */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 bg-gradient-to-t from-black via-black/95 to-transparent">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span key={s} className="px-3 py-1 bg-white text-black text-[10px] font-black tracking-widest uppercase rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vertical Scanning Line */}
                <div className="absolute top-0 left-0 w-[2px] h-full bg-red-600 shadow-[0_0_15px_#f22e44] -translate-x-full group-hover:animate-scan-line pointer-events-none opacity-0 group-hover:opacity-100" />
              </div>

              {/* Project Meta */}
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-red-600 transition-colors uppercase">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-[10px] tracking-[0.3em] font-bold uppercase mt-2">
                    {project.category}
                  </p>
                </div>
                <span className="text-white/20 font-playfair italic text-xl">{project.year}</span>
              </div>
              
              {/* Border decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="mt-40 text-center space-y-6">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/30 hover:text-white transition-colors flex flex-col items-center mx-auto group"
          >
            <span className="text-[10px] tracking-[0.6em] font-black uppercase mb-4">
              {isExpanded ? 'Collapse Archive' : 'View Full Archive'}
            </span>
            <div className={`w-px bg-gradient-to-b from-red-600 to-transparent group-hover:h-32 transition-all duration-700 ${isExpanded ? 'h-32' : 'h-20'}`} />
          </button>
          
          {/* View Archived Projects Button - Shows when archive is expanded */}
          {isExpanded && (
            <div className="flex justify-center">
              <button 
                onClick={() => setShowArchivedProjects(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-600/50 text-white/60 hover:text-red-600 text-xs uppercase tracking-[0.3em] font-black rounded-full transition-all duration-300 hover:scale-105 group"
              >
                <span>View Archived Projects</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-7xl max-h-[90vh] bg-black border border-white/10 rounded-3xl overflow-y-auto shadow-2xl flex flex-col animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Year Ribbon - Top Left Corner of Modal (Angled) */}
            <div className="absolute top-[100px] left-[-64px] z-30 transform -rotate-45 origin-top-left overflow-hidden">
              <div className="relative">
                {/* Main ribbon body */}
                <div className="bg-red-600 px-24 py-2 shadow-xl">
                  <span className="text-white font-playfair italic text-xl font-semibold">{selectedProject.year}</span>
                </div>
                {/* Ribbon folded corner (triangle) */}
                <div className="absolute top-full left-0 w-0 h-0 border-l-[25px] border-l-transparent border-t-[20px] border-t-red-800"></div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 rounded-full text-white/60 hover:text-red-600 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Top Section: Image and Details Side by Side */}
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Image */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                <div className="relative w-full flex items-center justify-center">
                  <img 
                    src={selectedProject.modalImage || selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-auto rounded-2xl shadow-2xl border border-white/5 object-contain max-h-[60vh]"
                  />
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <div className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-2">
                    {selectedProject.category}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-inter-black text-white tracking-tighter mb-6 uppercase" style={{ wordSpacing: '0.2em' }}>
                    {selectedProject.title}
                  </h3>
                  
                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.stack.map(s => (
                      <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-[10px] font-black tracking-widest uppercase rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs uppercase tracking-[0.3em] font-black rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub Repo
                      </a>
                    )}
                    {selectedProject.appStoreUrl && (
                      <a
                        href={selectedProject.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/30 text-white text-xs uppercase tracking-[0.3em] font-black rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        App Store
                      </a>
                    )}
                    {selectedProject.googlePlayUrl && (
                      <a
                        href={selectedProject.googlePlayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/30 text-white text-xs uppercase tracking-[0.3em] font-black rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        Google Play
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                {selectedProject.description && (
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold mb-3">About</h4>
                    <p className="text-gray-400 text-md leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                )}
              </div>
              </div>
            </div>

            {/* Screenshots Section - Full Width Below Both Columns */}
            {(selectedProject.webScreenshots && selectedProject.webScreenshots.length > 0) || 
             (selectedProject.mobileScreenshots && selectedProject.mobileScreenshots.length > 0) || 
             (selectedProject.screenshots && selectedProject.screenshots.length > 0) ? (
              <div className="w-full p-8 md:p-12 border-t border-white/10 space-y-8">
                {/* Web Screenshots - Shown First */}
                {selectedProject.webScreenshots && selectedProject.webScreenshots.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold mb-6">Web</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedProject.webScreenshots.map((screenshot, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900">
                          <img 
                            src={screenshot} 
                            alt={`${selectedProject.title} web screenshot ${idx + 1}`}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Screenshots - Shown Second */}
                {selectedProject.mobileScreenshots && selectedProject.mobileScreenshots.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold mb-6">Mobile</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {selectedProject.mobileScreenshots.map((screenshot, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900">
                          <img 
                            src={screenshot} 
                            alt={`${selectedProject.title} mobile screenshot ${idx + 1}`}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legacy Screenshots Support (for backward compatibility) */}
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && 
                 !selectedProject.webScreenshots && !selectedProject.mobileScreenshots && (
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold mb-6">Screenshots</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {selectedProject.screenshots.map((screenshot, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-white/5 bg-zinc-900">
                          <img 
                            src={screenshot} 
                            alt={`${selectedProject.title} screenshot ${idx + 1}`}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Archived Projects Modal */}
      {showArchivedProjects && (
        <ArchivedProjectsList
          onClose={() => setShowArchivedProjects(false)}
        />
      )}

      <style>{`
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(50000%); }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
