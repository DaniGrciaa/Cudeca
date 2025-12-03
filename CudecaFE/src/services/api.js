// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// API Client con configuración básica
const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return response.ok;
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
};

// Compras API
export const comprasAPI = {
  getAll: () => apiClient.get('/compras'),
  getById: (id) => apiClient.get(`/compras/${id}`),
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
