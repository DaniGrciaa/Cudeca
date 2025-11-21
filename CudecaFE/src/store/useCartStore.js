import { create } from 'zustand';

const useCartStore = create((set) => ({
  // Estado del carrito
  items: [],
  extraDonation: 0,
  isFilaCero: false,
  
  // Agregar evento al carrito
  addItem: (event, quantity = 1) => set((state) => {
    const existingItem = state.items.find(item => item.id === event.id);
    
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    }
    
    return {
      items: [...state.items, { ...event, quantity }]
    };
  }),
  
  // Actualizar cantidad de un item
  updateQuantity: (eventId, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === eventId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ).filter(item => item.quantity > 0)
  })),
  
  // Eliminar item del carrito
  removeItem: (eventId) => set((state) => ({
    items: state.items.filter(item => item.id !== eventId)
  })),
  
  // Establecer donación extra
  setExtraDonation: (amount) => set({ extraDonation: amount }),
  
  // Toggle fila cero
  toggleFilaCero: () => set((state) => ({ isFilaCero: !state.isFilaCero })),
  
  // Limpiar carrito
  clearCart: () => set({ items: [], extraDonation: 0, isFilaCero: false }),
  
  // Calcular total
  getTotal: () => {
    const state = useCartStore.getState();
    const itemsTotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return itemsTotal + state.extraDonation;
  },
  
  // Obtener cantidad de items
  getItemCount: () => {
    const state = useCartStore.getState();
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));

export default useCartStore;
