
import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import aboutData from '../data/about.json';

// Build system message with few-shot examples
const buildSystemMessage = (): string => {
  const { name, experience, technicalStack, certifications, currentRole, location, workExperience } = aboutData;
  
  const locationInfo = location ? ` Based in ${location}.` : '';
  const roleInfo = currentRole ? ` Currently ${currentRole}.` : '';
  
  // Build work experience summary
  let workSummary = '';
  if (workExperience && workExperience.length > 0) {
    const currentJob = workExperience[0];
    const recentJobs = workExperience.slice(0, 3).map(job => `${job.role} at ${job.company} (${job.period})`).join(', ');
    workSummary = `\n\nWork Experience:\n- Current: ${currentJob.role} at ${currentJob.company} (${currentJob.period})\n- Recent roles: ${recentJobs}`;
  }
  
  // Build certifications summary
  let certSummary = '';
  if (certifications && certifications.length > 0) {
    const certNames = certifications.map(cert => typeof cert === 'string' ? cert : cert.name).join(', ');
    certSummary = ` Certified in: ${certNames}`;
  }
  
  return `You are ${name}, a Design Engineer & Fullstack Developer with ${experience} years of experience.${roleInfo}${locationInfo} You work with ${technicalStack.slice(0, 5).join(', ')}, and more.${certSummary}${workSummary}

Examples of how to respond:
- "hi" -> "Hey!"
- "what's your background?" -> "I'm a Design Engineer with ${experience} years of experience building high-performance web apps. I work with React, TypeScript, Node.js, and the full MERN stack.${roleInfo}"
- "where do you work?" or "where do you currently work?" -> "${currentRole || 'I work as a freelance Design Engineer and Fullstack Developer, taking on projects that leverage my skills.'}"
- "what's your work experience?" or "tell me about your work" -> Briefly mention your current role and 1-2 recent positions with key highlights.
- "what certifications do you have?" -> List your main certifications: Full Stack Development with MERN (MIT xPRO), UX Design (Google), SEO Fundamentals, Programming with Javascript (Meta), CS50, and AWS.
- "how do you design a page?" -> "I start with Figma for the design, then bring it to life with React and TypeScript. I focus on both aesthetics and performance - every pixel matters."

Keep responses short and conversational. Answer what's asked directly.`;
};

const SYSTEM_MESSAGE = buildSystemMessage();

const DannyChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openaiRef = useRef<OpenAI | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getOpenAI = (): OpenAI => {
    if (!openaiRef.current) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not set');
      }
      openaiRef.current = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    }
    return openaiRef.current;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setIsTyping(true);

    const userMessage = { role: 'user' as const, content: userMsg };

    // Build conversation history for API call (use current messages state)
    const allMessages = [...messages, userMessage];
    
    // Add user message to state
    setMessages(allMessages);

    try {
      const openai = getOpenAI();
      
      // Format messages for OpenAI API with system message at the start
      const apiMessages: Array<{role: 'system' | 'user' | 'assistant', content: string}> = [
        { role: 'system', content: SYSTEM_MESSAGE },
        ...allMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];
      
      console.log('Sending to OpenAI:', apiMessages);
      console.log('Number of messages:', apiMessages.length);

      // Make API call outside of setState
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 150,
      });

      const text = response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again!";
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Technical error. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-md h-[550px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl shadow-black relative group z-[250]">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
        <div className="flex items-center space-x-3">
          <img src="/me2.png" alt="Danny" className="w-12 h-12 rounded-full object-cover border border-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/70">Ask Danny</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-white/10" />
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-red-600 text-white rounded-tr-none' 
                : 'bg-white/10 text-white/90 border border-white/5 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-5 py-3 rounded-2xl rounded-tl-none flex space-x-1 items-center">
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/5">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about my process..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 pr-14 text-sm text-white focus:outline-none focus:border-red-600/50 transition-colors placeholder:text-white/20"
          />
          <button 
            type="button"
            onClick={handleSend}
            className="absolute right-2 w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50 cursor-pointer z-10"
            disabled={isTyping}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Visual Glitch Decor */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-red-600/0 group-hover:border-red-600/10 transition-colors rounded-[3rem]" />
    </div>
  );
};

export default DannyChat;
