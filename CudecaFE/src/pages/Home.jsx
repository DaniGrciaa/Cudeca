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
  const [filterType, setFilterType] = useState('all');

  const eventTypes = [
    { value: 'all', label: 'Todos los Eventos' },
    { value: 'cena', label: 'Cenas' },
    { value: 'concierto', label: 'Conciertos' },
    { value: 'marcha', label: 'Marchas' },
    { value: 'rifa', label: 'Rifas' },
  ];

  // TODO: Obtener eventos filtrados de la API
  const filteredEvents = filterType === 'all'
    ? mockEvents
    : mockEvents.filter(event => event.type === filterType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cudeca-yellow to-cudeca-green py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-gray-900" aria-hidden="true" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Eventos Solidarios Cudeca
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
              Participa en nuestros eventos y ayúdanos a seguir ofreciendo cuidados paliativos gratuitos a quienes más lo necesitan.
            </p>
            <a
              href="#events"
              className="inline-block bg-gray-900 text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl text-lg focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-2"
            >
              Ver Eventos Disponibles
            </a>
          </motion.div>
        </div>
      </section>

      {/* Progreso de recaudación */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GoalProgress current={6500} goal={10000} eventTitle="Todos los Eventos" />
      </section>

      {/* Filtros y eventos */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Próximos Eventos
          </h2>
          
          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Filtrar eventos por tipo">
            {eventTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  filterType === type.value
                    ? 'bg-cudeca-yellow text-gray-900 shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
                aria-pressed={filterType === type.value}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de eventos */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No hay eventos disponibles para este filtro.
            </p>
          </div>
        )}
      </section>

      {/* Opciones de voluntariado */}
      <VolunteerOptions />
    </div>
  );
};

export default Home;
