import { Heart, Users, Info, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const VolunteerOptions = () => {
  const options = [
    {
      icon: Users,
      title: 'Hazte Socio',
      description: 'Únete a nuestra comunidad de socios y apoya nuestra causa de forma regular.',
      action: 'Más información',
      href: '#member',
      color: 'bg-cudeca-yellow',
    },
    {
      icon: Heart,
      title: 'Hazte Voluntario',
      description: 'Dedica tu tiempo y habilidades para ayudar a quienes más lo necesitan.',
      action: 'Inscríbete',
      href: '#volunteer',
      color: 'bg-cudeca-green',
    },
    {
      icon: Info,
      title: 'Recibe Información',
      description: 'Mantente al día con nuestras actividades, eventos y noticias.',
      action: 'Suscribirme',
      href: '#newsletter',
      color: 'bg-blue-400',
    },
  ];

  return (
    <section className="py-12" aria-labelledby="volunteer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="volunteer-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Otras Formas de Colaborar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hay muchas maneras de apoyar nuestra misión. Descubre cómo puedes marcar la diferencia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.article
                key={option.title}
                className="card p-6 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-gray-900" aria-hidden="true" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h3>

                <p className="text-lg text-gray-600 mb-6 flex-grow">
                  {option.description}
                </p>

                <a
                  href={option.href}
                  className="btn-outline flex items-center justify-center gap-2 group"
                  aria-label={`${option.action} - ${option.title}`}
                >
                  <span>{option.action}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
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
