import { ContactDetails } from '@/components/contact-us/ContactDetails';
import { ContactForm } from '@/components/contact-us/ContactForm';

export default function ContactUsPage() {
  return (
    <div>
      <nav style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        🏠 › About Us › <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Contact Us</span>
      </nav>
      <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', lineHeight: 1.1, margin: '0 0 2.5rem' }}>
        Contact us, we love to hear from you
      </h1>
      <div className="page-grid two-column">
        <ContactDetails />
        <ContactForm />
      </div>
    </div>
  );
}
