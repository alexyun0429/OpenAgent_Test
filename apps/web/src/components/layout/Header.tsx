import Link from 'next/link';

export function Header() {
  return (
    <header style={{ padding: '1.25rem 0' }}>
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/contact-us" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.08em' }}>
          OPENAGENT
        </Link>
        <nav style={{ display: 'flex', gap: '1rem', color: 'var(--muted)' }}>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/contacts">Contacts</Link>
        </nav>
      </main>
    </header>
  );
}