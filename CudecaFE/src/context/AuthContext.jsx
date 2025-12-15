import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, usuariosAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token y usuario guardados en localStorage
    const savedUser = localStorage.getItem('cudeca_user');
    const savedToken = localStorage.getItem('cudeca_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Llamar al endpoint de autenticación
      const response = await authAPI.login(email, password);
      
      if (!response.token) {
        throw new Error('Token no recibido del servidor');
      }

      // Guardar el token y refresh token primero para que las siguientes peticiones lo usen
      localStorage.setItem('cudeca_token', response.token);
      if (response.refreshToken) {
        localStorage.setItem('cudeca_refresh_token', response.refreshToken);
      }
      
      console.log('Tokens guardados, obteniendo datos completos del usuario...');
      
      // Obtener todos los usuarios y buscar el actual por email para tener datos completos
      try {
        const usuarios = await usuariosAPI.getAll();
        console.log('Usuarios obtenidos:', usuarios);
        
        const usuarioCompleto = usuarios.find(u => u.email === email);
        console.log('Usuario completo encontrado:', usuarioCompleto);
        
        if (usuarioCompleto) {
          // Obtener la primera dirección si existe
          const primeraDir = usuarioCompleto.direcciones && usuarioCompleto.direcciones.length > 0 
            ? usuarioCompleto.direcciones[0] 
            : null;
          
          const userData = {
            id: usuarioCompleto.id,
            username: usuarioCompleto.username || response.username,
            email: usuarioCompleto.email,
            nombre: usuarioCompleto.nombre || response.username,
            telefono: usuarioCompleto.telefono,
            direccion: primeraDir ? {
              calle: primeraDir.calle,
              ciudad: primeraDir.ciudad,
              codigoPostal: primeraDir.codigoPostal,
              pais: primeraDir.pais
            } : null,
            rol: response.rol,
            esSocio: response.rol === 'SOCIO',
          };
          
          setUser(userData);
          localStorage.setItem('cudeca_user', JSON.stringify(userData));
          
          console.log('Login exitoso con datos completos:', userData);
          return userData;
        }
      } catch (err) {
        console.error('Error al obtener datos completos del usuario:', err);
      }
      
      // Si falla la obtención de datos completos, usar solo los del login
      const userData = {
        username: response.username,
        email: response.email,
        nombre: response.username || email.split('@')[0],
        rol: response.rol,
        esSocio: response.rol === 'SOCIO',
      };

      setUser(userData);
      localStorage.setItem('cudeca_user', JSON.stringify(userData));
      
      console.log('Login exitoso con datos básicos:', userData);
      
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Email o contraseña incorrectos');
    }
  };

  const register = async (userData) => {
    try {
      console.log('Registrando usuario con datos:', userData);

      // Usar el endpoint de usuarios para registro local
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error del servidor:', errorData);
        
        if (response.status === 400) {
          throw new Error('Datos inválidos. Verifica que todos los campos estén correctos.');
        } else if (response.status === 409) {
          throw new Error('El email ya está registrado. Por favor, usa otro email.');
        } else {
          throw new Error(`Error al registrar usuario: ${response.status}`);
        }
      }

      const responseData = await response.json();
      console.log('Usuario registrado exitosamente:', responseData);
      
      // El endpoint /api/usuarios no devuelve tokens, hacer login después del registro
      const loginResponse = await authAPI.login(userData.email, userData.password);
      
      // Guardar los tokens del login
      if (loginResponse.token) {
        localStorage.setItem('cudeca_token', loginResponse.token);
      }
      if (loginResponse.refreshToken) {
        localStorage.setItem('cudeca_refresh_token', loginResponse.refreshToken);
      }

      // Crear sesión de usuario
      const userSession = {
        id: responseData.id,
        username: loginResponse.username,
        email: responseData.email,
        nombre: responseData.nombre,
        telefono: responseData.telefono,
        rol: loginResponse.rol,
        esSocio: loginResponse.rol === 'SOCIO',
      };

      setUser(userSession);
      localStorage.setItem('cudeca_user', JSON.stringify(userSession));

      return userSession;
    } catch (error) {
      console.error('Error completo en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cudeca_user');
    localStorage.removeItem('cudeca_token');
    localStorage.removeItem('cudeca_refresh_token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
