import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useCartStore from '../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Eventos', href: '/events' },
    { name: 'Voluntariado', href: '#volunteer' },
    { name: 'Hazte Socio', href: '#member' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded-lg p-2"
            aria-label="Cudeca Eventos - Ir a inicio"
          >
            <Heart className="w-8 h-8 text-cudeca-yellow fill-cudeca-yellow" aria-hidden="true" />
            <span className="text-2xl font-bold text-gray-900">Cudeca Eventos</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded px-3 py-2"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              to="/checkout"
              className="relative p-2 focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded-lg"
              aria-label={`Carrito de compras - ${itemCount} artículos`}
            >
              <ShoppingCart className="w-7 h-7 text-gray-700 hover:text-cudeca-darkGreen transition-colors" aria-hidden="true" />
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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-cudeca-darkGreen hover:bg-gray-50 rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/checkout"
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
