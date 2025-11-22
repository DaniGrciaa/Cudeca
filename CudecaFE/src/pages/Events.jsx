import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import EventCard from '../components/EventCard';

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
  {
    id: 7,
    title: 'Cena Solidaria de Primavera',
    description: 'Disfruta de una deliciosa cena con los mejores productos de temporada.',
    type: 'cena',
    price: 65.00,
    date: '5 de Abril, 2026',
    location: 'Hotel Alay, Benalmádena',
    image: null,
    availableTickets: 200,
  },
  {
    id: 8,
    title: 'Concierto de Rock Solidario',
    description: 'Las mejores bandas locales de rock se unen por una causa benéfica.',
    type: 'concierto',
    price: 30.00,
    date: '15 de Mayo, 2026',
    location: 'Sala París 15, Málaga',
    image: null,
    availableTickets: 400,
  },
  {
    id: 9,
    title: 'Marcha Cicloturista Solidaria',
    description: 'Recorre 50km por la costa en bicicleta. Incluye avituallamiento y medalla.',
    type: 'marcha',
    price: 20.00,
    date: '25 de Mayo, 2026',
    location: 'Salida: Puerto Deportivo de Benalmádena',
    image: null,
    availableTickets: 350,
  },
  {
    id: 10,
    title: 'Rifa de Verano',
    description: 'Gana fantásticos premios veraniegos mientras apoyas nuestra causa.',
    type: 'rifa',
    price: 3.00,
    date: 'Sorteo: 15 de Junio, 2026',
    location: 'Online',
    image: null,
    availableTickets: 2000,
  },
];

const Events = () => {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const eventTypes = [
    { value: 'all', label: 'Todos' },
    { value: 'cena', label: 'Cenas' },
    { value: 'concierto', label: 'Conciertos' },
    { value: 'marcha', label: 'Marchas' },
    { value: 'rifa', label: 'Rifas' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Fecha' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'title', label: 'Nombre' },
  ];

  // TODO: Obtener eventos de la API
  let filteredEvents = filterType === 'all'
    ? mockEvents
    : mockEvents.filter(event => event.type === filterType);

  // Ordenar eventos
  filteredEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'date':
      default:
        return 0;
    }
  });

  // Obtener imagen según el tipo de evento filtrado
  const getBackgroundImage = () => {
    const images = {
      all: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=400&fit=crop',
      cena: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=400&fit=crop',
      concierto: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&h=400&fit=crop',
      marcha: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&h=400&fit=crop',
      rifa: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=1600&h=400&fit=crop'
    };
    return images[filterType] || images.all;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden" style={{
        backgroundImage: `url(${getBackgroundImage()})`,
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
              Todos los Eventos
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Encuentra el evento perfecto para ti y contribuye a nuestra causa solidaria
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filtros y ordenamiento */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-6 h-6 text-gray-700" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900">Filtros</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tipo de evento */}
            <div>
              <label htmlFor="event-type" className="block text-lg font-semibold text-gray-900 mb-3">
                Tipo de Evento
              </label>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFilterType(type.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      filterType === type.value
                        ? 'bg-cudeca-mediumGreen text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-pressed={filterType === type.value}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ordenar por */}
            <div>
              <label htmlFor="sort-by" className="block text-lg font-semibold text-gray-900 mb-3">
                Ordenar Por
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Resumen de resultados */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-lg">
              Mostrando <span className="font-bold text-cudeca-darkGreen">{filteredEvents.length}</span> evento{filteredEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Grid de eventos */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-gray-600">
              No hay eventos disponibles para este filtro.
            </p>
            <button
              onClick={() => setFilterType('all')}
              className="btn-primary mt-6"
            >
              Ver Todos los Eventos
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;
