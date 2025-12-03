import { createContext, useContext, useState, useEffect } from 'react';
import { usuariosAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('cudeca_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Obtener todos los usuarios y buscar por email
      const usuarios = await usuariosAPI.getAll();
      const usuario = usuarios.find(u => u.email === email);
      
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Por ahora no validamos contraseña (implementación básica)
      // En producción debería validarse en el backend
      
      const userData = {
        id: usuario.id,
        nombre: usuario.nombre,
        apellidos: '',
        email: usuario.email,
        esSocio: true,
      };

      setUser(userData);
      localStorage.setItem('cudeca_user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
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
