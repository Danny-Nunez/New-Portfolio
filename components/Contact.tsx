
import React, { useState, useEffect, useRef } from 'react';
import { sendEmail } from '../services/emailService';
import Globe from './Globe';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show globe when section is in view, hide when it's out (scroll up or down)
          setIsGlobeVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.95, // Trigger when 10% of the section is visible
        rootMargin: '0px', // No margin to ensure accurate detection when leaving viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMessage('');
    
    try {
      await sendEmail(formData.name, formData.email, formData.message);
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormState('error');
      setErrorMessage('Failed to send message. Please try again or email directly at admin@dannyfullstack.dev');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-12 bg-[#050505] px-6 md:px-20 overflow-hidden">
      {/* Technical Background Decor */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Side: Text & Info */}
          <div className="space-y-12">
            <div>
              <span className="text-red-600 font-bold tracking-[0.5em] uppercase text-xs">Communication Protocol</span>
              <h2 
                className="text-5xl md:text-8xl font-inter-black text-white tracking-tighter mt-4 leading-none uppercase"
                style={{ wordSpacing: '0.2em' }}
              >
                Initialize <br /> <span className="text-white/20 italic font-playfair">Contact.</span>
              </h2>
            </div>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md">
            Have an idea you want to build?
            I’m usually down to help.
            </p>

            <div className="relative space-y-8">
              {/* Globe Background - Hidden initially, animates in from bottom on scroll */}
              <div 
                className={`absolute -left-20 -top-10 w-[500px] h-[500px] md:w-[600px] md:h-[600px] pointer-events-none z-0 transition-all duration-1000 ease-out ${
                  isGlobeVisible 
                    ? 'opacity-20 translate-y-0' 
                    : 'opacity-0 translate-y-32'
                }`}
              >
                <Globe className="w-full h-full" />
              </div>
              
              {/* Email and Location - positioned above globe */}
              <div className="group flex items-center space-x-6 cursor-pointer relative z-10">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all duration-500">
                  <svg className="w-5 h-5 text-white/40 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Email Interface</div>
                  <div className="text-white font-medium group-hover:text-red-500 transition-colors">admin@dannyfullstack.dev</div>
                </div>
              </div>

              <div className="group flex items-center space-x-6 cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all duration-500">
                  <svg className="w-5 h-5 text-white/40 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Location</div>
                  <div className="text-white font-medium group-hover:text-red-500 transition-colors">Baltimore, Maryland</div>
                </div>
              </div>
            </div>

            {/* Social Matrix */}
            <div className="flex space-x-4 pt-4">
              {[
                {
                  name: 'LinkedIn',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )
                },
                {
                  name: 'Github',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )
                },
                {
                  name: 'Twitter',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )
                }
              ].map((social) => (
                <button 
                  key={social.name} 
                  className="text-white/20 hover:text-red-600 text-[10px] uppercase tracking-[0.4em] font-black transition-all border border-white/5 hover:border-red-600 px-4 py-2 rounded-full flex items-center gap-2"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Command Form */}
          <div className="relative">
            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
              
              {/* Form Status Bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] border border-white/5 px-6 py-2 rounded-full flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${formState === 'sending' ? 'bg-amber-500 animate-pulse' : formState === 'success' ? 'bg-green-500' : formState === 'error' ? 'bg-red-600' : 'bg-red-600'}`} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/60">
                  {formState === 'idle' ? 'System Ready' : formState === 'sending' ? 'Transmitting...' : formState === 'success' ? 'Package Received' : 'Transmission Failed'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black ml-4">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="IDENTIFY YOURSELF"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black ml-4">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="REPLY GATEWAY"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black ml-4">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="BRIEFING DETAILS"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-white/10 resize-none"
                  />
                </div>

                {errorMessage && formState === 'error' && (
                  <div className="bg-red-600/10 border border-red-600/50 rounded-2xl p-4 text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}

                <button 
                  disabled={formState !== 'idle'}
                  className="w-full group relative flex items-center justify-center bg-red-600 hover:bg-white text-white hover:text-black py-5 rounded-2xl transition-all duration-500 font-black uppercase tracking-[0.4em] text-xs overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {formState === 'idle' ? 'Send Briefing' : formState === 'sending' ? 'Encrypting...' : formState === 'success' ? 'Message Sent' : 'Retry'}
                  </span>
                  
                  {/* Hover effect laser line */}
                  <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
              </form>

              {/* Success Overlay */}
              {formState === 'success' && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center z-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-inter-black text-white uppercase tracking-tighter mb-2">Transmission Secure</h4>
                  <p className="text-gray-400 text-sm">Your data packet has been successfully queued for review. Expect a response within 24 standard cycles.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-8 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors"
                  >
                    Send Another Packet
                  </button>
                </div>
              )}
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-red-600 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-red-600 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
