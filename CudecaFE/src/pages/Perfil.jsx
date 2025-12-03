import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Heart, Phone, Edit2, Save, X, Calendar, CheckCircle, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usuariosAPI, comprasAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    nombre: '',
    email: '',
    ciudad: '',
    socio: '',
    telefono: '',
    direccion: '',
    codigoPostal: ''
  });

  const [editData, setEditData] = useState({ ...profileData });
  const [donaciones, setDonaciones] = useState([]);

  // Si no está autenticado, mostrar mensaje de login
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-12">
              <User className="w-24 h-24 mx-auto mb-6 text-gray-300" aria-hidden="true" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Inicia Sesión para Ver tu Perfil
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Necesitas iniciar sesión para acceder a tu perfil y ver tu historial de donaciones
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-cudeca-darkGreen text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                >
                  <LogIn className="w-6 h-6" />
                  Iniciar Sesión
                </Link>
                
                <Link
                  to="/hazte-socio"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-cudeca-mediumGreen text-cudeca-darkGreen font-bold py-4 px-8 rounded-lg hover:bg-cudeca-lightGreen transition-all duration-200 text-lg"
                >
                  <UserPlus className="w-6 h-6" />
                  Registrarse como Socio
                </Link>
              </div>

              <p className="mt-6 text-gray-600">
                ¿No tienes cuenta? Regístrate como socio y apoya la labor de Cudeca
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Obtener datos del usuario
        const userData = await usuariosAPI.getById(userId);
        
        const transformedProfile = {
          nombre: userData.nombre || 'Sin nombre',
          email: userData.email,
          ciudad: 'No especificada',
          socio: 'Sí - Socio de Cudeca',
          telefono: userData.telefono || 'No especificado',
          direccion: 'No especificada',
          codigoPostal: 'No especificado'
        };
        
        setProfileData(transformedProfile);
        setEditData(transformedProfile);
        
        // Obtener historial de compras del usuario
        const compras = await comprasAPI.getByUsuarioId(userId);
        
        const transformedDonaciones = compras.map(compra => ({
          id: compra.id,
          evento: compra.evento?.nombre || 'Evento no especificado',
          fecha: new Date(compra.fechaCompra).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          cantidad: compra.precioTotal || 0,
          status: compra.estadoPago || 'Completado'
        }));
        
        setDonaciones(transformedDonaciones);
      } catch (err) {
        console.error('Error al cargar datos del usuario:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const totalDonado = donaciones.reduce((sum, d) => sum + d.cantidad, 0);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        nombre: editData.nombre,
        email: editData.email,
        telefono: editData.telefono !== 'No especificado' ? editData.telefono : null,
        username: user.email.split('@')[0],
        password: 'temporal123', // Mantener la contraseña existente
        rol: 'SOCIO'
      };
      
      await usuariosAPI.update(userId, updatedUser);
      setProfileData({ ...editData });
      setIsEditing(false);
      alert('Perfil actualizado correctamente');
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      alert('Error al actualizar el perfil. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-cudeca-mediumGreen mb-4"></div>
            <p className="text-xl text-gray-600">Cargando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-xl text-gray-600">
            Gestiona tu información personal y revisa tu historial de donaciones
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Panel Izquierdo - Información Personal */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Foto de perfil */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-cudeca-yellow to-cudeca-green rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                    {profileData.nombre.charAt(0)}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-cudeca-darkGreen rounded-full p-2 shadow-lg">
                    <Heart className="w-6 h-6 text-white fill-white" aria-hidden="true" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {profileData.nombre}
                </h2>
                <p className="text-lg text-cudeca-darkGreen font-semibold">
                  Socio de Cudeca
                </p>
              </div>

              {/* Información */}
              <div className="space-y-4">
                {isEditing ? (
                  // Modo edición
                  <>
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={editData.nombre}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={editData.telefono}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="direccion" className="block text-sm font-semibold text-gray-700 mb-1">
                        Dirección
                      </label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={editData.direccion}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="ciudad" className="block text-sm font-semibold text-gray-700 mb-1">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          id="ciudad"
                          name="ciudad"
                          value={editData.ciudad}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="codigoPostal" className="block text-sm font-semibold text-gray-700 mb-1">
                          C.P.
                        </label>
                        <input
                          type="text"
                          id="codigoPostal"
                          name="codigoPostal"
                          value={editData.codigoPostal}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-cudeca-darkGreen text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Save className="w-5 h-5" aria-hidden="true" />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <X className="w-5 h-5" aria-hidden="true" />
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  // Modo visualización
                  <>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-cudeca-darkGreen mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Email</p>
                        <p className="text-gray-900">{profileData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-cudeca-darkGreen mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Teléfono</p>
                        <p className="text-gray-900">{profileData.telefono}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-cudeca-darkGreen mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Dirección</p>
                        <p className="text-gray-900">{profileData.direccion}</p>
                        <p className="text-gray-900">{profileData.codigoPostal} - {profileData.ciudad}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-cudeca-lightGreen rounded-lg">
                      <Heart className="w-5 h-5 text-cudeca-darkGreen mt-1 flex-shrink-0 fill-cudeca-darkGreen" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Estado de Socio</p>
                        <p className="text-gray-900 font-bold">{profileData.socio}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleEdit}
                      className="w-full bg-cudeca-mediumGreen text-white font-bold py-3 px-6 rounded-lg hover:bg-cudeca-darkGreen transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-5 h-5" aria-hidden="true" />
                      Editar Perfil
                    </button>
                  </>
                )}
              </div>

              {/* Estadísticas rápidas */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-cudeca-lightGreen rounded-lg">
                    <p className="text-3xl font-bold text-cudeca-darkGreen">{donaciones.length}</p>
                    <p className="text-sm text-gray-700">Donaciones</p>
                  </div>
                  <div className="text-center p-4 bg-cudeca-mediumGreen rounded-lg">
                    <p className="text-3xl font-bold text-white">{totalDonado.toFixed(0)} €</p>
                    <p className="text-sm text-white">Total Donado</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Panel Derecho - Historial de Donaciones */}
          <div className="lg:col-span-3">
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-cudeca-darkGreen" aria-hidden="true" />
                  Mis Donaciones
                </h2>
              </div>

              {/* Tabla de donaciones */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Evento</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Fecha</th>
                      <th className="text-right py-4 px-4 font-bold text-gray-700">Cantidad</th>
                      <th className="text-center py-4 px-4 font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donaciones.map((donacion, index) => (
                      <motion.tr
                        key={donacion.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <td className="py-4 px-4">
                          <p className="font-semibold text-gray-900">{donacion.evento}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {donacion.fecha}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-bold text-cudeca-darkGreen text-lg">
                            {donacion.cantidad.toFixed(2)} €
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">
                            <CheckCircle className="w-4 h-4" aria-hidden="true" />
                            {donacion.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200 bg-cudeca-lightGreen">
                      <td colSpan="2" className="py-4 px-4 font-bold text-gray-900 text-lg">
                        Total Donado
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-cudeca-darkGreen text-2xl">
                        {totalDonado.toFixed(2)} €
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mensaje de agradecimiento */}
              <div className="mt-8 p-6 bg-gradient-to-r from-cudeca-green to-cudeca-mediumGreen rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-3">
                  ¡Gracias por tu apoyo! 🎉
                </h3>
                <p className="text-lg text-white">
                  Tu generosidad ha ayudado a proporcionar cuidados paliativos gratuitos a familias que lo necesitan. 
                  Cada donación cuenta y hace una diferencia real en la vida de las personas.
                </p>
              </div>

              {/* CTA para más eventos */}
              <div className="mt-6 text-center">
                <a
                  href="/eventos"
                  className="inline-block bg-cudeca-darkGreen text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg focus:outline-none focus:ring-4 focus:ring-cudeca-darkGreen focus:ring-offset-2"
                >
                  Ver Próximos Eventos
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
