import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, AlertCircle } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import CheckoutForm from '../components/CheckoutForm';
import DonationForm from '../components/DonationForm';

const Checkout = () => {
  const navigate = useNavigate();
  const [showFilaCeroInfo, setShowFilaCeroInfo] = useState(false);
  
  const { items, extraDonation, isFilaCero, updateQuantity, removeItem, toggleFilaCero, clearCart, getTotal } = useCartStore();

  const handleCheckout = async (formData) => {
    // TODO: Enviar datos al backend
    console.log('Datos del formulario:', formData);
    console.log('Items del carrito:', items);
    console.log('Donación extra:', extraDonation);
    console.log('Fila cero:', isFilaCero);

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Procesar pago con pasarela de pago

    // Limpiar carrito y redirigir a página de agradecimiento
    clearCart();
    navigate('/thank-you', {
      state: {
        orderData: {
          ...formData,
          items,
          extraDonation,
          isFilaCero,
          total: getTotal(),
        }
      }
    });
  };

  const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = getTotal();

  if (items.length === 0 && !isFilaCero) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="card p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-400" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explora nuestros eventos solidarios y encuentra el perfecto para ti.
            </p>
            <button
              onClick={() => navigate('/events')}
              className="btn-primary"
            >
              Ver Eventos Disponibles
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Finalizar Compra
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Resumen del carrito */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items del carrito */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingCart className="w-7 h-7" aria-hidden="true" />
                Tu Carrito ({items.length})
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-24 h-24 bg-gradient-to-br from-cudeca-yellow to-cudeca-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-gray-900">
                        {item.title.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                      <p className="text-lg font-semibold text-cudeca-darkGreen">
                        {item.price.toFixed(2)}€ × {item.quantity} = {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-300"
                        aria-label={`Eliminar ${item.title}`}
                      >
                        <Trash2 className="w-5 h-5" aria-hidden="true" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 bg-white rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cudeca-yellow"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-white rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cudeca-yellow"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Opción Fila Cero */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isFilaCero}
                    onChange={toggleFilaCero}
                    className="w-5 h-5 mt-1 text-cudeca-yellow focus:ring-cudeca-yellow rounded"
                  />
                  <div className="ml-3 flex-grow">
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-cudeca-darkGreen transition-colors">
                      Fila Cero (solo donación, sin acceso al evento)
                    </span>
                    <button
                      onClick={() => setShowFilaCeroInfo(!showFilaCeroInfo)}
                      className="ml-2 text-cudeca-darkGreen hover:underline text-base"
                    >
                      ¿Qué es esto?
                    </button>
                  </div>
                </label>

                {showFilaCeroInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-4 bg-cudeca-lightGreen rounded-lg flex gap-3"
                  >
                    <AlertCircle className="w-6 h-6 text-cudeca-darkGreen flex-shrink-0" aria-hidden="true" />
                    <p className="text-gray-700">
                      La "Fila Cero" te permite hacer una donación equivalente al precio de las entradas sin asistir al evento, liberando plazas para otras personas que deseen participar. Tu generosidad seguirá apoyando nuestra causa.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Formulario de donación */}
            <DonationForm />

            {/* Formulario de checkout */}
            <CheckoutForm onSubmit={handleCheckout} />
          </div>

          {/* Columna derecha: Resumen de precios */}
          <div className="lg:col-span-1">
            <motion.div
              className="card p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumen
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal ({items.length} {items.length === 1 ? 'entrada' : 'entradas'}):</span>
                  <span className="font-semibold">{itemsTotal.toFixed(2)}€</span>
                </div>

                {extraDonation > 0 && (
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Donación extra:</span>
                    <span className="font-semibold text-cudeca-darkGreen">+{extraDonation.toFixed(2)}€</span>
                  </div>
                )}

                {isFilaCero && (
                  <div className="p-3 bg-cudeca-lightGreen rounded-lg">
                    <p className="text-sm text-cudeca-darkGreen font-semibold">
                      ✓ Fila Cero activada
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Tu donación sin asistencia
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t-2 border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">Total:</span>
                  <span className="text-3xl font-bold text-cudeca-darkGreen">
                    {total.toFixed(2)}€
                  </span>
                </div>
              </div>

              <div className="bg-cudeca-yellow bg-opacity-20 p-4 rounded-lg border-l-4 border-cudeca-yellow">
                <p className="text-sm text-gray-700">
                  <strong>¡Gracias por tu apoyo!</strong> Tu contribución ayuda a Cudeca a seguir ofreciendo cuidados paliativos gratuitos a quienes más lo necesitan.
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Al completar la compra aceptas nuestros términos y condiciones
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
