import { Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const VolunteerOptions = () => {
  return (
    <section className="py-12" aria-labelledby="volunteer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="volunteer-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conviértete en socio y forma parte del cambio que queremos ver en el mundo.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.article
            className="card p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-cudeca-yellow w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Users className="w-10 h-10 text-gray-900" aria-hidden="true" />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Hazte Socio
            </h3>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Únete a nuestra comunidad de socios y apoya nuestra causa de forma regular. 
              Tu contribución mensual nos ayuda a planificar mejor y a llegar a más personas.
            </p>

            <Link
              to="/hazte-socio"
              className="btn-primary flex items-center gap-2 group text-lg px-8 py-3"
              aria-label="Registrarse como socio"
            >
              <span>Hacerme Socio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.article>
        </div>

        {/* Llamada a la acción adicional */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-cudeca-yellow to-cudeca-green p-8 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Tienes dudas?
          </h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
          </p>
          <a
            href="mailto:info@cudeca.org"
            className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 text-lg"
          >
            Contactar
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VolunteerOptions;
