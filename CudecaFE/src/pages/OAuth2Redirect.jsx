import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('processing'); // processing, success, error

  useEffect(() => {
    // Extraer tokens y parámetros de la URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const profileCompleted = params.get('profileCompleted') === 'true';
    const isNewUser = params.get('isNewUser') === 'true';

    console.log('OAuth2 Redirect - Token:', token ? 'Recibido' : 'No recibido');
    console.log('OAuth2 Redirect - RefreshToken:', refreshToken ? 'Recibido' : 'No recibido');
    console.log('OAuth2 Redirect - profileCompleted:', profileCompleted);
    console.log('OAuth2 Redirect - isNewUser:', isNewUser);

    if (token && refreshToken) {
      try {
        // Guardar tokens en localStorage
        localStorage.setItem('cudeca_token', token);
        localStorage.setItem('cudeca_refresh_token', refreshToken);

        // Decodificar el payload del JWT para obtener información del usuario
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        console.log('Payload del token:', payload);
        
        // Crear objeto de usuario
        const userData = {
          username: payload.sub,
          email: payload.sub,
          nombre: payload.nombre || payload.sub.split('@')[0],
          rol: payload.roles && payload.roles[0] ? payload.roles[0] : 'USER',
          esSocio: payload.roles && payload.roles.includes('SOCIO'),
        };
        
        localStorage.setItem('cudeca_user', JSON.stringify(userData));

        console.log('Usuario guardado:', userData);

        setStatus('success');
        
        // Redirigir según el estado del perfil
        setTimeout(() => {
          if (!profileCompleted) {
            console.log('OAuth2 Redirect - Perfil incompleto, redirigiendo a complete-profile');
            navigate('/complete-profile');
          } else {
            console.log('OAuth2 Redirect - Perfil completo, redirigiendo a perfil');
            navigate('/perfil');
          }
        }, 1000);

      } catch (error) {
        console.error('Error procesando tokens OAuth2:', error);
        setStatus('error');
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } else {
      console.error('Tokens no encontrados en la URL');
      setStatus('error');
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {status === 'processing' && (
          <>
            <Loader className="w-16 h-16 text-cudeca-mediumGreen mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Procesando autenticación...
            </h2>
            <p className="text-gray-600">
              Por favor, espera un momento
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Autenticación exitosa!
            </h2>
            <p className="text-gray-600">
              Redirigiendo...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error al iniciar sesión
            </h2>
            <p className="text-gray-600">
              Hubo un problema con la autenticación. Redirigiendo al login...
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OAuth2Redirect;
