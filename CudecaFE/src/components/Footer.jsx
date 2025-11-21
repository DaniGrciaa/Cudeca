import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-cudeca-yellow fill-cudeca-yellow" aria-hidden="true" />
              <span className="text-2xl font-bold">Cudeca Eventos</span>
            </div>
            <p className="text-gray-400 text-lg mb-4">
              Fundación Cudeca - Cuidados Paliativos. 
              Tu apoyo nos ayuda a ofrecer atención gratuita a pacientes y familias.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/cudeca"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-cudeca-yellow hover:text-gray-900 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                aria-label="Visitar Facebook de Cudeca"
              >
                <Facebook className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/cudeca"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-cudeca-yellow hover:text-gray-900 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                aria-label="Visitar Twitter de Cudeca"
              >
                <Twitter className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/cudeca"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-cudeca-yellow hover:text-gray-900 transition-colors focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                aria-label="Visitar Instagram de Cudeca"
              >
                <Instagram className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-lg">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-lg">
                  Eventos
                </Link>
              </li>
              <li>
                <a href="#volunteer" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-lg">
                  Voluntariado
                </a>
              </li>
              <li>
                <a href="#member" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-lg">
                  Hazte Socio
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 text-cudeca-yellow flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-400 text-base">
                  Calle Cudeca s/n, 29631 Benalmádena, Málaga
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-cudeca-yellow flex-shrink-0" aria-hidden="true" />
                <a href="tel:+34952564735" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-lg">
                  +34 952 56 47 35
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cudeca-yellow flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@cudeca.org" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-lg">
                  info@cudeca.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-base">
              © {currentYear} Fundación Cudeca. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-base">
                Política de Privacidad
              </a>
              <a href="#terms" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-base">
                Términos y Condiciones
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-cudeca-yellow transition-colors text-base">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
