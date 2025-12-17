// ========================================
// EJEMPLOS DE INTEGRACIÓN FRONTEND
// Sistema de Compra de Eventos - CudecaBE
// ========================================

// ========================================
// 1. SERVICIOS/API (React/Vue/Angular)
// ========================================

const API_BASE_URL = 'http://localhost:8080/api';

// Helper para obtener el token
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

// ========================================
// SERVICIO: CompraEventoService
// ========================================

class CompraEventoService {

  /**
   * Comprar un evento
   */
  static async comprarEvento(eventoId, cantidadEntradas, precioTotal, metodoPago = 'TARJETA') {
    const response = await fetch(`${API_BASE_URL}/compras-eventos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        eventoId,
        cantidadEntradas,
        precioTotal,
        metodoPago,
        codigoTransaccion: `TXN-${Date.now()}`
      })
    });

    if (!response.ok) {
      throw new Error('Error al comprar el evento');
    }

    return await response.json();
  }

  /**
   * Obtener eventos comprados por el usuario actual
   */
  static async getMisEventos() {
    const response = await fetch(`${API_BASE_URL}/compras-eventos/mis-eventos`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Error al obtener eventos');
    }

    return await response.json();
  }

  /**
   * Obtener compras completas del usuario
   */
  static async getMisCompras() {
    const response = await fetch(`${API_BASE_URL}/compras-eventos/mis-compras`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Error al obtener compras');
    }

    return await response.json();
  }

  /**
   * Verificar si ya compré un evento
   */
  static async yaCompreEvento(eventoId) {
    const response = await fetch(
      `${API_BASE_URL}/compras-eventos/verificar/evento/${eventoId}`,
      { headers: getAuthHeaders() }
    );

    if (!response.ok) {
      throw new Error('Error al verificar compra');
    }

    const data = await response.json();
    return data.yaCompro;
  }

  /**
   * Contar total de eventos comprados
   */
  static async countMisEventos() {
    const response = await fetch(`${API_BASE_URL}/compras-eventos/mis-eventos/count`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Error al contar eventos');
    }

    const data = await response.json();
    return data.totalEventosComprados;
  }

  /**
   * Cancelar una compra
   */
  static async cancelarCompra(compraId) {
    const response = await fetch(
      `${API_BASE_URL}/compras-eventos/${compraId}/cancelar`,
      {
        method: 'POST',
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) {
      throw new Error('Error al cancelar compra');
    }

    return await response.json();
  }
}

// ========================================
// 2. COMPONENTES REACT
// ========================================

// ---------------------------------------
// Componente: Lista de Eventos Comprados
// ---------------------------------------
import React, { useState, useEffect } from 'react';

function MisEventosComprados() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      setLoading(true);
      const data = await CompraEventoService.getMisEventos();
      setEventos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (compraId) => {
    if (window.confirm('¿Estás seguro de cancelar esta compra?')) {
      try {
        await CompraEventoService.cancelarCompra(compraId);
        alert('Compra cancelada exitosamente');
        cargarEventos(); // Recargar lista
      } catch (err) {
        alert('Error al cancelar: ' + err.message);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mis-eventos-comprados">
      <h2>Mis Eventos Comprados</h2>

      {eventos.length === 0 ? (
        <p>No has comprado ningún evento todavía.</p>
      ) : (
        <div className="eventos-grid">
          {eventos.map(evento => (
            <div key={evento.compraId} className="evento-card">
              <h3>{evento.eventoNombre}</h3>
              <div className="evento-info">
                <p><strong>📅 Fecha:</strong> {evento.eventoFecha}</p>
                <p><strong>📍 Lugar:</strong> {evento.eventoLugar}</p>
                <p><strong>🎫 Entradas:</strong> {evento.cantidadEntradas}</p>
                <p><strong>💰 Total:</strong> €{evento.precioTotal}</p>
                <p><strong>💳 Pago:</strong> {evento.metodoPago}</p>
                <p><strong>📋 Estado:</strong>
                  <span className={`estado ${evento.estado.toLowerCase()}`}>
                    {evento.estado}
                  </span>
                </p>
                <p><strong>🔑 Código:</strong> {evento.codigoTransaccion}</p>
              </div>

              {evento.estado === 'COMPLETADO' && (
                <button
                  onClick={() => handleCancelar(evento.compraId)}
                  className="btn-cancelar"
                >
                  Cancelar Compra
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------
// Componente: Botón de Compra de Evento
// ---------------------------------------
function BotonComprarEvento({ evento }) {
  const [yaCompro, setYaCompro] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    verificarCompra();
  }, [evento.id]);

  const verificarCompra = async () => {
    try {
      const comprado = await CompraEventoService.yaCompreEvento(evento.id);
      setYaCompro(comprado);
    } catch (err) {
      console.error('Error al verificar:', err);
    }
  };

  const handleComprar = async () => {
    try {
      setLoading(true);
      await CompraEventoService.comprarEvento(
        evento.id,
        1, // cantidad de entradas
        evento.precio,
        'TARJETA'
      );
      alert('¡Compra realizada exitosamente!');
      setYaCompro(true);
    } catch (err) {
      alert('Error al comprar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (yaCompro) {
    return (
      <button className="btn-comprado" disabled>
        ✅ Ya Comprado
      </button>
    );
  }

  return (
    <button
      className="btn-comprar"
      onClick={handleComprar}
      disabled={loading}
    >
      {loading ? 'Procesando...' : `Comprar - €${evento.precio}`}
    </button>
  );
}

// ---------------------------------------
// Componente: Modal de Compra
// ---------------------------------------
function ModalCompraEvento({ evento, onClose, onSuccess }) {
  const [cantidad, setCantidad] = useState(1);
  const [metodoPago, setMetodoPago] = useState('TARJETA');
  const [loading, setLoading] = useState(false);

  const precioTotal = evento.precio * cantidad;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await CompraEventoService.comprarEvento(
        evento.id,
        cantidad,
        precioTotal,
        metodoPago
      );

      alert('¡Compra realizada exitosamente!');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>Comprar Evento</h2>
        <h3>{evento.nombre}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cantidad de Entradas:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Método de Pago:</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="TARJETA">Tarjeta de Crédito</option>
              <option value="PAYPAL">PayPal</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="BIZUM">Bizum</option>
            </select>
          </div>

          <div className="total-section">
            <p>Precio por entrada: €{evento.precio}</p>
            <p><strong>Total a pagar: €{precioTotal}</strong></p>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ========================================
// 3. HOOKS PERSONALIZADOS
// ========================================

// Hook para manejar eventos comprados
function useMisEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CompraEventoService.getMisEventos();
      setEventos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { eventos, loading, error, recargar: cargar };
}

// Hook para verificar si ya compró un evento
function useYaComproEvento(eventoId) {
  const [yaCompro, setYaCompro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventoId) {
      CompraEventoService.yaCompreEvento(eventoId)
        .then(setYaCompro)
        .finally(() => setLoading(false));
    }
  }, [eventoId]);

  return { yaCompro, loading };
}

// ========================================
// 4. EJEMPLO DE USO CON VUEX (Vue.js)
// ========================================

// store/modules/compraEventos.js
const state = {
  misEventos: [],
  loading: false,
  error: null
};

const mutations = {
  SET_MIS_EVENTOS(state, eventos) {
    state.misEventos = eventos;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async cargarMisEventos({ commit }) {
    commit('SET_LOADING', true);
    try {
      const eventos = await CompraEventoService.getMisEventos();
      commit('SET_MIS_EVENTOS', eventos);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async comprarEvento({ dispatch }, { eventoId, cantidad, precio, metodoPago }) {
    const compra = await CompraEventoService.comprarEvento(
      eventoId,
      cantidad,
      precio,
      metodoPago
    );
    await dispatch('cargarMisEventos'); // Recargar lista
    return compra;
  }
};

const getters = {
  eventosCompletados: (state) =>
    state.misEventos.filter(e => e.estado === 'COMPLETADO'),

  eventosPendientes: (state) =>
    state.misEventos.filter(e => e.estado === 'PENDIENTE'),

  totalGastado: (state) =>
    state.misEventos.reduce((total, e) => total + e.precioTotal, 0)
};

// ========================================
// 5. CSS DE EJEMPLO
// ========================================

const estilosCSS = `
.eventos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.evento-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.evento-card h3 {
  margin-top: 0;
  color: #333;
}

.evento-info p {
  margin: 8px 0;
  color: #666;
}

.estado {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.estado.completado {
  background: #d4edda;
  color: #155724;
}

.estado.pendiente {
  background: #fff3cd;
  color: #856404;
}

.estado.cancelado {
  background: #f8d7da;
  color: #721c24;
}

.btn-comprar {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-comprar:hover {
  background: #218838;
}

.btn-comprar:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.btn-comprado {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: not-allowed;
}

.btn-cancelar {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-cancelar:hover {
  background: #c82333;
}
`;

// ========================================
// 6. EJEMPLO DE TESTS
// ========================================

// test/CompraEventoService.test.js
describe('CompraEventoService', () => {

  test('debe comprar un evento correctamente', async () => {
    const compra = await CompraEventoService.comprarEvento(1, 2, 50.00, 'TARJETA');

    expect(compra).toBeDefined();
    expect(compra.eventoId).toBe(1);
    expect(compra.cantidadEntradas).toBe(2);
    expect(compra.precioTotal).toBe(50.00);
  });

  test('debe obtener eventos comprados', async () => {
    const eventos = await CompraEventoService.getMisEventos();

    expect(Array.isArray(eventos)).toBe(true);
  });

  test('debe verificar si ya compró un evento', async () => {
    const yaCompro = await CompraEventoService.yaCompreEvento(1);

    expect(typeof yaCompro).toBe('boolean');
  });
});

export {
  CompraEventoService,
  MisEventosComprados,
  BotonComprarEvento,
  ModalCompraEvento,
  useMisEventos,
  useYaComproEvento
};

