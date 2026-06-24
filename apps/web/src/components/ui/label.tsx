import * as React from 'react';

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.4rem' }} {...props} />;
}