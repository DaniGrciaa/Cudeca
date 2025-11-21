import { useForm } from 'react-hook-form';
import { User, Mail, Phone, CreditCard, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const CheckoutForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    mode: 'onBlur',
  });

  const paymentMethod = watch('paymentMethod', 'card');

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="card p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Datos de Contacto
      </h2>

      {/* Nombre completo */}
      <div>
        <label htmlFor="fullName" className="block text-lg font-semibold text-gray-900 mb-2">
          Nombre completo <span className="text-red-600" aria-label="obligatorio">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
          <input
            id="fullName"
            type="text"
            {...register('fullName', {
              required: 'El nombre es obligatorio',
              minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
            })}
            className="input-field pl-10"
            placeholder="Ej: María García López"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
        </div>
        {errors.fullName && (
          <p id="fullName-error" className="text-red-600 text-sm mt-2" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
          Email <span className="text-red-600" aria-label="obligatorio">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email no válido'
              }
            })}
            className="input-field pl-10"
            placeholder="Ej: maria@ejemplo.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="text-red-600 text-sm mt-2" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="phone" className="block text-lg font-semibold text-gray-900 mb-2">
          Teléfono <span className="text-red-600" aria-label="obligatorio">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
          <input
            id="phone"
            type="tel"
            {...register('phone', {
              required: 'El teléfono es obligatorio',
              pattern: {
                value: /^[0-9]{9}$/,
                message: 'Introduce un teléfono válido (9 dígitos)'
              }
            })}
            className="input-field pl-10"
            placeholder="Ej: 612345678"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
        </div>
        {errors.phone && (
          <p id="phone-error" className="text-red-600 text-sm mt-2" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Método de pago */}
      <div>
        <fieldset>
          <legend className="block text-lg font-semibold text-gray-900 mb-3">
            Método de pago <span className="text-red-600" aria-label="obligatorio">*</span>
          </legend>
          <div className="space-y-3">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === 'card'
                ? 'border-cudeca-yellow bg-cudeca-yellow bg-opacity-10'
                : 'border-gray-300 hover:border-cudeca-yellow'
            }`}>
              <input
                type="radio"
                value="card"
                {...register('paymentMethod', { required: true })}
                className="w-5 h-5 text-cudeca-yellow focus:ring-cudeca-yellow"
              />
              <CreditCard className="w-6 h-6 ml-3 mr-2 text-gray-700" aria-hidden="true" />
              <span className="text-lg font-medium">Tarjeta de crédito/débito</span>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === 'transfer'
                ? 'border-cudeca-yellow bg-cudeca-yellow bg-opacity-10'
                : 'border-gray-300 hover:border-cudeca-yellow'
            }`}>
              <input
                type="radio"
                value="transfer"
                {...register('paymentMethod', { required: true })}
                className="w-5 h-5 text-cudeca-yellow focus:ring-cudeca-yellow"
              />
              <Building className="w-6 h-6 ml-3 mr-2 text-gray-700" aria-hidden="true" />
              <span className="text-lg font-medium">Transferencia bancaria</span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Comentarios adicionales */}
      <div>
        <label htmlFor="comments" className="block text-lg font-semibold text-gray-900 mb-2">
          Comentarios adicionales (opcional)
        </label>
        <textarea
          id="comments"
          {...register('comments')}
          rows="4"
          className="input-field resize-none"
          placeholder="¿Tienes alguna solicitud especial o comentario?"
        />
      </div>

      {/* Aceptación de condiciones */}
      <div>
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            {...register('acceptTerms', {
              required: 'Debes aceptar los términos y condiciones'
            })}
            className="w-5 h-5 mt-1 text-cudeca-yellow focus:ring-cudeca-yellow rounded"
            aria-invalid={errors.acceptTerms ? 'true' : 'false'}
            aria-describedby={errors.acceptTerms ? 'terms-error' : undefined}
          />
          <span className="ml-3 text-base text-gray-700">
            Acepto los <a href="#" className="text-cudeca-darkGreen font-semibold hover:underline">términos y condiciones</a> y la <a href="#" className="text-cudeca-darkGreen font-semibold hover:underline">política de privacidad</a>. <span className="text-red-600" aria-label="obligatorio">*</span>
          </span>
        </label>
        {errors.acceptTerms && (
          <p id="terms-error" className="text-red-600 text-sm mt-2" role="alert">
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
        aria-label="Completar compra"
      >
        {isSubmitting ? 'Procesando...' : 'Completar Compra'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Los campos marcados con <span className="text-red-600">*</span> son obligatorios
      </p>
    </motion.form>
  );
};

export default CheckoutForm;
