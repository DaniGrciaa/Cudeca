import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
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
import Donar from './pages/Donar';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';
import Cookies from './pages/Cookies';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
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
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/privacidad" element={<Privacidad />} />
                <Route path="/terminos" element={<Terminos />} />
                <Route path="/cookies" element={<Cookies />} />
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
