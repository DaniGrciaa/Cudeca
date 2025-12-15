// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Obtener token del localStorage
const getAuthToken = () => {
  return localStorage.getItem('cudeca_token');
};

// Obtener refresh token del localStorage
const getRefreshToken = () => {
  return localStorage.getItem('cudeca_refresh_token');
};

// Variable para evitar múltiples intentos de refresh simultáneos
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Función para refrescar el token
const refreshAuthToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  
  // Guardar los nuevos tokens
  localStorage.setItem('cudeca_token', data.token);
  localStorage.setItem('cudeca_refresh_token', data.refreshToken);
  
  // Actualizar también los datos del usuario si vienen
  if (data.username && data.email) {
    const savedUser = localStorage.getItem('cudeca_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const updatedUser = {
        ...user,
        username: data.username,
        email: data.email,
        rol: data.rol,
      };
      localStorage.setItem('cudeca_user', JSON.stringify(updatedUser));
    }
  }
  
  return data.token;
};

// Función auxiliar para hacer peticiones con manejo de refresh token
const fetchWithAuth = async (url, options) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // Si recibimos 401, intentar refrescar el token
  if (response.status === 401 && !options._retry) {
    if (isRefreshing) {
      // Si ya hay un refresh en proceso, esperar a que termine
      try {
        const token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        headers['Authorization'] = `Bearer ${token}`;
        return fetch(url, {
          ...options,
          headers,
        });
      } catch (err) {
        throw err;
      }
    }

    isRefreshing = true;

    try {
      const newToken = await refreshAuthToken();
      isRefreshing = false;
      processQueue(null, newToken);

      // Reintentar la petición original con el nuevo token
      headers['Authorization'] = `Bearer ${newToken}`;
      return fetch(url, {
        ...options,
        headers,
        _retry: true,
      });
    } catch (error) {
      isRefreshing = false;
      processQueue(error, null);
      
      // Si falla el refresh, limpiar todo y redirigir al login
      localStorage.removeItem('cudeca_token');
      localStorage.removeItem('cudeca_refresh_token');
      localStorage.removeItem('cudeca_user');
      window.location.href = '/login';
      
      throw error;
    }
  }

  return response;
};

// API Client con configuración básica
const apiClient = {
  get: async (endpoint) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.ok;
  },
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },
};

// Eventos API
export const eventosAPI = {
  getAll: () => apiClient.get('/eventos'),
  getById: (id) => apiClient.get(`/eventos/${id}`),
  create: (data) => apiClient.post('/eventos', data),
  update: (id, data) => apiClient.put(`/eventos/${id}`, data),
  delete: (id) => apiClient.delete(`/eventos/${id}`),
  filter: (filters) => apiClient.post('/eventos/filter', filters),
};

// Usuarios API
export const usuariosAPI = {
  getAll: () => apiClient.get('/usuarios'),
  getById: (id) => apiClient.get(`/usuarios/${id}`),
  create: (data) => apiClient.post('/usuarios', data),
  update: (id, data) => apiClient.put(`/usuarios/${id}`, data),
  delete: (id) => apiClient.delete(`/usuarios/${id}`),
  incrementarDonacion: async (id, cantidad) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/usuarios/${id}/donar?cantidad=${cantidad}`, {
      method: 'PATCH',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },
};

// Compras API
export const comprasAPI = {
  getAll: () => apiClient.get('/compras'),
  getById: (id) => apiClient.get(`/compras/${id}`),
  getByUsuarioId: (usuarioId) => apiClient.get(`/compras/usuario/${usuarioId}`),
  create: (data) => apiClient.post('/compras', data),
  update: (id, data) => apiClient.put(`/compras/${id}`, data),
  delete: (id) => apiClient.delete(`/compras/${id}`),
};

// Entradas API
export const entradasAPI = {
  getAll: () => apiClient.get('/entradas'),
  getById: (id) => apiClient.get(`/entradas/${id}`),
  getByEvento: (eventoId) => apiClient.get(`/entradas/evento/${eventoId}`),
  create: (data) => apiClient.post('/entradas', data),
  update: (id, data) => apiClient.put(`/entradas/${id}`, data),
  delete: (id) => apiClient.delete(`/entradas/${id}`),
};

// Rifas API
export const rifasAPI = {
  getAll: () => apiClient.get('/rifas'),
  getById: (id) => apiClient.get(`/rifas/${id}`),
  create: (data) => apiClient.post('/rifas', data),
  update: (id, data) => apiClient.put(`/rifas/${id}`, data),
  delete: (id) => apiClient.delete(`/rifas/${id}`),
};

// Patrocinadores API
export const patrocinadoresAPI = {
  getAll: () => apiClient.get('/patrocinadores'),
  getById: (id) => apiClient.get(`/patrocinadores/${id}`),
  create: (data) => apiClient.post('/patrocinadores', data),
  update: (id, data) => apiClient.put(`/patrocinadores/${id}`, data),
  delete: (id) => apiClient.delete(`/patrocinadores/${id}`),
};

// Facturas API
export const facturasAPI = {
  getAll: () => apiClient.get('/facturas'),
  getById: (id) => apiClient.get(`/facturas/${id}`),
  create: (data) => apiClient.post('/facturas', data),
  update: (id, data) => apiClient.put(`/facturas/${id}`, data),
  delete: (id) => apiClient.delete(`/facturas/${id}`),
};

export default apiClient;
