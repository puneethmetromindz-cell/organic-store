import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Are Tridamya wellness powders 100% natural and additive-free?',
    answer: 'Absolutely. We pride ourselves on offering 100% raw, pure herbal powders. There are absolutely no added sugars, preservatives, colorings, artificial flavors, binders, or fillers of any kind. You get 100% pure herbs in every batch.',
  },
  {
    question: 'Where do you source your raw ingredients?',
    answer: 'We source our herbs and crops directly from sustainable, ethical farms located in the rich agricultural regions of Karnataka, India. This supports local farmers and ensures the shortest possible farm-to-packaging timeline for maximum nutritional retention.',
  },
  {
    question: 'How should I consume and store these powders?',
    answer: 'Most of our wellness powders can be taken by mixing 1 teaspoon (approx. 3-5g) with warm water, juice, or smoothies. Storage-wise, keep the powders in their original airtight container (or glass jar) in a cool, dry place away from direct sunlight, heat, and moisture.',
  },
  {
    question: 'Is Cash on Delivery (COD) available for orders?',
    answer: 'Yes, we offer Cash on Delivery (COD) for pin codes across Karnataka, alongside standard secure online payment options. Shipping generally takes between 2 to 4 business days.',
  },
  {
    question: 'Are these powders safe to take alongside medication?',
    answer: 'While our powders are 100% natural foods and traditional herbs, we always recommend consulting with a qualified healthcare professional before starting any new wellness supplement if you are currently taking prescribed medications, are pregnant, or nursing.',
  },
];

function FAQItem({ faq, isOpen, toggleOpen }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-gray-200)',
        padding: '18px 0',
      }}
    >
      <button
        onClick={toggleOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          padding: '8px 0',
          color: 'var(--color-charcoal)',
          fontWeight: 600,
          fontSize: 'var(--text-lg)',
          fontFamily: 'var(--font-body)',
        }}
        aria-expanded={isOpen}
      >
        <span style={{ transition: 'color var(--duration-fast)' }} className="faq-question">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-gray-600)',
                lineHeight: '1.6',
                marginTop: '12px',
                paddingRight: '24px',
              }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section" id="faq-section" style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header">
          <span className="section-header__decorative">Got Questions?</span>
          <h2 className="section-header__title">Frequently Asked Questions</h2>
          <div className="section-header__divider"></div>
        </div>

        <div style={{ marginTop: '30px' }}>
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              toggleOpen={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
