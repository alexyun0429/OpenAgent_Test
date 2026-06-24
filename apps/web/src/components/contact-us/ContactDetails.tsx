import { Mail, MapPin, Phone } from 'lucide-react';

const details = [
  { icon: Mail, label: 'Email', value: 'hello@openagent.local' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 010-2026' },
  { icon: MapPin, label: 'Office', value: '102 Harbor Row, San Francisco, CA' },
];

export function ContactDetails() {
  return (
    <aside className="surface" style={{ borderRadius: 32, padding: '2rem' }}>
      <p style={{ color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Contact desk</p>
      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.25rem)', lineHeight: 1, margin: '0.5rem 0 1rem' }}>
        Start the conversation.
      </h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.8, maxWidth: 480 }}>
        Use this form to capture inbound contact requests, then verify or remove records from the contacts dashboard.
      </p>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {details.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0.75rem 1rem',
              alignItems: 'center',
              padding: '1rem',
              borderRadius: 20,
              background: 'var(--panel-strong)',
              border: '1px solid var(--border)',
            }}
          >
            <Icon size={18} color="var(--accent-strong)" />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {label}
              </div>
              <div>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}