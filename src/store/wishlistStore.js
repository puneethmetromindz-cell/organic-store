import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.find((item) => item.id === product.id)) {
            return state;
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                salePrice: product.sale_price,
                image: product.images?.[0]?.src || '',
                slug: product.slug,
                category: product.categories?.[0]?.name || '',
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const exists = get().items.find((item) => item.id === product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId) => get().items.some((item) => item.id === productId),

      getItemCount: () => get().items.length,

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'tridamya-wishlist',
    }
  )
);

export default useWishlistStore;
