import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import { eventosAPI } from '../services/api';

const Events = () => {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eventTypes = [
    { value: 'all', label: 'Todos' },
    { value: 'gastronomico', label: 'Gastronómico' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'deportivo', label: 'Deportivo' },
    { value: 'sorteo', label: 'Sorteo' },
    { value: 'taller', label: 'Taller' },
    { value: 'mercadillo', label: 'Mercadillo' },
    { value: 'otros', label: 'Otros' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Fecha' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'title', label: 'Nombre' },
  ];

  // Cargar eventos desde el backend
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await eventosAPI.getAll();
        
        if (!data || data.length === 0) {
          setEventos([]);
          setError('No hay eventos disponibles en este momento.');
          return;
        }
        
        // Transformar datos del backend al formato del frontend
        const transformedEvents = data.map(evento => ({
          id: evento.id,
          title: evento.nombre,
          description: evento.descripcion || 'Evento solidario de Cudeca',
          type: evento.tipo ? evento.tipo.toLowerCase() : 'cena',
          price: evento.precio || 0,
          date: new Date(evento.fecha).toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }),
          dateRaw: new Date(evento.fecha), // Guardamos la fecha original para ordenar
          location: evento.lugar || 'Por confirmar',
          image: null,
          availableTickets: 100, // Valor por defecto ya que la API no tiene aforo
          totalRecaudado: evento.totalRecaudado || 0,
        }));
        
        setEventos(transformedEvents);
        console.log(`Cargados ${transformedEvents.length} eventos desde el backend`);
      } catch (err) {
        console.error('Error al cargar eventos:', err);
        setError('No se pudo conectar con el backend. Por favor, intenta de nuevo más tarde.');
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  // Filtrar eventos
  let filteredEvents = filterType === 'all'
    ? eventos
    : eventos.filter(event => event.type === filterType);

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
        // Ordenar por fecha (más próximos primero)
        return a.dateRaw - b.dateRaw;
    }
  });

  // Obtener imagen según el tipo de evento filtrado
  const getBackgroundImage = () => {
    const images = {
      all: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=400&fit=crop',
      gastronomico: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=400&fit=crop', // Comida gourmet
      cultural: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG9tb3Jyb3dsYW5kfGVufDB8fDB8fHww', // Teatro/concierto
      deportivo: 'https://plus.unsplash.com/premium_photo-1664537975122-9c598d85816e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Running/deporte
      sorteo: 'https://plus.unsplash.com/premium_photo-1661940814738-5a028d647d3a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3ViYXN0YXxlbnwwfHwwfHx8MA%3D%3D', // Lotería/rifa
      taller: 'https://images.unsplash.com/photo-1623652554515-91c833e3080e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsbGVyfGVufDB8fDB8fHww', // Workshop/aprendizaje
      mercadillo: 'https://images.unsplash.com/photo-1597668900045-b9283c0de174?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2FkaWxsb3xlbnwwfHwwfHx8MA%3D%3D', // Mercado/tienda
      otros: 'https://images.unsplash.com/photo-1513682121497-80211f36a7d3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww' // Evento genérico
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

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        {/* Indicador de carga */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cudeca-mediumGreen"></div>
            <p className="text-xl text-gray-600 mt-4">Cargando eventos...</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
