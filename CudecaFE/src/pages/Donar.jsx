import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usuariosAPI } from '../services/api';

const Donar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [cantidad, setCantidad] = useState(15);
  const [loading, setLoading] = useState(false);

  const donationOptions = [5, 10, 15, 25, 50, 100];

  const handleDonationChange = (amount) => {
    setCantidad(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para hacer una donación');
      navigate('/login');
      return;
    }

    if (cantidad <= 0) {
      alert('Por favor, selecciona una cantidad válida para donar');
      return;
    }
    
    setLoading(true);
    
    try {
      // Obtener el ID del usuario si no lo tiene
      let userId = user.id;
      
      if (!userId) {
        // Buscar usuario por email
        const usuarios = await usuariosAPI.getAll();
        const usuarioCompleto = usuarios.find(u => u.email === user.email);
        
        if (!usuarioCompleto) {
          throw new Error('Usuario no encontrado');
        }
        
        userId = usuarioCompleto.id;
        
        // Actualizar el localStorage con el ID del usuario
        const updatedUser = { ...user, id: userId };
        localStorage.setItem('cudeca_user', JSON.stringify(updatedUser));
      }
      
      // Incrementar la donación del usuario
      await usuariosAPI.incrementarDonacion(userId, cantidad);
      
      alert(`¡Gracias por tu donación de ${cantidad}€! Tu apoyo es fundamental para nuestra causa.`);
      
      // Redirigir al perfil
      navigate('/perfil');
      
    } catch (err) {
      console.error('Error al procesar la donación:', err);
      alert('Hubo un error al procesar tu donación. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=400&fit=crop)',
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
            <Heart className="w-20 h-20 mx-auto mb-6 text-cudeca-yellow" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Haz una Donación
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Tu generosidad nos ayuda a seguir ofreciendo cuidados paliativos de calidad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formulario de Donación */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-cudeca-darkGreen" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Elige la cantidad a donar
              </h2>
              <p className="text-lg text-gray-600">
                Cada contribución cuenta y marca la diferencia
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Opciones de Donación */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Cantidad de Donación
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {donationOptions.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleDonationChange(amount)}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        cantidad === amount
                          ? 'border-cudeca-yellow bg-cudeca-yellow text-gray-900 shadow-lg'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-cudeca-darkGreen'
                      }`}
                    >
                      <div className="text-3xl font-bold">{amount}€</div>
                    </button>
                  ))}
                </div>

                {/* Cantidad Personalizada */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    O ingresa una cantidad personalizada
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                      €
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cudeca-darkGreen focus:ring-2 focus:ring-cudeca-yellow outline-none transition-all text-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Información sobre el impacto */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-cudeca-darkGreen mb-3 flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Tu impacto
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>✓ Ayudas a mantener nuestros servicios gratuitos</p>
                  <p>✓ Contribuyes al cuidado de pacientes y familias</p>
                  <p>✓ Apoyas la formación de profesionales</p>
                  <p>✓ Haces posible la investigación en cuidados paliativos</p>
                </div>
              </div>

              {/* Método de Pago (simulado) */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-6 h-6 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Método de Pago
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Esta es una versión de demostración. En la versión real, aquí se integraría una pasarela de pago segura.
                </p>
              </div>

              {/* Resumen */}
              <div className="bg-cudeca-darkGreen rounded-xl p-6 text-white">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">Total a Donar:</span>
                  <span className="text-4xl font-bold">{cantidad}€</span>
                </div>
              </div>

              {/* Botón de Envío */}
              <button
                type="submit"
                disabled={loading || !isAuthenticated}
                className="w-full bg-cudeca-yellow text-gray-900 font-bold text-xl py-4 rounded-xl hover:bg-yellow-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                {loading ? 'Procesando...' : isAuthenticated ? `Donar ${cantidad}€` : 'Inicia sesión para donar'}
              </button>

              {!isAuthenticated && (
                <p className="text-center text-gray-600 mt-4">
                  <a href="/login" className="text-cudeca-darkGreen font-semibold hover:underline">
                    Inicia sesión
                  </a>
                  {' '}o{' '}
                  <a href="/hazte-socio" className="text-cudeca-darkGreen font-semibold hover:underline">
                    regístrate
                  </a>
                  {' '}para hacer tu donación
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Sección de Transparencia */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              ¿Por qué donar a Cudeca?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="bg-cudeca-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💚</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Transparencia Total</h3>
                <p className="text-gray-600">
                  Cada euro se destina directamente a nuestros pacientes y sus familias
                </p>
              </div>
              <div className="p-6">
                <div className="bg-cudeca-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Impacto Real</h3>
                <p className="text-gray-600">
                  Atendemos a más de 1,500 pacientes al año de forma gratuita
                </p>
              </div>
              <div className="p-6">
                <div className="bg-cudeca-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Compromiso</h3>
                <p className="text-gray-600">
                  Más de 30 años cuidando con excelencia y profesionalidad
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donar;
