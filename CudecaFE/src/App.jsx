import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import AboutUs from './pages/AboutUs';
import HazteSocio from './pages/HazteSocio';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import OAuth2Redirect from './pages/OAuth2Redirect';
import CompleteProfile from './pages/CompleteProfile';
import Donar from './pages/Donar';
import MisEntradas from './pages/MisEntradas';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/donar" element={<Donar />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/hazte-socio" element={<HazteSocio />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/mis-entradas" element={<MisEntradas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
