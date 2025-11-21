import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Home, Calendar } from 'lucide-react';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener datos del pedido de la navegación
  const orderData = location.state?.orderData;

  // Si no hay datos, redirigir a inicio
  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          className="card p-8 max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-xl text-gray-600 mb-6">
            No se encontró información del pedido.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Volver al Inicio
          </button>
        </motion.div>
      </div>
    );
  }

  const { fullName, email, items, extraDonation, isFilaCero, total } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cudeca-lightGreen to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Animación de éxito */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <CheckCircle className="w-32 h-32 text-cudeca-darkGreen" aria-hidden="true" />
              <motion.div
                className="absolute inset-0 bg-cudeca-green rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ¡Gracias, {fullName.split(' ')[0]}!
          </h1>
          
          <p className="text-2xl text-gray-700 mb-2">
            Tu compra se ha completado con éxito
          </p>
          
          <p className="text-xl text-gray-600">
            Hemos enviado la confirmación a <strong>{email}</strong>
          </p>
        </motion.div>

        {/* Detalles del pedido */}
        <motion.div
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Resumen de tu Contribución
          </h2>

          {/* Items comprados */}
          {items && items.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Entradas Adquiridas:
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × {item.price.toFixed(2)}€
                      </p>
                    </div>
                    <p className="font-bold text-cudeca-darkGreen">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Donación extra */}
          {extraDonation > 0 && (
            <div className="p-4 bg-cudeca-lightGreen rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-cudeca-darkGreen fill-cudeca-darkGreen" aria-hidden="true" />
                  <span className="font-semibold text-gray-900">Donación Extra:</span>
                </div>
                <span className="text-xl font-bold text-cudeca-darkGreen">
                  {extraDonation.toFixed(2)}€
                </span>
              </div>
            </div>
          )}

          {/* Fila cero */}
          {isFilaCero && (
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-cudeca-yellow mb-6">
              <p className="text-gray-900 font-semibold">
                ✓ Fila Cero activada
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Has optado por donar sin asistir al evento, liberando plazas para otros. ¡Increíblemente generoso!
              </p>
            </div>
          )}

          {/* Total */}
          <div className="pt-6 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total Contribuido:</span>
              <span className="text-4xl font-bold text-cudeca-darkGreen">
                {total.toFixed(2)}€
              </span>
            </div>
          </div>
        </motion.div>

        {/* Mensaje de agradecimiento */}
        <motion.div
          className="card p-8 bg-gradient-to-r from-cudeca-yellow to-cudeca-green mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <Heart className="w-12 h-12 text-gray-900 fill-gray-900 flex-shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Tu Apoyo Marca la Diferencia
              </h3>
              <p className="text-lg text-gray-800 mb-2">
                Gracias a personas como tú, Cudeca puede seguir ofreciendo cuidados paliativos gratuitos de alta calidad a pacientes y familias que lo necesitan.
              </p>
              <p className="text-base text-gray-700">
                Recibirás más información sobre el evento por correo electrónico en los próximos días.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Próximos pasos */}
        <motion.div
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Qué Sigue Ahora?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-cudeca-yellow rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p className="text-gray-700">
                Revisa tu correo electrónico para la confirmación detallada de tu compra.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-cudeca-yellow rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p className="text-gray-700">
                Recibirás recordatorios sobre el evento unos días antes de la fecha.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-cudeca-yellow rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p className="text-gray-700">
                ¡Prepárate para disfrutar de una experiencia solidaria inolvidable!
              </p>
            </li>
          </ul>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex items-center justify-center gap-2 flex-1"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Volver al Inicio
          </button>
          
          <button
            onClick={() => navigate('/events')}
            className="btn-outline flex items-center justify-center gap-2 flex-1"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            Ver Más Eventos
          </button>
        </motion.div>

        {/* Compartir en redes */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-gray-600 mb-4">
            Comparte tu apoyo a Cudeca en redes sociales
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=Acabo de apoyar a @Cudeca comprando entradas para sus eventos solidarios. ¡Únete tú también!&url=${window.location.origin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Compartir en Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Compartir en Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
