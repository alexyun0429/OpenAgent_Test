import * as React from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost';
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'background: var(--accent); color: white; border-color: transparent;',
  secondary: 'background: var(--panel-strong); color: var(--foreground);',
  ghost: 'background: transparent; color: var(--accent-strong);',
};

export function Button({ className, style, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(className)}
      style={{
        borderRadius: 999,
        border: '1px solid var(--border)',
        padding: '0.85rem 1.2rem',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        ...Object.fromEntries(
          variants[variant]
            .split(';')
            .map((rule) => rule.trim())
            .filter(Boolean)
            .map((rule) => rule.split(':').map((part) => part.trim())),
        ),
        ...style,
      }}
      {...props}
    />
  );
}