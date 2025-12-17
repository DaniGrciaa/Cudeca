import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Ticket } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import cudecaLogo from '../images/cudeca-logo.png';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Eventos', href: '/eventos' },
    { name: 'Donar', href: '/donar' },
    { name: 'About Us', href: '/about-us' },
  ];

  // Solo mostrar "Hazte Socio" si el usuario NO está autenticado
  const navigationItems = isAuthenticated 
    ? navigation 
    : [...navigation, { name: 'Hazte Socio', href: '/hazte-socio' }];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded-lg p-2 cursor-pointer"
            aria-label="Cudeca Eventos - Ir a inicio"
          >
            <img 
              src={cudecaLogo} 
              alt="Cudeca Logo" 
              className="h-12 w-auto object-contain pointer-events-none"
            />
            <span className="text-2xl font-bold text-gray-900 pointer-events-none">Cudeca Eventos</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded px-3 py-2"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mis Entradas (solo para usuarios autenticados) */}
            {isAuthenticated && (
              <Link
                to="/mis-entradas"
                className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded px-3 py-2"
              >
                <Ticket className="w-5 h-5" aria-hidden="true" />
                Mis Entradas
              </Link>
            )}
            
            {/* Profile / Login */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/perfil"
                  className="group flex items-center gap-2 p-2 focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded-lg hover:bg-gray-100 cursor-pointer"
                  aria-label="Mi Perfil"
                >
                  <User className="w-6 h-6 text-gray-700 group-hover:text-cudeca-darkGreen transition-colors pointer-events-none" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700 pointer-events-none">{user?.nombre?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="group p-2 focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded-lg hover:bg-gray-100 cursor-pointer"
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors pointer-events-none" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-cudeca-darkGreen text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
              >
                <User className="w-5 h-5" aria-hidden="true" />
                Iniciar Sesión
              </Link>
            )}
            
            {/* Cart Icon */}
            <Link
              to="/carrito"
              className="group relative p-2 focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded-lg cursor-pointer"
              aria-label={`Carrito de compras - ${itemCount} artículos`}
            >
              <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-cudeca-darkGreen transition-colors pointer-events-none" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cudeca-yellow text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center" aria-live="polite">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
            aria-expanded={isMenuOpen}
            aria-label="Menú de navegación"
          >
            {isMenuOpen ? (
              <X className="w-7 h-7" aria-hidden="true" />
            ) : (
              <Menu className="w-7 h-7" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen hover:bg-gray-50 rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/mis-entradas"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen hover:bg-gray-50 rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Ticket className="w-5 h-5" aria-hidden="true" />
                    Mis Entradas
                  </Link>
                )}
                <Link
                  to="/perfil"
                  className="text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen hover:bg-gray-50 rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Perfil
                </Link>
                <Link
                  to="/carrito"
                  className="flex items-center justify-between text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen hover:bg-gray-50 rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Carrito</span>
                  {itemCount > 0 && (
                    <span className="bg-cudeca-yellow text-gray-900 text-sm font-bold rounded-full px-3 py-1">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
