import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Calendar, MapPin, ShoppingBag, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { comprasEventosAPI } from '../services/api';

const MisEntradas = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [eventosComprados, setEventosComprados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isAuthenticated) {
      cargarEventosComprados();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const cargarEventosComprados = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await comprasEventosAPI.getMisEventos();
      setEventosComprados(data);
    } catch (err) {
      console.error('Error al cargar eventos comprados:', err);
      setError('No se pudieron cargar tus entradas. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearFechaHora = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cudeca-darkGreen mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando tus entradas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Error al cargar</h3>
              <p className="text-red-700">{error}</p>
              <button
                onClick={cargarEventosComprados}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (eventosComprados.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Ticket className="w-24 h-24 mx-auto mb-6 text-gray-300" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              No tienes entradas compradas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ¡Explora nuestros eventos y consigue tus entradas!
            </p>
            <Link
              to="/eventos"
              className="inline-block bg-cudeca-darkGreen text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg focus:outline-none focus:ring-4 focus:ring-cudeca-darkGreen focus:ring-offset-2"
            >
              Ver Eventos
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center gap-4">
            <Ticket className="w-12 h-12 text-cudeca-darkGreen" aria-hidden="true" />
            MIS ENTRADAS
          </h1>
          <p className="text-xl text-gray-600">
            Tienes {eventosComprados.length} {eventosComprados.length === 1 ? 'entrada' : 'entradas'} compradas
          </p>
        </motion.div>

        {/* Lista de eventos comprados */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventosComprados.map((compra, index) => (
            <motion.div
              key={compra.compraId}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Contenido de la tarjeta */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {compra.eventoNombre}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5 text-cudeca-darkGreen" aria-hidden="true" />
                    <span className="text-sm">{formatearFecha(compra.eventoFecha)}</span>
                  </div>

                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-cudeca-darkGreen" aria-hidden="true" />
                    <span className="text-sm">{compra.eventoLugar}</span>
                  </div>

                  <div className="flex items-start gap-2 text-gray-600">
                    <ShoppingBag className="w-5 h-5 flex-shrink-0 mt-0.5 text-cudeca-darkGreen" aria-hidden="true" />
                    <span className="text-sm">Comprado el {formatearFechaHora(compra.fechaCompra)}</span>
                  </div>
                </div>

                {/* Detalles de la compra */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Entradas:</span>
                    <span className="text-2xl font-bold text-cudeca-darkGreen">
                      {compra.cantidadEntradas}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total pagado:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {compra.precioTotal.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón para seguir comprando */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/eventos"
            className="inline-block text-cudeca-darkGreen font-semibold text-lg hover:underline"
          >
            ← Ver más eventos
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MisEntradas;
