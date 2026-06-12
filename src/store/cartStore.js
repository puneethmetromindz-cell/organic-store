import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variation = null) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === product.id && item.variation?.id === variation?.id
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems, isOpen: true };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: variation ? variation.price : product.price,
                salePrice: variation ? variation.sale_price : product.sale_price,
                image: product.images?.[0]?.src || '',
                quantity,
                variation: variation
                  ? { id: variation.id, name: variation.name, weight: variation.weight }
                  : null,
                slug: product.slug,
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (itemId, variationId = null) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === itemId && item.variation?.id === variationId)
          ),
        }));
      },

      updateQuantity: (itemId, variationId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId && item.variation?.id === variationId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, item) => {
          const price = item.salePrice || item.price;
          return sum + parseFloat(price) * item.quantity;
        }, 0),
    }),
    {
      name: 'tridamya-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
