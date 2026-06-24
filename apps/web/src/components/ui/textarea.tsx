import * as React from 'react';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea(props, ref) {
    return (
      <textarea
        ref={ref}
        style={{
          width: '100%',
          borderRadius: 20,
          border: '1px solid var(--border)',
          background: 'var(--panel-strong)',
          padding: '1rem',
          fontSize: '1rem',
          color: 'var(--foreground)',
          resize: 'vertical',
        }}
        {...props}
      />
    );
  },
);