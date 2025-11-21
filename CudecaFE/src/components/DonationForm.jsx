import { useForm } from 'react-hook-form';
import { Euro, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';

const DonationForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      donationType: 'custom',
      customAmount: '',
    }
  });

  const setExtraDonation = useCartStore((state) => state.setExtraDonation);
  const extraDonation = useCartStore((state) => state.extraDonation);

  const donationType = watch('donationType');
  const customAmount = watch('customAmount');

  const presetAmounts = [5, 10, 20, 50, 100];

  const onSubmit = (data) => {
    let amount = 0;
    
    if (data.donationType === 'custom') {
      amount = parseFloat(data.customAmount) || 0;
    } else {
      amount = parseFloat(data.donationType);
    }
    
    setExtraDonation(amount);
  };

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Heart className="w-8 h-8 text-cudeca-yellow fill-cudeca-yellow" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-gray-900">
          Añadir Donación Solidaria
        </h3>
      </div>

      <p className="text-gray-600 text-lg mb-6">
        Tu generosidad ayuda a Cudeca a seguir brindando cuidados paliativos gratuitos.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Cantidades predefinidas */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Selecciona una cantidad:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {presetAmounts.map((amount) => (
              <label
                key={amount}
                className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  donationType === amount.toString()
                    ? 'border-cudeca-yellow bg-cudeca-yellow bg-opacity-10'
                    : 'border-gray-300 hover:border-cudeca-yellow'
                }`}
              >
                <input
                  type="radio"
                  value={amount}
                  {...register('donationType')}
                  className="sr-only"
                  aria-label={`Donar ${amount} euros`}
                />
                <div className="text-center">
                  <Euro className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
                  <span className="font-bold text-lg">{amount}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Cantidad personalizada */}
        <div>
          <label
            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              donationType === 'custom'
                ? 'border-cudeca-yellow bg-cudeca-yellow bg-opacity-10'
                : 'border-gray-300 hover:border-cudeca-yellow'
            }`}
          >
            <input
              type="radio"
              value="custom"
              {...register('donationType')}
              className="sr-only"
            />
            <span className="font-semibold text-lg mr-4">Otra cantidad:</span>
            <div className="flex-1 relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register('customAmount', {
                  min: { value: 0, message: 'La cantidad debe ser positiva' },
                })}
                disabled={donationType !== 'custom'}
                className="input-field pl-10"
                aria-label="Cantidad personalizada de donación"
              />
            </div>
          </label>
          {errors.customAmount && (
            <p className="text-red-600 text-sm mt-2" role="alert">
              {errors.customAmount.message}
            </p>
          )}
        </div>

        {/* Botón de confirmación */}
        <button
          type="submit"
          className="btn-primary w-full"
        >
          Confirmar Donación
        </button>

        {/* Donación actual */}
        {extraDonation > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cudeca-lightGreen p-4 rounded-lg text-center"
          >
            <p className="text-lg font-semibold text-cudeca-darkGreen">
              Donación añadida: <span className="text-2xl">{extraDonation.toFixed(2)}€</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              ¡Gracias por tu generosidad! 💚
            </p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default DonationForm;
