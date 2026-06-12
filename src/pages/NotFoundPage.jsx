import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container section text-center" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '5rem', color: 'var(--color-primary)', marginBottom: '8px' }}>404</h1>
      <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--color-gray-500)', marginBottom: '24px' }}>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn--primary">
        Back to Home
      </Link>
    </div>
  );
}
