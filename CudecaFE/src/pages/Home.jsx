import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import EventCard from '../components/EventCard';
import GoalProgress from '../components/GoalProgress';
import VolunteerOptions from '../components/VolunteerOptions';

// TODO: Reemplazar con datos de la API
const mockEvents = [
  {
    id: 1,
    title: 'Cena Benéfica de Gala',
    description: 'Una noche elegante para recaudar fondos con cena, música en vivo y subasta.',
    type: 'cena',
    price: 75.00,
    date: '15 de Diciembre, 2025',
    location: 'Hotel Vincci Selección Aleysa, Benalmádena',
    image: null,
    availableTickets: 150,
  },
  {
    id: 2,
    title: 'Concierto Solidario: Música por la Vida',
    description: 'Disfruta de una velada musical con artistas locales comprometidos con nuestra causa.',
    type: 'concierto',
    price: 25.00,
    date: '20 de Enero, 2026',
    location: 'Auditorio de la Diputación, Málaga',
    image: null,
    availableTickets: 300,
  },
  {
    id: 3,
    title: 'Gran Rifa Solidaria',
    description: 'Participa en nuestra rifa con increíbles premios. ¡Toda la recaudación va a Cudeca!',
    type: 'rifa',
    price: 5.00,
    date: 'Sorteo: 1 de Febrero, 2026',
    location: 'Online',
    image: null,
    availableTickets: 1000,
  },
  {
    id: 4,
    title: 'Marcha Solidaria 10K',
    description: 'Camina o corre por una buena causa. Incluye camiseta, dorsal y avituallamiento.',
    type: 'marcha',
    price: 15.00,
    date: '10 de Marzo, 2026',
    location: 'Paseo Marítimo de Benalmádena',
    image: null,
    availableTickets: 500,
  },
  {
    id: 5,
    title: 'Concierto de Navidad',
    description: 'Celebra la Navidad con villancicos y música clásica en un ambiente único.',
    type: 'concierto',
    price: 20.00,
    date: '22 de Diciembre, 2025',
    location: 'Iglesia de Santo Domingo, Málaga',
    image: null,
    availableTickets: 200,
  },
  {
    id: 6,
    title: 'Cena de San Valentín',
    description: 'Una cena romántica para dos con menú especial y espectáculo incluido.',
    type: 'cena',
    price: 120.00,
    date: '14 de Febrero, 2026',
    location: 'Restaurante La Ola, Marbella',
    image: null,
    availableTickets: 80,
  },
];

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=600&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-cudeca-darkGreen opacity-80"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              EVENTOS SOLIDARIOS QUE<br />MARCAN LA DIFERENCIA
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-8 drop-shadow-lg">
              Participa en nuestros eventos y ayúdanos a seguir ofreciendo cuidados paliativos gratuitos a quienes más lo necesitan.
            </p>
            <a
              href="#events"
              className="inline-block bg-cudeca-green text-white font-bold py-4 px-10 rounded-lg hover:bg-cudeca-mediumGreen transition-all duration-200 shadow-2xl hover:shadow-xl text-xl focus:outline-none focus:ring-4 focus:ring-cudeca-green focus:ring-offset-2"
            >
              Próximos Eventos
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sección de Eventos y Recaudación */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Próximos Eventos (2/3) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Próximos Eventos
              </h2>
              
              {/* Grid de eventos destacados */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {mockEvents.slice(0, 4).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <div className="text-center">
                <a
                  href="/eventos"
                  className="inline-block bg-cudeca-darkGreen text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg focus:outline-none focus:ring-4 focus:ring-cudeca-darkGreen focus:ring-offset-2"
                >
                  Ver Todos los Eventos
                </a>
              </div>
            </motion.div>
          </div>

          {/* Columna Derecha - Recaudación (1/3) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-24"
            >
              {/* Versión compacta de progreso */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Objetivo de Recaudación
                </h3>
                
                {/* Estadísticas */}
                <div className="space-y-4 mb-6">
                  <div className="bg-cudeca-lightGreen p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Recaudado</p>
                    <p className="text-3xl font-bold text-cudeca-darkGreen">
                      6.500 €
                    </p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Objetivo</p>
                    <p className="text-3xl font-bold text-gray-900">
                      10.000 €
                    </p>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progreso</span>
                    <span className="font-bold text-cudeca-darkGreen">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-cudeca-mediumGreen h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Quedan <span className="font-bold text-cudeca-darkGreen">3.500 €</span> para alcanzar el objetivo
                  </p>
                </div>

                {/* CTA Donar */}
                <a
                  href="/hazte-socio"
                  className="block w-full text-center bg-cudeca-mediumGreen text-white font-bold py-3 px-6 rounded-lg hover:bg-cudeca-darkGreen transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-cudeca-mediumGreen focus:ring-offset-2"
                >
                  Donar Ahora
                </a>

                <p className="text-sm text-gray-600 mt-4 text-center">
                  Tu apoyo marca la diferencia
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opciones de voluntariado */}
      <VolunteerOptions />
    </div>
  );
};

export default Home;
