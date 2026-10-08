import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import IntroVideo from './components/IntroVideo';

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

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />}
        
        <div className={`min-h-screen flex flex-col transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-20"> {/* pt-20 to account for fixed navbar */}
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
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
