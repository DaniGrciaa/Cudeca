// ==========================================
// EJEMPLO 1: Botón de Login con Google
// ==========================================

// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login tradicional con email y password
  const handleTraditionalLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar tokens
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Redirigir al dashboard
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Login con Google - redirige al endpoint OAuth2 de Spring Boot
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar Sesión</h1>

        {error && <div className="error-message">{error}</div>}

        {/* Login tradicional */}
        <form onSubmit={handleTraditionalLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Separador */}
        <div className="separator">
          <span>O continuar con</span>
        </div>

        {/* Login con Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn-google"
          type="button"
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>

        {/* Link a registro */}
        <div className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


// ==========================================
// EJEMPLO 2: OAuth2RedirectHandler
// ==========================================

// OAuth2RedirectHandler.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    // Extraer tokens de la URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    console.log('OAuth2 Redirect - Token:', token ? 'Recibido' : 'No recibido');
    console.log('OAuth2 Redirect - RefreshToken:', refreshToken ? 'Recibido' : 'No recibido');

    if (token && refreshToken) {
      // Guardar tokens en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      setStatus('success');

      // Esperar 1 segundo antes de redirigir
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      // Error en la autenticación
      setStatus('error');
      setTimeout(() => {
        navigate('/login?error=oauth2_failed');
      }, 2000);
    }
  }, [location, navigate]);

  return (
    <div style={styles.container}>
      {status === 'processing' && (
        <>
          <div style={styles.spinner}></div>
          <p style={styles.text}>Procesando autenticación con Google...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div style={styles.successIcon}>✓</div>
          <p style={styles.text}>¡Autenticación exitosa! Redirigiendo...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <div style={styles.errorIcon}>✗</div>
          <p style={styles.text}>Error en la autenticación. Redirigiendo al login...</p>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #4285F4',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
  text: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#333',
  },
  successIcon: {
    fontSize: '60px',
    color: '#34A853',
  },
  errorIcon: {
    fontSize: '60px',
    color: '#EA4335',
  },
};

export default OAuth2RedirectHandler;


// ==========================================
// EJEMPLO 3: App.jsx con rutas configuradas
// ==========================================

// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// ==========================================
// EJEMPLO 4: ProtectedRoute Component
// ==========================================

// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, mostrar el componente hijo
  return children;
}

export default ProtectedRoute;


// ==========================================
// EJEMPLO 5: CSS para LoginPage
// ==========================================

/* LoginPage.css */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.separator {
  margin: 30px 0;
  text-align: center;
  position: relative;
}

.separator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
}

.separator span {
  background: white;
  padding: 0 15px;
  color: #888;
  font-size: 14px;
  position: relative;
}

.btn-google {
  width: 100%;
  padding: 12px;
  background: white;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-google:hover {
  background: #f8f9fa;
  border-color: #4285F4;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
}

.google-icon {
  width: 20px;
  height: 20px;
}

.register-link {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
}

/* Animación del spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


// ==========================================
// EJEMPLO 6: Servicio de API para reutilizar
// ==========================================

// services/authService.js
const API_BASE_URL = 'http://localhost:8080/api';

export const authService = {
  // Login tradicional
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al iniciar sesión');
    }

    return response.json();
  },

  // Registro
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al registrarse');
    }

    return response.json();
  },

  // Refrescar token
  refreshToken: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Error al refrescar token');
    }

    return response.json();
  },

  // Iniciar login con Google
  loginWithGoogle: () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  },
};


// ==========================================
// EJEMPLO 7: Interceptor Axios (opcional)
// ==========================================

// services/axios.js
import axios from 'axios';
import { authService } from './authService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró, intentar refrescarlo
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await authService.refreshToken(refreshToken);

        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);

        // Reintentar la petición original
        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, logout
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

