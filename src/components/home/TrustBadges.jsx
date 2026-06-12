import { ShieldCheck, Award, Truck, Leaf } from 'lucide-react';

const badges = [
  {
    icon: <ShieldCheck size={20} />,
    title: '100% Organic & Pure',
    desc: 'Sourced from chemical-free farms',
  },
  {
    icon: <Leaf size={20} />,
    title: 'Zero Additives',
    desc: 'No fillers, chemicals or preservatives',
  },
  {
    icon: <Award size={20} />,
    title: 'Karnataka Sourced',
    desc: 'Support local farming communities',
  },
  {
    icon: <Truck size={20} />,
    title: 'COD & Safe Delivery',
    desc: 'Reliable service straight to your door',
  },
];

export default function TrustBadges() {
  return (
    <section className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {badges.map((badge, idx) => (
            <div key={idx} className="trust-badge" style={{ boxShadow: 'var(--shadow-xs)' }}>
              <div className="trust-badge__icon">
                {badge.icon}
              </div>
              <div>
                <div className="trust-badge__text" style={{ fontWeight: 600 }}>{badge.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-gray-500)', marginTop: '2px' }}>
                  {badge.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
