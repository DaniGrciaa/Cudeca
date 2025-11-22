import { motion } from 'framer-motion';
import { Heart, Users, HandHeart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&h=400&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-cudeca-darkGreen opacity-85"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              ¿Quiénes Somos?
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Cudeca: Cuidando con amor y ofreciendo cuidados paliativos gratuitos desde 1992
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Misión */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <HandHeart className="w-12 h-12 text-cudeca-darkGreen" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-gray-900">Nuestra Misión</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Cudeca</strong> es una fundación que ofrece <strong>cuidados paliativos gratuitos</strong> a personas 
              con cáncer y otras enfermedades avanzadas en la provincia de Málaga. Desde 1992, hemos estado comprometidos 
              con mejorar la calidad de vida de los pacientes y sus familias en momentos difíciles.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Nuestro equipo multidisciplinar trabaja las 24 horas del día, los 7 días de la semana, proporcionando 
              atención médica, psicológica, social y espiritual de forma <strong>completamente gratuita</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Gracias al apoyo de la comunidad a través de donaciones y eventos solidarios, podemos continuar 
              ofreciendo estos servicios esenciales sin coste alguno para las familias que más lo necesitan.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-12 h-12 text-cudeca-darkGreen" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-gray-900">Nuestros Valores</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-cudeca-lightGreen p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compasión</h3>
                <p className="text-gray-700">
                  Tratamos a cada persona con dignidad, respeto y empatía, reconociendo su individualidad 
                  y necesidades únicas.
                </p>
              </div>
              <div className="bg-cudeca-lightGreen p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Excelencia</h3>
                <p className="text-gray-700">
                  Nos comprometemos a ofrecer el más alto nivel de atención profesional, basada en evidencia 
                  científica y mejores prácticas.
                </p>
              </div>
              <div className="bg-cudeca-lightGreen p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Trabajo en Equipo</h3>
                <p className="text-gray-700">
                  Colaboramos como un equipo multidisciplinar para proporcionar cuidados holísticos e integrales.
                </p>
              </div>
              <div className="bg-cudeca-lightGreen p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Solidaridad</h3>
                <p className="text-gray-700">
                  Creemos en el apoyo mutuo y en la importancia de la comunidad para hacer realidad nuestra misión.
                </p>
              </div>
            </div>
          </div>

          {/* Impacto en Números */}
          <div className="bg-gradient-to-br from-cudeca-green to-cudeca-mediumGreen rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestro Impacto</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">30+</p>
                <p className="text-lg text-white">Años de experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">1,500+</p>
                <p className="text-lg text-white">Pacientes atendidos anualmente</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">100+</p>
                <p className="text-lg text-white">Profesionales dedicados</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">24/7</p>
                <p className="text-lg text-white">Atención disponible</p>
              </div>
            </div>
          </div>

          {/* CTA Contacto */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Tienes dudas?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Estamos aquí para responder cualquier pregunta que tengas sobre nuestra fundación, 
              nuestros servicios o cómo puedes colaborar.
            </p>
            <a
              href="mailto:info@cudeca.org"
              className="inline-flex items-center gap-3 bg-cudeca-darkGreen text-white font-bold py-4 px-10 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg focus:outline-none focus:ring-4 focus:ring-cudeca-darkGreen focus:ring-offset-2"
            >
              <Mail className="w-6 h-6" aria-hidden="true" />
              Contactar
            </a>
          </div>

          {/* Redes Sociales */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Síguenos en Redes Sociales</h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com/cudeca"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-offset-2"
                aria-label="Visitar Facebook de Cudeca"
              >
                <Facebook className="w-8 h-8 text-white" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/cudeca"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 p-4 rounded-full hover:bg-sky-600 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-offset-2"
                aria-label="Visitar Twitter de Cudeca"
              >
                <Twitter className="w-8 h-8 text-white" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/cudeca"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-offset-2"
                aria-label="Visitar Instagram de Cudeca"
              >
                <Instagram className="w-8 h-8 text-white" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
