import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/perfil');
    } catch (err) {
      setError('Email o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-cudeca-mediumGreen rounded-full flex items-center justify-center">
              <LogIn className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-lg text-gray-600">
            Accede a tu cuenta de Cudeca
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cudeca-mediumGreen focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Botón de login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cudeca-darkGreen text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">¿No tienes cuenta?</span>
            </div>
          </div>

          {/* Link a registro */}
          <Link
            to="/hazte-socio"
            className="w-full bg-white border-2 border-cudeca-mediumGreen text-cudeca-darkGreen font-bold py-3 px-4 rounded-lg hover:bg-cudeca-lightGreen transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Registrarse como Socio
          </Link>

          <p className="mt-4 text-center text-sm text-gray-600">
            Al registrarte, apoyas la labor de Cudeca
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
