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

      // Guardar el token primero para que las siguientes peticiones lo usen
      localStorage.setItem('cudeca_token', response.token);
      
      console.log('Token guardado, obteniendo datos completos del usuario...');
      
      // Obtener todos los usuarios y buscar el actual por email para tener datos completos
      try {
        const usuarios = await usuariosAPI.getAll();
        console.log('Usuarios obtenidos:', usuarios);
        
        const usuarioCompleto = usuarios.find(u => u.email === email);
        console.log('Usuario completo encontrado:', usuarioCompleto);
        
        if (usuarioCompleto) {
          const userData = {
            id: usuarioCompleto.id,
            username: usuarioCompleto.username || response.username,
            email: usuarioCompleto.email,
            nombre: usuarioCompleto.nombre || response.username,
            telefono: usuarioCompleto.telefono,
            direccion: usuarioCompleto.direccion,
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
      
      // Generar username a partir del email
      const username = userData.email.split('@')[0];
      
      const nuevoUsuario = {
        nombre: userData.nombre + (userData.apellidos ? ' ' + userData.apellidos : ''),
        email: userData.email,
        telefono: userData.telefono || null,
        direccion: userData.direccion || null,
        username: username,
        password: userData.password,
        rol: 'SOCIO'
      };

      console.log('Enviando al backend:', nuevoUsuario);

      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
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

      const usuarioCreado = await response.json();
      console.log('Usuario creado exitosamente:', usuarioCreado);

      const userSession = {
        id: usuarioCreado.id,
        nombre: usuarioCreado.nombre,
        apellidos: '',
        email: usuarioCreado.email,
        esSocio: true,
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
