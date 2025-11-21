import { Link } from 'react-router-dom';
import { Calendar, MapPin, Euro } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';

const EventCard = ({ event }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(event, 1);
  };

  const eventTypeColors = {
    cena: 'bg-purple-100 text-purple-800',
    concierto: 'bg-blue-100 text-blue-800',
    marcha: 'bg-green-100 text-green-800',
    rifa: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {/* Imagen del evento */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cudeca-yellow to-cudeca-green">
            <Calendar className="w-16 h-16 text-gray-700" aria-hidden="true" />
          </div>
        )}
        
        {/* Badge de tipo de evento */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
            eventTypeColors[event.type] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-lg mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Información del evento */}
        <div className="space-y-2 mb-4">
          {event.date && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
              <span className="text-base">{event.date}</span>
            </div>
          )}
          
          {event.location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
              <span className="text-base">{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center text-cudeca-darkGreen font-bold text-xl">
            <Euro className="w-6 h-6 mr-1" aria-hidden="true" />
            <span>{event.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 btn-outline text-center"
            aria-label={`Ver detalles de ${event.title}`}
          >
            Ver Detalles
          </Link>
          
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary"
            aria-label={`Añadir ${event.title} al carrito`}
          >
            Comprar
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;
