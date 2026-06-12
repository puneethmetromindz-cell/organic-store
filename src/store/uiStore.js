import { create } from 'zustand';

const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,

  openMobileMenu: () => {
    set({ isMobileMenuOpen: true });
    document.body.classList.add('menu-open');
  },
  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });
    document.body.classList.remove('menu-open');
  },

  openSearch: () => {
    set({ isSearchOpen: true });
    document.body.classList.add('search-open');
  },
  closeSearch: () => {
    set({ isSearchOpen: false });
    document.body.classList.remove('search-open');
  },

  openCart: () => {
    set({ isCartOpen: true });
    document.body.classList.add('cart-open');
  },
  closeCart: () => {
    set({ isCartOpen: false });
    document.body.classList.remove('cart-open');
  },
}));

export default useUIStore;
