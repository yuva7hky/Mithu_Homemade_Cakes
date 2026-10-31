import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import IntroVideo from './components/IntroVideo';
import BottomNav from './components/BottomNav';
import SurpriseComboModal from './components/SurpriseComboModal';
import FloatingGiftButton from './components/FloatingGiftButton';

// Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import MenuPage from './pages/MenuPage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const isHomePage = location.pathname === '/';

  // Sequence: 1st intro video plays on opening the website.
  // Right after the intro finishes, the ad-like Surprise Combo popup appears!
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);

    // Smoothly display the Surprise Combo ad popup right after the intro video completes
    setTimeout(() => {
      setShowSurpriseModal(true);
    }, 250);
  }, []);

  const handleCloseSurpriseModal = useCallback(() => {
    setShowSurpriseModal(false);
  }, []);

  const handleOpenSurpriseModal = useCallback(() => {
    setShowSurpriseModal(true);
  }, []);

  return (
    <>
      <ScrollToTop />

      {/* 1. Intro Video shown first when opening the website */}
      {showIntro && <IntroVideo onComplete={handleIntroComplete} />}
      
      {/* Main Website Structure */}
      <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${showIntro ? 'opacity-0 h-screen overflow-hidden pointer-events-none' : 'opacity-100'}`}>
        <Navbar />
        <CartDrawer />
        <CheckoutModal />
        
        <main className="flex-grow pt-14 md:pt-20 pb-16 md:pb-0"> {/* pt-14 mobile / pt-20 desktop for fixed navbar, pb-16 for mobile bottom nav */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
        <BottomNav />
      </div>

      {/* 3. Floating Gift Box Button on Homepage (re-opens the promotion anytime) */}
      {!showIntro && isHomePage && (
        <FloatingGiftButton onClick={handleOpenSurpriseModal} />
      )}

      {/* 2. Ad-like Surprise Combo Offer Modal (appears right after intro video completes) */}
      {!showIntro && (
        <SurpriseComboModal 
          isOpen={showSurpriseModal} 
          onClose={handleCloseSurpriseModal} 
        />
      )}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
