import * as React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        style={{
          width: '100%',
          borderRadius: 18,
          border: '1px solid var(--border)',
          background: 'var(--panel-strong)',
          padding: '0.9rem 1rem',
          fontSize: '1rem',
          color: 'var(--foreground)',
        }}
        {...props}
      />
    );
  },
);