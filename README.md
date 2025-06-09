A comprehensive mental health support platform built with React, TypeScript, and Tailwind CSS. MindCare provides a safe, confidential space for users to connect with mental health professionals, access resources, and find support.

## 🌟 Features

### Core Functionality
- **Professional Support Network**: Connect with licensed therapists, counselors, and trained volunteers
- **Secure Chat System**: End-to-end encrypted messaging with mental health professionals
- **Appointment Scheduling**: Book and manage appointments with integrated payment system
- **Crisis Resources**: 24/7 access to emergency mental health resources
- **Daily Motivation**: Personalized motivational content based on mood tracking

### User Experience
- **User Authentication**: Secure login/signup system with profile management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Calming dark interface with gradient accents
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Accessibility**: WCAG compliant design with proper contrast ratios

### Advanced Features
- **AI-Powered Chatbot**: Intelligent floating assistant for navigation and support
- **Mood Tracking**: Personalized motivation based on current emotional state
- **Payment Integration**: Simulated payment system for appointment booking
- **Resource Library**: Comprehensive mental health resources and educational materials
- **Community Guidelines**: Safe space policies and reporting mechanisms

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindcare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
mindcare/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppointmentModal.tsx
│   │   ├── AuthModal.tsx
│   │   ├── ChatBox.tsx
│   │   ├── DoctorCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── FloatingChatbot.tsx
│   │   ├── Footer.tsx
│   │   ├── LocalResourcesModal.tsx
│   │   ├── MentalHealthInfoModal.tsx
│   │   ├── MoodSelector.tsx
│   │   ├── MotivationCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── ProtectedAction.tsx
│   │   └── UserProfile.tsx
│   ├── pages/               # Main application pages
│   │   ├── footerpages/     # Footer-linked pages
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Crisis.tsx
│   │   │   ├── Feedback.tsx
│   │   │   ├── Guidelines.tsx
│   │   │   ├── Help.tsx
│   │   │   ├── Legal.tsx
│   │   │   ├── Privacy.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Support.tsx
│   │   │   └── Terms.tsx
│   │   ├── Chat.tsx         # Chat interface
│   │   ├── Doctors.tsx      # Professional directory
│   │   ├── Home.tsx         # Landing page
│   │   ├── Motivation.tsx   # Daily motivation
│   │   └── Profile.tsx      # Professional profiles
│   ├── utils/
│   │   └── auth.ts          # Authentication utilities
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **Lucide React** - Beautiful, customizable icons

### Routing & Navigation
- **React Router DOM** - Client-side routing with smooth page transitions

### State Management
- **LocalStorage** - Client-side data persistence
- **React Hooks** - Built-in state management (useState, useEffect)

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#14b8a6) to Indigo (#6366f1) gradients
- **Secondary**: Pink (#ec4899) to Purple (#8b5cf6) gradients
- **Accent**: Various gradient combinations for visual hierarchy
- **Background**: Dark theme with gray-900 base

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable text with proper contrast
- **Interactive**: Hover states and micro-interactions

### Components
- **Cards**: Glass-morphism effect with backdrop blur
- **Buttons**: Gradient backgrounds with hover animations
- **Modals**: Smooth scale and fade transitions
- **Forms**: Consistent styling with focus states

## 🔐 Authentication System

### User Management
- **Registration**: Name, email, password with validation
- **Login**: Email/password authentication
- **Profile**: Customizable user profiles with picture upload
- **Session**: Persistent login state with localStorage

### Protected Features
- Appointment scheduling
- Chat messaging
- Resource access
- Community features

## 💬 Chat System

### Features
- **Doctor-specific chats**: Isolated conversations per professional
- **Real-time messaging**: Simulated real-time chat experience
- **Message history**: Persistent chat storage
- **AI responses**: Contextual automated responses

### Chat Types
- **Professional Chat**: Direct messaging with therapists
- **AI Chatbot**: Floating assistant for navigation and support
- **Crisis Support**: Emergency chat protocols

## 📅 Appointment System

### Booking Process
1. **Select Professional**: Browse and choose from available therapists
2. **Payment**: Secure payment processing (simulated)
3. **Schedule**: Date and time selection with availability checking
4. **Confirmation**: Appointment confirmation and reminders

### Features
- **Real-time availability**: Time slots based on current time
- **Payment integration**: Fee structure per professional
- **Appointment management**: View, modify, or cancel bookings

## 🆘 Crisis Support

### Emergency Resources
- **24/7 Hotlines**: Direct links to crisis support numbers
- **Local Resources**: Mental health centers and hospitals
- **Safety Planning**: Crisis intervention tools
- **Immediate Help**: Quick access to emergency services

### Crisis Features
- **988 Crisis Lifeline**: Direct calling integration
- **Text Support**: Crisis text line access
- **Local Services**: Geographically relevant resources

## 📚 Resources & Education

### Content Types
- **Educational Materials**: Mental health guides and articles
- **Video Resources**: Guided sessions and tutorials
- **Downloadable Tools**: Worksheets and self-help materials
- **External Links**: Trusted mental health organizations

### Topics Covered
- Anxiety and depression management
- Stress reduction techniques
- Mindfulness and meditation
- Crisis intervention
- Self-care strategies

## 🤖 AI Chatbot

### Capabilities
- **Navigation assistance**: Help users find features
- **Basic support**: Answer common questions
- **Appointment booking**: Guide through scheduling process
- **Resource recommendations**: Suggest relevant content
- **Crisis detection**: Recognize emergency situations

### Interaction Types
- **Quick actions**: Pre-defined helpful actions
- **Natural language**: Contextual response system
- **Navigation commands**: Direct page routing
- **Support escalation**: Connect to human professionals

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Features
- **Mobile-first**: Optimized for mobile experience
- **Touch-friendly**: Appropriate touch targets
- **Adaptive layouts**: Content reflows for different screens
- **Performance**: Optimized images and animations

## images of website
### Home page
![image](https://github.com/user-attachments/assets/9af19529-825f-4618-9181-c495a9550f0a)
### Support
![image](https://github.com/user-attachments/assets/e3129b14-a441-45b4-9592-a5725d1e796a)
### Motivation
![image](https://github.com/user-attachments/assets/fea220c9-a91e-4633-9a08-98712acbd878)
### Crisis Help
![image](https://github.com/user-attachments/assets/3daa87b8-e858-4d9f-a9c0-d69332950ef9)
### Chatbot
![image](https://github.com/user-attachments/assets/5c5136d9-baad-4244-9664-cca01e68e375)
### Profile
![image](https://github.com/user-attachments/assets/2018a11e-3582-422f-9cfd-f5b5309d8676)

## 🔒 Privacy & Security

### Data Protection
- **HIPAA Compliance**: Healthcare data protection standards
- **Encryption**: End-to-end encrypted communications
- **Privacy Controls**: User data management options
- **Secure Storage**: Protected local data storage

### User Rights
- **Data access**: View personal information
- **Data correction**: Update inaccurate information
- **Data deletion**: Remove account and data
- **Privacy settings**: Control information sharing

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript**: Type safety and better IDE support
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (configured in ESLint)

### Development Guidelines
- **Component Structure**: Modular, reusable components
- **File Organization**: Clear separation of concerns
- **Naming Conventions**: Descriptive, consistent naming
- **Performance**: Optimized rendering and animations

## 🚀 Deployment

### Build Process
1. **Install dependencies**: `npm install`
2. **Build application**: `npm run build`
3. **Deploy dist folder**: Upload to hosting service

### Hosting Options
- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **GitHub Pages**: Free hosting for static sites
- **Traditional hosting**: Any static file hosting service

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Guidelines
- Follow existing code style
- Add TypeScript types for new features
- Test on multiple devices/browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and inline comments
- **Issues**: Report bugs via GitHub issues
- **Community**: Join our community discussions
- **Professional Support**: Contact our support team

### Emergency Resources
- **Crisis Lifeline**: 988
- **Emergency Services**: 911
- **Crisis Text Line**: Text HOME to 741741

## 🙏 Acknowledgments

- **Mental Health Professionals**: For guidance on best practices
- **Open Source Community**: For the amazing tools and libraries
- **Users**: For feedback and support in creating a safe space
- **Contributors**: Everyone who helps improve MindCare

---

**Remember**: If you're experiencing a mental health crisis, please reach out for immediate help. Your life matters, and support is available 24/7.

**MindCare Team** - Building bridges to better mental health 💙
