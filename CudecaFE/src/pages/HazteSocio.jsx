import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Mail, MapPin, User, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usuariosAPI } from '../services/api';

const HazteSocio = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    telefono: '',
    metodoPago: 'tarjeta',
    donacionMensual: 15,
    direccion: {
      calle: '',
      numero: '',
      piso: '',
      puerta: '',
      codigoPostal: '',
      ciudad: '',
      provincia: '',
      pais: 'España'
    }
  });

  const donationOptions = [0, 5, 10, 15, 25, 50];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si el campo pertenece a la dirección
    if (['calle', 'numero', 'piso', 'puerta', 'codigoPostal', 'ciudad', 'provincia', 'pais'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDonationChange = (amount) => {
    setFormData(prev => ({
      ...prev,
      donacionMensual: amount
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que la contraseña tenga al menos 8 caracteres (requisito del backend)
    if (formData.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    // Validar el teléfono si se proporciona (debe tener 9 dígitos)
    if (formData.telefono && !/^[0-9]{9}$/.test(formData.telefono.replace(/\s/g, ''))) {
      alert('El teléfono debe tener 9 dígitos');
      return;
    }
    
    try {
      // Verificar si hay datos de dirección
      const tieneDireccion = formData.direccion.calle || 
                            formData.direccion.numero || 
                            formData.direccion.ciudad || 
                            formData.direccion.codigoPostal;
      
      // Preparar el objeto de dirección solo si hay datos
      let direccionParaEnviar = null;
      if (tieneDireccion) {
        direccionParaEnviar = {};
        if (formData.direccion.calle) direccionParaEnviar.calle = formData.direccion.calle;
        if (formData.direccion.numero) direccionParaEnviar.numero = formData.direccion.numero;
        if (formData.direccion.piso) direccionParaEnviar.piso = formData.direccion.piso;
        if (formData.direccion.puerta) direccionParaEnviar.puerta = formData.direccion.puerta;
        if (formData.direccion.codigoPostal) direccionParaEnviar.codigoPostal = formData.direccion.codigoPostal;
        if (formData.direccion.ciudad) direccionParaEnviar.ciudad = formData.direccion.ciudad;
        if (formData.direccion.provincia) direccionParaEnviar.provincia = formData.direccion.provincia;
        if (formData.direccion.pais) direccionParaEnviar.pais = formData.direccion.pais;
      }
      
      // Preparar nombre completo
      const nombreCompleto = formData.apellidos 
        ? `${formData.nombre} ${formData.apellidos}`
        : formData.nombre;
      
      // Preparar datos según lo que espera el backend (UsuarioRequest)
      const datosParaBackend = {
        nombre: nombreCompleto,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono ? formData.telefono.replace(/\s/g, '') : null,
        rol: 'SOCIO',
        cantidadDonada: formData.donacionMensual || 0,
        direcciones: direccionParaEnviar ? [direccionParaEnviar] : []
      };

      console.log('Enviando datos al backend:', datosParaBackend);
      
      // Registrar el usuario usando el método register del contexto
      await register(datosParaBackend);
      
      console.log('Usuario registrado exitosamente');
      
      alert('¡Gracias por hacerte socio de Cudeca! Tu cuenta ha sido creada exitosamente.');
      
      // Redirigir al perfil
      navigate('/perfil');
      
    } catch (err) {
      console.error('Error al crear usuario:', err);
      const errorMessage = err.message || 'Hubo un error al procesar tu solicitud';
      alert(`Error: ${errorMessage}\n\nPor favor, verifica que el email no esté ya registrado e inténtalo de nuevo.`);
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hazte Socio
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Tu apoyo mensual hace posible que sigamos ofreciendo cuidados paliativos gratuitos
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Formulario */}
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Información sobre datos personales */}
          <div className="bg-cudeca-lightGreen border-l-4 border-cudeca-darkGreen p-6 rounded-lg mb-8">
            <p className="text-lg text-gray-700">
              <strong>Solicitamos unos datos mínimos de carácter personal</strong> para poder gestionar tu 
              membresía y emitir los recibos correspondientes. Todos tus datos están protegidos según la LOPD.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos Personales */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="w-7 h-7 text-cudeca-darkGreen" aria-hidden="true" />
                Datos Personales
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-lg font-semibold text-gray-900 mb-2">
                    Nombre <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="apellidos" className="block text-lg font-semibold text-gray-900 mb-2">
                    Apellidos <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" aria-hidden="true" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field pl-12"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-lg font-semibold text-gray-900 mb-2">
                    Contraseña <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="8"
                    className="input-field"
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="telefono" className="block text-lg font-semibold text-gray-900 mb-2">
                  Número de Contacto (Opcional)
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  Debe tener 9 dígitos sin espacios
                </p>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="600000000"
                  pattern="[0-9]{9}"
                  maxLength="9"
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-7 h-7 text-cudeca-darkGreen" aria-hidden="true" />
                Dirección (Opcional)
              </h2>
              
              <p className="text-sm text-gray-600 mb-4">
                La dirección es opcional pero recomendada para poder enviarte información y certificados.
              </p>

              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="calle" className="block text-lg font-semibold text-gray-900 mb-2">
                      Calle
                    </label>
                    <input
                      type="text"
                      id="calle"
                      name="calle"
                      value={formData.direccion.calle}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Nombre de la calle"
                      maxLength="200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="numero" className="block text-lg font-semibold text-gray-900 mb-2">
                      Número
                    </label>
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      value={formData.direccion.numero}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Nº"
                      maxLength="50"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="piso" className="block text-lg font-semibold text-gray-900 mb-2">
                      Piso
                    </label>
                    <input
                      type="text"
                      id="piso"
                      name="piso"
                      value={formData.direccion.piso}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Ej: 3º"
                      maxLength="10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="puerta" className="block text-lg font-semibold text-gray-900 mb-2">
                      Puerta
                    </label>
                    <input
                      type="text"
                      id="puerta"
                      name="puerta"
                      value={formData.direccion.puerta}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Ej: A"
                      maxLength="10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="codigoPostal" className="block text-lg font-semibold text-gray-900 mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="codigoPostal"
                      name="codigoPostal"
                      value={formData.direccion.codigoPostal}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="29000"
                      maxLength="10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ciudad" className="block text-lg font-semibold text-gray-900 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      value={formData.direccion.ciudad}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu ciudad"
                      maxLength="100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="provincia" className="block text-lg font-semibold text-gray-900 mb-2">
                      Provincia
                    </label>
                    <input
                      type="text"
                      id="provincia"
                      name="provincia"
                      value={formData.direccion.provincia}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu provincia"
                      maxLength="100"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="pais" className="block text-lg font-semibold text-gray-900 mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    id="pais"
                    name="pais"
                    value={formData.direccion.pais}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="España"
                    maxLength="100"
                  />
                </div>
              </div>
            </div>

            {/* Donación */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <DollarSign className="w-7 h-7 text-cudeca-darkGreen" aria-hidden="true" />
                Donación Mensual
              </h2>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Selecciona la cantidad <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Puedes seleccionar 0€ si prefieres ser voluntario sin donación mensual
                </p>
                <div className="grid grid-cols-6 gap-3">
                  {donationOptions.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleDonationChange(amount)}
                      className={`py-4 px-3 rounded-lg font-bold text-lg transition-all duration-200 ${
                        formData.donacionMensual === amount
                          ? 'bg-cudeca-mediumGreen text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amount}€
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label htmlFor="customAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                    O ingresa otra cantidad
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="customAmount"
                      min="0"
                      value={formData.donacionMensual}
                      onChange={(e) => handleDonationChange(parseInt(e.target.value) || 0)}
                      className="input-field pr-12"
                      placeholder="Cantidad personalizada"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      €
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cudeca-green to-cudeca-mediumGreen p-8 rounded-lg text-center mb-6">
                <p className="text-2xl font-bold text-white mb-2">
                  Tu Donación Mensual
                </p>
                <p className="text-6xl font-bold text-white mb-2">
                  {formData.donacionMensual} €
                </p>
                <p className="text-lg text-white">
                  Tu contribución mensual nos ayuda a planificar mejor nuestros servicios
                </p>
              </div>

              <div className="bg-cudeca-lightGreen p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>✓</strong> Certificado de socio oficial
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>✓</strong> Boletín trimestral con noticias de Cudeca
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>✓</strong> Invitaciones a eventos exclusivos
                </p>
                <p className="text-gray-700">
                  <strong>✓</strong> Certificado fiscal para desgravación
                </p>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CreditCard className="w-7 h-7 text-cudeca-darkGreen" aria-hidden="true" />
                Método de Pago
              </h2>

              <div className="space-y-4">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={formData.metodoPago === 'tarjeta'}
                    onChange={handleChange}
                    className="w-5 h-5 text-cudeca-darkGreen focus:ring-cudeca-yellow"
                  />
                  <span className="ml-4 text-lg font-medium text-gray-900">
                    Tarjeta de Crédito/Débito
                  </span>
                  <CreditCard className="ml-auto w-6 h-6 text-gray-400" aria-hidden="true" />
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="paypal"
                    checked={formData.metodoPago === 'paypal'}
                    onChange={handleChange}
                    className="w-5 h-5 text-cudeca-darkGreen focus:ring-cudeca-yellow"
                  />
                  <span className="ml-4 text-lg font-medium text-gray-900">
                    PayPal
                  </span>
                  <span className="ml-auto text-blue-600 font-bold text-xl">PayPal</span>
                </label>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                * Se te redirigirá a una página segura para completar el pago. 
                Los datos de tu tarjeta no se almacenan en nuestros servidores.
              </p>
            </div>

            {/* Botón Submit */}
            <div className="pt-8">
              <button
                type="submit"
                className="w-full bg-cudeca-mediumGreen text-white font-bold py-5 px-8 rounded-lg hover:bg-cudeca-darkGreen transition-all duration-200 shadow-xl hover:shadow-2xl text-xl focus:outline-none focus:ring-4 focus:ring-cudeca-mediumGreen focus:ring-offset-2"
              >
                HAZTE SOCIO
              </button>

              <p className="mt-4 text-center text-gray-600">
                Al enviar este formulario aceptas nuestra política de privacidad y 
                las condiciones de la membresía.
              </p>
            </div>
          </form>
        </motion.div>

        {/* Información adicional */}
        <motion.div
          className="mt-8 bg-white rounded-lg shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Tienes alguna pregunta?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Estamos aquí para ayudarte. No dudes en contactarnos.
          </p>
          <a
            href="mailto:socios@cudeca.org"
            className="inline-flex items-center gap-2 text-cudeca-darkGreen font-semibold text-lg hover:underline"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            socios@cudeca.org
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HazteSocio;
