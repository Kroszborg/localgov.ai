# LocalGov.AI

> 🏛️ **AI-Powered Local Government Law Interpreter** - Understanding local laws in plain English, built with [Bolt.new](https://bolt.new/)

**🚀 [Live Demo](https://localgov.kroszborg.co/)** | **⚡ [Built with Bolt.new](https://bolt.new/~/sb1-qhracknh)**

[![Built with Bolt.new](https://img.shields.io/badge/Built%20with-Bolt.new-blue?style=flat&logo=bolt)](https://bolt.new/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=flat&logo=vercel)](https://localgov.kroszborg.co/)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Overview

LocalGov.AI is an innovative AI-powered platform that democratizes access to local government information by translating complex legal language into clear, understandable explanations. Citizens can ask questions about local laws, ordinances, and policies in natural language and receive instant, accurate responses.

**🌐 Try it now:** [localgov.kroszborg.co](https://localgov.kroszborg.co/)

**🎯 Problem Solved:** Local government laws and regulations are often written in complex legal jargon that's difficult for average citizens to understand. LocalGov.AI bridges this gap by providing clear, AI-powered explanations of local policies.

---

## 🚀 Built with Bolt.new

This project was developed using [Bolt.new](https://bolt.new/~/sb1-qhracknh), showcasing the platform's capabilities for rapid full-stack development. All core functionality runs within the Bolt environment, demonstrating modern web development practices and AI integration.

**🔗 Bolt.new Project:** [https://bolt.new/~/sb1-qhracknh](https://bolt.new/~/sb1-qhracknh)

### 🏆 Bolt.new Hackathon Compliance

- ✅ **Primary Development Platform:** Built entirely with Bolt.new
- ✅ **Bolt.new Project URL:** [https://bolt.new/~/sb1-qhracknh](https://bolt.new/~/sb1-qhracknh)
- ✅ **Bolt.new Badge:** Prominently displayed on homepage with proper linking
- ✅ **Full-Stack Implementation:** Complete Next.js application with authentication
- ✅ **Production Ready:** Deployed and publicly accessible at [localgov.kroszborg.co](https://localgov.kroszborg.co/)
- ✅ **Live Demo:** Fully functional application ready for testing

---

## ✨ Key Features

### ⚡ **Version 2.0 - New Features**
- **Streaming Responses:** Real-time AI responses that appear character-by-character
- **Smart Caching:** 95% faster repeated queries with intelligent 1-hour cache
- **Toast Notifications:** Clear feedback for all user actions
- **Keyboard Shortcuts:** Quick access with Cmd/Ctrl + K
- **Loading Skeletons:** Professional skeleton screens instead of spinners
- **Custom 404 Page:** Helpful error page with navigation options
- **Markdown Rendering:** Beautiful formatted responses with code blocks, lists, and headers

### 🔍 **AI-Powered Legal Search**
- Natural language query processing
- Location-specific legal information
- Real-time streaming responses using Google Gemini 2.0 Flash
- Comprehensive legal disclaimers and source citations
- Response caching for instant repeated queries

### 🗺️ **Smart Location Detection**
- Autocomplete for 500+ cities worldwide
- Location-specific ordinance lookup
- Support for international jurisdictions
- Intelligent city/state/country recognition

### 👤 **User Management & Personalization**
- Secure authentication with Supabase
- Personal search history tracking
- Bookmark system for important responses
- Account settings and data management
- Toast notifications for all actions

### 🎨 **Modern User Experience**
- Responsive design with Tailwind CSS
- Dark/light theme support with system detection
- Smooth animations with Framer Motion
- Mobile-first design approach
- Accessibility-compliant interface
- Keyboard shortcuts for power users

### 🔒 **Security & Privacy**
- PKCE-based authentication flow
- Rate limiting on API endpoints
- Secure password requirements
- GDPR-compliant data handling
- Content Security Policy implementation

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** Next.js 14.1.0 with App Router
- **Language:** TypeScript 5.8.3
- **Styling:** Tailwind CSS 3.3.3 with custom design system
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React

### **Backend & Infrastructure**
- **Authentication:** Supabase Auth with PKCE flow
- **Database:** Supabase PostgreSQL
- **AI Integration:** Google Gemini API
- **Deployment:** Vercel with Analytics
- **Middleware:** Custom rate limiting and security

### **Development Tools**
- **Build System:** Next.js with SWC compiler
- **Code Quality:** ESLint + TypeScript strict mode
- **Styling:** PostCSS with Tailwind CSS
- **Package Manager:** npm

---

## 🏗️ Project Structure

```
localgov-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── search/        # AI search endpoint
│   │   ├── delete-account/# Account management
│   │   └── auth/          # Authentication callbacks
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── about/             # About page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   └── settings/          # User settings
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   └── theme-provider.tsx# Theme management
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
│   ├── *_circle_360x360.png # Bolt.new badges
│   └── *.jpeg            # Background images
└── middleware.ts         # Request middleware
```

---

## 🎨 Design System

### **Color Palette**
- **Primary:** Neutral black/white with smart contrast
- **Secondary:** Muted grays for subtle elements
- **Accent:** Primary color for interactive elements
- **Semantic:** Green (success), Red (destructive), Amber (warning)

### **Typography**
- **Font Family:** Satoshi (custom) with Inter fallback
- **Hierarchy:** Clear heading/body text distinction
- **Responsive:** Scales appropriately across devices

### **Components**
- **Cards:** Elevated surfaces for content organization
- **Buttons:** Multiple variants (default, outline, ghost, destructive)
- **Forms:** Accessible inputs with proper validation
- **Navigation:** Responsive header with mobile menu

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Supabase account with project setup
- Google Gemini API key

### **Environment Setup**
Create a `.env.local` file with:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Gemini Configuration
GEMINI_API_KEY=your_gemini_api_key
```

### **Installation & Development**
```bash
# Clone and install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### **Database Setup**
Required Supabase tables:
```sql
-- Search history table
CREATE TABLE search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookmarks table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  query TEXT NOT NULL,
  location TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🎯 User Journey

### **New User Experience**
1. **Landing Page:** Compelling hero with demo interface
2. **Sign Up:** Simple email/password registration
3. **Onboarding:** Immediate access to search functionality
4. **First Search:** Location input + question → AI response
5. **Discovery:** Explore bookmarks, history, and settings

### **Returning User Experience**
1. **Dashboard:** Personal search history and bookmarks
2. **Quick Search:** Streamlined interface with autocomplete
3. **Management:** Easy access to saved content and settings

---

## 🏆 Hackathon Highlights

### **Technical Excellence**
- **Modern Stack:** Latest Next.js with TypeScript and advanced React patterns
- **AI Integration:** Sophisticated Google Gemini implementation with context awareness
- **Database Design:** Efficient Supabase schema with proper relationships
- **Security:** Industry-standard authentication and data protection

### **User Experience**
- **Intuitive Design:** Clean, accessible interface that anyone can use
- **Performance:** Optimized loading, caching, and smooth animations
- **Responsiveness:** Seamless experience across all device sizes
- **Accessibility:** WCAG compliance with proper semantic markup

### **Innovation & Impact**
- **Real-World Problem:** Addresses genuine civic engagement challenges
- **Scalable Solution:** Architecture supports growth to thousands of cities
- **Community Value:** Empowers citizens with legal knowledge access
- **Future Potential:** Foundation for broader civic tech initiatives

---

## 📊 Features in Detail

### **AI Search Engine**
- **Context Awareness:** Understands location-specific legal frameworks
- **Source Attribution:** Provides general source guidance
- **Disclaimer Integration:** Automatic legal disclaimers on responses
- **Query Optimization:** Processes natural language effectively

### **User Account System**
- **Secure Authentication:** Supabase Auth with email verification
- **Data Persistence:** Search history and bookmarks saved
- **Privacy Controls:** Account deletion and data export options
- **Profile Management:** User preferences and settings

### **Search Management**
- **History Tracking:** Automatic search history with timestamps
- **Bookmark System:** Save and organize important responses
- **Quick Access:** Recently searched items for easy reference
- **Data Export:** Copy responses and search again functionality

---

## 🔒 Security & Privacy

### **Data Protection**
- **Encryption:** All data encrypted in transit and at rest
- **Authentication:** Secure JWT-based session management
- **Rate Limiting:** API protection against abuse
- **Content Security:** CSP headers and XSS protection

### **Privacy Compliance**
- **GDPR Ready:** Right to access, rectify, and delete data
- **Transparent Policies:** Clear privacy policy and terms of service
- **Minimal Data:** Only collect essential information
- **User Control:** Account deletion and data portability

---

## 🌐 Deployment & Performance

### **Production Environment**
- **Platform:** Vercel with edge functions
- **Live URL:** [localgov.kroszborg.co](https://localgov.kroszborg.co/)
- **Analytics:** Vercel Analytics for performance monitoring
- **CDN:** Global edge distribution for fast loading
- **Monitoring:** Error tracking and performance metrics

### **Performance Optimizations**
- **Image Optimization:** Next.js automatic image optimization
- **Code Splitting:** Automatic route-based code splitting
- **Caching:** Strategic caching for API responses
- **Bundle Analysis:** Optimized JavaScript bundle sizes

---

## 📝 Legal & Compliance

### **Disclaimers**
- All responses include appropriate legal disclaimers
- Clear messaging that content is for informational purposes only
- Encouragement to verify information with official sources
- Prominent "not legal advice" notices throughout the application

### **Terms & Privacy**
- Comprehensive Terms of Service with user responsibilities
- Detailed Privacy Policy explaining data collection and usage
- GDPR-compliant data handling procedures
- Clear consent mechanisms for data processing

---

## 🚀 Future Roadmap

### **Short Term**
- [ ] Multi-language support for international users
- [ ] Advanced search filters and sorting options
- [ ] Email notifications for bookmarked content updates
- [ ] Integration with more government data sources

### **Long Term**
- [ ] Mobile app development (React Native)
- [ ] Real-time notifications for law changes
- [ ] Community features for shared bookmarks
- [ ] API for third-party integrations
- [ ] Advanced analytics and insights

---

## 🤝 Contributing

This project was built for the Bolt.new hackathon and showcases modern web development practices. While originally developed as a submission, the codebase demonstrates:

- **Clean Architecture:** Well-organized, maintainable code structure
- **Best Practices:** TypeScript, proper error handling, security measures
- **Scalable Design:** Patterns that support growth and feature additions
- **Documentation:** Comprehensive comments and type definitions

---

## 📄 License

This project is developed for the Bolt.new hackathon. All third-party integrations are properly licensed, and the codebase follows open source best practices.

---

## 🙏 Acknowledgments

- **[Bolt.new](https://bolt.new/)** - For providing an exceptional development platform that enabled rapid full-stack development
- **Google** - For Gemini API that powers the intelligent legal explanations
- **Supabase** - For robust authentication and database infrastructure
- **Vercel** - For seamless deployment and performance optimization
- **shadcn/ui** - For beautiful, accessible UI components

---

**Built with ❤️ using [Bolt.new](https://bolt.new/)**

*This project demonstrates the power of modern web development tools in creating meaningful civic technology solutions.*
