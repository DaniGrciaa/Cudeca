import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Carrito = () => {
  // Mock cart items - en producción vendría del store
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Cena Benéfica de Gala',
      price: 75.00,
      quantity: 2,
      date: '15 de Diciembre, 2025',
      location: 'Hotel Vincci Selección Aleysa, Benalmádena'
    },
    {
      id: 2,
      title: 'Cena Solidaria De Primavera',
      price: 65.00,
      quantity: 1,
      date: '5 de Abril, 2026',
      location: 'Hotel Alay, Benalmádena'
    }
  ]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('existing');
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const fees = subtotal * 0.03; // 3% de gastos de gestión
  const total = subtotal + fees;

  const handleCheckout = () => {
    // TODO: Integrar con backend
    alert('Procesando pago...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ¡Explora nuestros eventos y encuentra el perfecto para ti!
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">MI CARRITO</h1>
          <p className="text-xl text-gray-600">
            Revisa tus entradas antes de proceder al pago
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items del carrito */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Información del evento */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      📅 {item.date}
                    </p>
                    <p className="text-gray-600">
                      📍 {item.location}
                    </p>
                  </div>

                  {/* Precio y cantidad */}
                  <div className="flex items-center gap-6">
                    {/* Control de cantidad */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cudeca-yellow"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-5 h-5 text-gray-700" aria-hidden="true" />
                      </button>
                      <span className="text-xl font-bold text-gray-900 w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cudeca-yellow"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-5 h-5 text-gray-700" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Precio */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {item.price.toFixed(2)} € × {item.quantity}
                      </p>
                      <p className="text-2xl font-bold text-cudeca-darkGreen">
                        {(item.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
                      aria-label={`Eliminar ${item.title}`}
                    >
                      <Trash2 className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumen y pago */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>

              {/* Desglose de precios */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {subtotal.toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Gastos de gestión</span>
                  <span className="font-semibold text-gray-900">
                    {fees.toFixed(2)} €
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-8">
                <span>Total</span>
                <span className="text-cudeca-darkGreen">{total.toFixed(2)} €</span>
              </div>

              {/* Método de pago */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-cudeca-darkGreen" aria-hidden="true" />
                  Método de Pago
                </h3>

                <div className="space-y-3">
                  {/* Tarjeta existente */}
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="existing"
                      checked={selectedPaymentMethod === 'existing'}
                      onChange={(e) => {
                        setSelectedPaymentMethod(e.target.value);
                        setShowAddPaymentForm(false);
                      }}
                      className="w-4 h-4 text-cudeca-darkGreen focus:ring-cudeca-yellow"
                    />
                    <div className="ml-3 flex-grow">
                      <p className="font-semibold text-gray-900">Visa •••• 4242</p>
                      <p className="text-sm text-gray-600">Vence 12/25</p>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  </label>

                  {/* Añadir nuevo método */}
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="new"
                      checked={selectedPaymentMethod === 'new'}
                      onChange={(e) => {
                        setSelectedPaymentMethod(e.target.value);
                        setShowAddPaymentForm(true);
                      }}
                      className="w-4 h-4 text-cudeca-darkGreen focus:ring-cudeca-yellow"
                    />
                    <span className="ml-3 font-semibold text-gray-900">
                      Añadir nuevo método de pago
                    </span>
                  </label>
                </div>

                {/* Formulario de nueva tarjeta (simulado) */}
                {showAddPaymentForm && (
                  <motion.div
                    className="mt-4 p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <p className="text-sm text-gray-600 mb-3">
                      Serás redirigido a una pasarela segura de pago
                    </p>
                    <div className="flex gap-2">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        MC
                      </div>
                      <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        AMEX
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Botón de pago */}
              <button
                onClick={handleCheckout}
                className="w-full bg-cudeca-darkGreen text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-xl focus:outline-none focus:ring-4 focus:ring-cudeca-darkGreen focus:ring-offset-2 flex items-center justify-center gap-3"
              >
                PAGAR
                <ArrowRight className="w-6 h-6" aria-hidden="true" />
              </button>

              <p className="mt-4 text-sm text-center text-gray-600">
                🔒 Pago seguro con encriptación SSL
              </p>
            </motion.div>
          </div>
        </div>

        {/* Botón continuar comprando */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/eventos"
            className="inline-block text-cudeca-darkGreen font-semibold text-lg hover:underline"
          >
            ← Continuar comprando entradas
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Carrito;
