import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChatbot from './components/FloatingChatbot';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Motivation from './pages/Motivation';
import About from './pages/footerpages/About';
import Privacy from './pages/footerpages/Privacy';
import Terms from './pages/footerpages/Terms';
import Contact from './pages/footerpages/Contact';
import Support from './pages/footerpages/Support';
import Help from './pages/footerpages/Help';
import Crisis from './pages/footerpages/Crisis';
import Guidelines from './pages/footerpages/Guidelines';
import Feedback from './pages/footerpages/Feedback';
import Resources from './pages/footerpages/Resources';
import Legal from './pages/footerpages/Legal';

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/motivation" element={<Motivation />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/help" element={<Help />} />
            <Route path="/crisis" element={<Crisis />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/support/find" element={<Doctors />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <FloatingChatbot />
      </div>
    </Router>
  );
}

export default App;