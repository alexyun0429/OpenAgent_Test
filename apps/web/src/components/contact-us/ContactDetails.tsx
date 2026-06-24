import type { CSSProperties } from 'react';

const subheading: CSSProperties = {
  fontSize: '1.05rem',
  fontWeight: 700,
  textDecoration: 'underline',
  margin: '1.75rem 0 0.75rem',
};

export function ContactDetails() {
  return (
    <div style={{ lineHeight: 1.7, maxWidth: 520 }}>
      <p style={{ marginTop: 0 }}>
        Welcome to OpenAgent. We&apos;ve been around since 2013, and our vision is to make it easy for people to buy,
        sell and own property.
      </p>
      <p>Here are the different ways you can contact us.</p>

      <h2 style={subheading}>Contact Us Details</h2>
      <p style={{ margin: 0 }}>
        <strong>Phone:</strong> 13 24 34
        <br />
        <strong>Email:</strong> support@openagent.com.au
      </p>
      <p>
        For media enquiries, please visit our{' '}
        <a href="#" style={{ color: 'var(--accent)' }}>
          Media and Press
        </a>{' '}
        page.
      </p>

      <h2 style={subheading}>Postal Address</h2>
      <p style={{ margin: 0 }}>PO Box 419, Alexandria NSW 1435</p>

      <h2 style={subheading}>Contact Centre Hours of Operation</h2>
      <p style={{ margin: 0 }}>Monday – Friday 8:30 – 5:00</p>
    </div>
  );
}
