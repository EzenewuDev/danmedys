import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { PageOverlay } from '@/components/PageOverlay';
import { BackToTop } from '@/components/BackToTop';
import { BookingModal } from '@/components/BookingModal';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Doctors } from '@/sections/Doctors';
import { Features } from '@/sections/Features';
import { Testimonials } from '@/sections/Testimonials';
import { Blog } from '@/sections/Blog';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { AIDiagnosis } from '@/sections/AIDiagnosis';
import { Dashboard } from '@/pages/Dashboard';
import { Login } from '@/pages/Login';
import { SignUp } from '@/pages/SignUp';
import { usePageLoad } from '@/hooks/usePageLoad';
import { type Doctor } from '@/config';

// Home Page Component
function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const openBooking = (doctor?: Doctor) => {
    setSelectedDoctor(doctor || null);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedDoctor(null);
  };

  const scrollToDoctors = () => {
    const element = document.getElementById('doctors');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <main>
        <Hero onBookClick={scrollToDoctors} />
        <Features />
        <Services />
        <Doctors onBookClick={openBooking} />
        <About />
        <AIDiagnosis />
        <Testimonials />
        <Blog />
        <CTA onBookClick={scrollToDoctors} />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} selectedDoctor={selectedDoctor} />
    </>
  );
}

// App Wrapper with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Main App Content with Hooks
function AppContent() {
  const navigate = useNavigate();
  const { showOverlay } = usePageLoad(500);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is authenticated
    if (typeof window !== 'undefined') {
      return localStorage.getItem('danmedy_auth') === 'true';
    }
    return false;
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('danmedy_auth', 'true');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('danmedy_auth');
    navigate('/login');
  };

  const handleSignUp = () => {
    // After signup, redirect to login using internal router to avoid 404
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Load Overlay */}
      <PageOverlay isVisible={showOverlay} />
      
      {/* Navigation */}
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp onSignUp={handleSignUp} />
        } />
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
      </Routes>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default App;
