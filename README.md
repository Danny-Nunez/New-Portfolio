# Danny Nunez - Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features include an AI-powered chat assistant, dynamic portfolio showcase, and contact form integration.

## 🚀 Features

- **Hero Section**: Interactive 3D image carousel with staggered fade-in animations
- **AI Chat Assistant**: OpenAI-powered chat interface that answers questions about Danny's background and experience
- **About Section**: Showcase of credentials with links to certificates from Harvard, MIT, Meta, Google, and UC Davis
- **Portfolio**: Interactive portfolio grid with detailed modals showing:
  - Project images, descriptions, and technologies used
  - Web and mobile screenshots
  - Links to GitHub repos, live sites, and app stores
  - Year ribbon badges
- **Contact Form**: Integrated with MailerSend API for reliable email delivery
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Smooth Animations**: Staggered fade-in animations on page load

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-4)
- **Email Service**: MailerSend API
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd design-engineer-hero
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   MAILERSEND_KEY=your_mailersend_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here (optional)
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
design-engineer-hero/
├── components/          # React components
│   ├── Hero.tsx        # Hero section with 3D carousel
│   ├── About.tsx       # About section with credentials
│   ├── Portfolio.tsx   # Portfolio grid with modals
│   ├── Contact.tsx     # Contact form
│   ├── DannyChat.tsx   # AI chat assistant
│   ├── ImageLoop.tsx   # 3D image carousel
│   └── FloatingSocials.tsx
├── services/           # Service files
│   └── emailService.ts # MailerSend email service
├── vite-plugins/       # Vite plugins
│   └── emailApi.ts     # Email API middleware
├── data/               # Static data files
│   ├── about.json      # Personal information for AI chat
│   └── slideshow/      # Hero section images
├── App.tsx             # Main app component
├── vite.config.ts      # Vite configuration
└── index.html          # HTML entry point
```

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for the chat assistant | Yes |
| `MAILERSEND_KEY` | MailerSend API key for contact form | Yes |
| `GEMINI_API_KEY` | Google Gemini API key (optional) | No |

## 🎨 Key Features Explained

### AI Chat Assistant
- Powered by OpenAI GPT-4
- Personalized responses based on Danny's background data
- Context-aware conversations about experience, skills, and projects
- Custom system prompt for natural, concise responses

### Portfolio Modals
- Click any portfolio item to view detailed information
- Features project images, descriptions, tech stack
- Separate sections for web and mobile screenshots
- Direct links to GitHub, live sites, and app stores
- Animated year badge ribbons

### Contact Form
- Serverless email handling via Vite middleware
- Uses MailerSend API for reliable delivery
- Sends to: dnunez22@gmail.com
- Includes form validation and error handling

### 3D Image Carousel
- Interactive 3D perspective carousel in hero section
- Responsive spacing adjustments for different screen sizes
- Smooth animations and transitions

## 🚢 Build for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

The built files will be in the `dist/` directory, ready for deployment.

## 🚀 Deploy to Vercel

This project is configured for Vercel deployment:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Import your repository in [Vercel Dashboard](https://vercel.com)
   - Vercel will auto-detect Vite configuration

3. **Set Environment Variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add the following:
     - `OPENAI_API_KEY` - Your OpenAI API key
     - `MAILERSEND_KEY` - Your MailerSend API key
     - `GEMINI_API_KEY` - Your Gemini API key (optional)

4. **Deploy via CLI** (alternative):
   ```bash
   vercel
   ```

**Important Notes for Vercel:**
- The email API endpoint (`/api/send-email`) runs as a Vercel serverless function
- In development, it uses Vite middleware (same port)
- In production on Vercel, it uses the serverless function in `/api/send-email.ts`
- Make sure all environment variables are set in Vercel dashboard

## 📝 Notes

- The email API runs as serverless middleware within the Vite dev server (same port)
- All API keys should be kept secure and never committed to version control
- The `.env.local` file is already in `.gitignore`

## 👤 Author

**Danny Nunez**
- Email: dnunez22@gmail.com
- Portfolio: [dannyfullstack.dev](https://dannynunez.dev)
- LinkedIn: [Danny Nunez](https://www.linkedin.com/in/danny-nunez-a7886b209)
- GitHub: [Danny-Nunez](https://github.com/Danny-Nunez)

## 📄 License

This project is private and proprietary.
# New-Portfolio
