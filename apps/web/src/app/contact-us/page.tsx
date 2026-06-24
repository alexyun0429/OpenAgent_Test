import { ContactDetails } from '@/components/contact-us/ContactDetails';
import { ContactForm } from '@/components/contact-us/ContactForm';

export default function ContactUsPage() {
  return (
    <section className="page-grid two-column">
      <ContactDetails />
      <ContactForm />
    </section>
  );
}