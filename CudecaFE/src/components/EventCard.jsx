import { Link } from 'react-router-dom';
import { Calendar, MapPin, Euro } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const EventCard = ({ event }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(event, 1);
  };

  const eventTypeColors = {
    gastronomico: 'bg-green-100 text-green-800',
    cultural: 'bg-blue-100 text-blue-800',
    deportivo: 'bg-orange-100 text-orange-800',
    sorteo: 'bg-yellow-100 text-yellow-800',
    taller: 'bg-purple-100 text-purple-800',
    mercadillo: 'bg-pink-100 text-pink-800',
    otros: 'bg-gray-100 text-gray-800',
  };

  const eventTypeImages = {
    gastronomico: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=400&fit=crop',
    cultural: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG9tb3Jyb3dsYW5kfGVufDB8fDB8fHww',
    deportivo: 'https://plus.unsplash.com/premium_photo-1664537975122-9c598d85816e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sorteo: 'https://plus.unsplash.com/premium_photo-1661940814738-5a028d647d3a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3ViYXN0YXxlbnwwfHwwfHx8MA%3D%3D',
    taller: 'https://images.unsplash.com/photo-1623652554515-91c833e3080e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsbGVyfGVufDB8fDB8fHww',
    mercadillo: 'https://images.unsplash.com/photo-1597668900045-b9283c0de174?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2FkaWxsb3xlbnwwfHwwfHx8MA%3D%3D',
    otros: 'https://images.unsplash.com/photo-1513682121497-80211f36a7d3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww'
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
        <img
          src={event.image || eventTypeImages[event.type] || eventTypeImages.otros}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
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
            {event.price > 0 ? (
              <>
                <Euro className="w-6 h-6 mr-1" aria-hidden="true" />
                <span>{event.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg">Entrada gratuita</span>
            )}
          </div>
        </div>

        {/* Acciones */}
        <button
          onClick={handleAddToCart}
          className="w-full btn-primary"
          aria-label={`Añadir ${event.title} al carrito`}
        >
          Añadir al Carrito
        </button>
      </div>
    </motion.article>
  );
};

export default EventCard;
