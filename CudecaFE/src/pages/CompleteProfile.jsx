import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, User, Phone, CheckCircle } from 'lucide-react';
import { usuariosAPI } from '../services/api';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
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

  useEffect(() => {
    // Verificar que el usuario está autenticado
    const savedUser = localStorage.getItem('cudeca_user');
    const savedToken = localStorage.getItem('cudeca_token');
    
    if (!savedUser || !savedToken) {
      console.log('CompleteProfile - No autenticado, redirigiendo a login');
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(savedUser);
    setUserData(user);
    console.log('CompleteProfile - Usuario cargado:', user);
  }, [navigate]);

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

  const handleSkip = () => {
    console.log('CompleteProfile - Usuario omitió completar perfil');
    navigate('/perfil');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Preparar el objeto de dirección solo si hay datos
      const tieneDireccion = formData.direccion.calle || 
                            formData.direccion.ciudad || 
                            formData.direccion.codigoPostal;
      
      let direccionesArray = [];
      if (tieneDireccion) {
        const direccionParaEnviar = {
          calle: formData.direccion.calle || '',
          numero: formData.direccion.numero || '',
          piso: formData.direccion.piso || '',
          puerta: formData.direccion.puerta || '',
          codigoPostal: formData.direccion.codigoPostal || '',
          ciudad: formData.direccion.ciudad || '',
          provincia: formData.direccion.provincia || '',
          pais: formData.direccion.pais || 'España'
        };
        direccionesArray.push(direccionParaEnviar);
      }

      // Preparar nombre completo
      const nombreCompleto = formData.apellidos 
        ? `${formData.nombre} ${formData.apellidos}`
        : formData.nombre || userData.nombre || userData.email.split('@')[0];

      // Preparar datos según el nuevo endpoint /api/usuarios/complete-profile
      const datosCompleteProfile = {
        telefono: formData.telefono ? formData.telefono.replace(/\s/g, '') : '',
        nombre: nombreCompleto,
        direcciones: direccionesArray
      };

      console.log('Completando perfil con:', JSON.stringify(datosCompleteProfile, null, 2));

      // Llamar al endpoint de completar perfil
      const response = await usuariosAPI.completeProfile(datosCompleteProfile);

      console.log('Perfil completado exitosamente:', response);

      // Actualizar los datos locales del usuario
      const updatedUser = {
        ...userData,
        telefono: formData.telefono || null,
        nombre: datosCompleteProfile.nombre
      };
      localStorage.setItem('cudeca_user', JSON.stringify(updatedUser));

      alert('¡Perfil completado exitosamente!');
      navigate('/perfil');

    } catch (error) {
      console.error('Error al completar perfil:', error);
      alert('Error al guardar los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-cudeca-mediumGreen rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Bienvenido a Cudeca!
          </h1>
          <p className="text-lg text-gray-600">
            Completa tu perfil para una mejor experiencia
          </p>
        </div>

        {/* Información del usuario de Google */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <User className="w-6 h-6 text-cudeca-darkGreen" />
            <div>
              <p className="text-sm text-gray-600">Registrado como:</p>
              <p className="text-lg font-semibold text-gray-900">{userData.nombre}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-cudeca-darkGreen" />
            <div>
              <p className="text-sm text-gray-600">Email:</p>
              <p className="text-lg font-semibold text-gray-900">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="bg-cudeca-lightGreen border-l-4 border-cudeca-darkGreen p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              <strong>Opcional:</strong> Añade tu teléfono y dirección para recibir información 
              y certificados de tus donaciones.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre y Apellidos */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-cudeca-darkGreen" />
                Información Personal
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-900 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                    maxLength="50"
                  />
                </div>

                <div>
                  <label htmlFor="apellidos" className="block text-sm font-semibold text-gray-900 mb-1">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                    placeholder="Tus apellidos"
                    maxLength="50"
                  />
                </div>
              </div>
            </div>

            {/* Teléfono */}
            <div className="pt-4 border-t border-gray-200">
              <label htmlFor="telefono" className="block text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-cudeca-darkGreen" />
                Teléfono de Contacto
              </label>
              <p className="text-sm text-gray-600 mb-2">
                9 dígitos sin espacios
              </p>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                placeholder="600000000"
                pattern="[0-9]{9}"
                maxLength="9"
              />
            </div>

            {/* Dirección */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cudeca-darkGreen" />
                Dirección
              </h3>

              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="calle" className="block text-sm font-semibold text-gray-900 mb-1">
                      Calle
                    </label>
                    <input
                      type="text"
                      id="calle"
                      name="calle"
                      value={formData.direccion.calle}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                      placeholder="Nombre de la calle"
                      maxLength="200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="numero" className="block text-sm font-semibold text-gray-900 mb-1">
                      Número
                    </label>
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      value={formData.direccion.numero}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                      placeholder="Nº"
                      maxLength="50"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="piso" className="block text-sm font-semibold text-gray-900 mb-1">
                      Piso
                    </label>
                    <input
                      type="text"
                      id="piso"
                      name="piso"
                      value={formData.direccion.piso}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                      placeholder="Ej: 3º"
                      maxLength="10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="puerta" className="block text-sm font-semibold text-gray-900 mb-1">
                      Puerta
                    </label>
                    <input
                      type="text"
                      id="puerta"
                      name="puerta"
                      value={formData.direccion.puerta}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                      placeholder="Ej: A"
                      maxLength="10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="codigoPostal" className="block text-sm font-semibold text-gray-900 mb-1">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="codigoPostal"
                      name="codigoPostal"
                      value={formData.direccion.codigoPostal}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                      placeholder="29000"
                      maxLength="10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ciudad" className="block text-sm font-semibold text-gray-900 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      value={formData.direccion.ciudad}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                      placeholder="Tu ciudad"
                      maxLength="100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="provincia" className="block text-sm font-semibold text-gray-900 mb-1">
                      Provincia
                    </label>
                    <input
                      type="text"
                      id="provincia"
                      name="provincia"
                      value={formData.direccion.provincia}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                      placeholder="Tu provincia"
                      maxLength="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-cudeca-darkGreen text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Guardando...' : 'Guardar y Continuar'}
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Omitir por Ahora
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Puedes añadir o modificar esta información más tarde desde tu perfil
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
