import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import MobileMenu from './MobileMenu';
import CartDrawer from './CartDrawer';
import SearchDrawer from './SearchDrawer';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="site-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Sticky Header */}
      <Header />

      {/* Mobile Sidebar Navigation */}
      <MobileMenu />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Drawer */}
      <SearchDrawer />

      {/* Page Content Container */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
