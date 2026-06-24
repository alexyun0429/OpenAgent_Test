import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <section className="surface" style={{ borderRadius: 32, padding: '3rem' }}>
      <p style={{ color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Message received
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', margin: '0.5rem 0 1rem' }}>Thank you.</h1>
      <p style={{ maxWidth: 620, color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
        Your contact request has been recorded. You can return to the form or review captured submissions in the contacts view.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <Link href="/contact-us">Submit another request</Link>
        <Link href="/contacts">View contacts</Link>
      </div>
    </section>
  );
}