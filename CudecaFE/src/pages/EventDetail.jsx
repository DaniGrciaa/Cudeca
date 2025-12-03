import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Euro, Users, ArrowLeft, Plus, Minus } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import GoalProgress from '../components/GoalProgress';
import { eventosAPI } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        const data = await eventosAPI.getById(id);
        
        // Transformar datos del backend al formato del frontend
        const transformedEvent = {
          id: data.id,
          title: data.nombre,
          description: data.descripcion || 'Evento solidario de Cudeca',
          longDescription: data.descripcionLarga || data.descripcion,
          type: data.tipoEvento?.toLowerCase() || 'cena',
          price: data.precio || 0,
          date: new Date(data.fecha).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          location: data.ubicacion || 'Por confirmar',
          image: data.imagenUrl || null,
          availableTickets: data.aforoMaximo - (data.entradasVendidas || 0),
          schedule: data.horario || null,
          includes: data.incluye ? data.incluye.split(',').map(item => item.trim()) : [],
          current: data.recaudacionActual || 0,
          goal: data.metaRecaudacion || 0,
        };
        
        setEvent(transformedEvent);
      } catch (err) {
        console.error('Error al cargar evento:', err);
        // Redirigir a la página de eventos si no se encuentra
        navigate('/eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addItem(event, quantity);
    navigate('/checkout');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= event.availableTickets) {
      setQuantity(newQuantity);
    }
  };

  const total = event.price * quantity;

  const eventTypeColors = {
    cena: 'bg-purple-100 text-purple-800',
    concierto: 'bg-blue-100 text-blue-800',
    marcha: 'bg-green-100 text-green-800',
    rifa: 'bg-yellow-100 text-yellow-800',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-cudeca-mediumGreen mb-4"></div>
            <p className="text-xl text-gray-600">Cargando evento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-cudeca-darkGreen mb-8 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-cudeca-yellow rounded-lg p-2"
          aria-label="Volver atrás"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Volver
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Columna izquierda: Detalles del evento */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Imagen */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-6 bg-gray-200">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cudeca-yellow to-cudeca-green">
                  <Calendar className="w-24 h-24 text-gray-700" aria-hidden="true" />
                </div>
              )}
              <span
                className={`absolute top-4 right-4 px-4 py-2 rounded-full text-base font-semibold ${
                  eventTypeColors[event.type] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>

            {/* Título y descripción */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {event.description}
            </p>

            {event.longDescription && (
              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700">{event.longDescription}</p>
              </div>
            )}

            {/* Información del evento */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Información del Evento
              </h2>

              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-cudeca-darkGreen flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-900">Fecha</p>
                  <p className="text-gray-600">{event.date}</p>
                  {event.schedule && (
                    <p className="text-gray-600">{event.schedule}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-cudeca-darkGreen flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-900">Ubicación</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-cudeca-darkGreen flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-900">Entradas Disponibles</p>
                  <p className="text-gray-600">{event.availableTickets} plazas</p>
                </div>
              </div>

              {event.includes && event.includes.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Incluye:</p>
                  <ul className="space-y-2">
                    {event.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-cudeca-yellow rounded-full" aria-hidden="true"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Columna derecha: Compra */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-600 text-lg mb-1">Precio por entrada</p>
                  <div className="flex items-center text-cudeca-darkGreen font-bold text-4xl">
                    <Euro className="w-8 h-8 mr-1" aria-hidden="true" />
                    <span>{event.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Selector de cantidad */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Cantidad de Entradas
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-6 h-6" aria-hidden="true" />
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    max={event.availableTickets}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= event.availableTickets) {
                        setQuantity(val);
                      }
                    }}
                    className="w-24 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg py-2 focus:border-cudeca-yellow focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                    aria-label="Cantidad de entradas"
                  />
                  
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= event.availableTickets}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-cudeca-yellow"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Máximo {event.availableTickets} entradas disponibles
                </p>
              </div>

              {/* Total */}
              <div className="bg-cudeca-lightGreen p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-3xl font-bold text-cudeca-darkGreen">
                    {total.toFixed(2)}€
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {quantity} entrada{quantity !== 1 ? 's' : ''} × {event.price.toFixed(2)}€
                </p>
              </div>

              {/* Botón de compra */}
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full mb-4"
              >
                Añadir al Carrito y Continuar
              </button>

              <p className="text-sm text-gray-500 text-center">
                Tu contribución ayuda a Cudeca a seguir ofreciendo cuidados paliativos gratuitos
              </p>
            </div>

            {/* Progreso de recaudación del evento */}
            {event.goal > 0 && (
              <div className="mt-8">
                <GoalProgress current={event.current} goal={event.goal} eventTitle={event.title} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
