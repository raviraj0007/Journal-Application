URL - https://journalentry-1.netlify.app

# Journal Frontend

A modern, fully responsive journal web application built with React, Bootstrap, and Tailwind CSS. Users can sign up, log in, and manage their journal entries with a beautiful, mobile-first design that works seamlessly across all devices.

## ✨ Features

### 🔐 Authentication & User Management
- **Secure user authentication** (login/signup)
- **Form validation** and error handling
- **Remember me** functionality
- **Password confirmation** on signup

### 📝 Journal Management
- **Create, edit, and delete** journal entries
- **Sentiment tracking** with emoji selection (Happy, Sad, Angry, Anxious)
- **Real-time updates** and data persistence
- **Rich text content** support

### 🎨 Modern UI/UX
- **Fully responsive design** - works perfectly on desktop, tablet, and mobile
- **Mobile-first approach** with touch-friendly interactions
- **Beautiful animations** and smooth transitions
- **Accessibility features** with proper focus states and ARIA labels
- **Dark/light theme** support with Material Design 3 color palette

## 📱 Responsive Design Features

### Mobile Optimization
- **Collapsible sidebar** with hamburger menu on mobile
- **Touch-friendly buttons** (44px minimum touch targets)
- **Responsive emoji selector** with appropriate sizing
- **Mobile overlay navigation** with smooth animations
- **iOS zoom prevention** on form inputs

### Desktop Experience
- **Fixed sidebar navigation** with hover effects
- **Larger interaction areas** for mouse users
- **Enhanced visual hierarchy** with proper spacing
- **Keyboard navigation** support

### Cross-Device Compatibility
- **Progressive Web App** ready
- **Custom scrollbars** for better UX
- **Flexible layouts** that adapt to any screen size
- **Optimized typography** with responsive font sizes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/raviraj0007/journal-frontend
   cd journal-frontend
   ```


## 🏗️ Project Structure
```
src/
├── pages/           # Main pages (Login, Signup, Journal List)
├── components/      # Reusable UI components
├── contexts/        # React context for user state
├── api/            # API calls and authentication helpers
├── styles/         # Custom CSS and responsive utilities
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── assets/         # Images, icons, and static files
```

## 🎯 Key Components

### Pages
- **LoginPage**: Centered logo, responsive form, mobile-optimized inputs
- **SignUpPage**: Multi-step form with validation, consistent branding
- **JournalList**: Collapsible sidebar, emoji sentiment selector, responsive cards

### Components
- **JournalFormModal**: Responsive form with sentiment selection
- **JournalCard**: Flexible card layout with truncation utilities

## 🔧 Technical Stack

### Frontend Framework
- **React 19** with modern hooks and context API
- **React Router** for client-side navigation
- **Lucide React** for beautiful icons

### Styling
- **Tailwind CSS** for utility-first styling
- **Bootstrap 5** for responsive components
- **Custom CSS** for advanced responsive features

### Development Tools
- **PostCSS** for CSS processing
- **Autoprefixer** for cross-browser compatibility
- **ESLint** for code quality

## 📡 API Integration
This frontend expects a backend REST API (see `src/api/journalApi.js` for endpoints). Update the `baseURL` in `journalApi.js` if your backend URL changes.

### API Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `GET /api/journals` - Fetch user journals
- `POST /api/journals` - Create new journal
- `PUT /api/journals/:id` - Update journal
- `DELETE /api/journals/:id` - Delete journal

## 🎨 Customization

### Styling
- Update styles in `src/App.css` or use Tailwind/Bootstrap classes
- Modify color scheme in `tailwind.config.js`
- Add custom responsive utilities in `src/App.css`

### Branding
- Change the logo in `src/pages/LoginPage.jsx` and `src/pages/SignUpPage.jsx`
- Update theme colors in CSS variables
- Modify app title in `public/index.html`

### Responsive Breakpoints
- **Mobile**: `< 768px` (default)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

## 🔍 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Features
- **PWA Ready**: Can be installed as a mobile app
- **Touch Optimized**: All interactions designed for touch
- **Offline Capable**: Service worker ready
- **Fast Loading**: Optimized bundle size and lazy loading

## 🚀 Performance Optimizations
- **Code splitting** with React.lazy()
- **Image optimization** with responsive images
- **CSS optimization** with PurgeCSS
- **Bundle analysis** with webpack-bundle-analyzer

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices and screen sizes
5. Submit a pull request

## 📄 License
MIT License - see LICENSE file for details

---

**Built with ❤️ using React, Tailwind CSS, and Bootstrap**
