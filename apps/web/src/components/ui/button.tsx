import * as React from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost' | 'danger';
};

const variantClass: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'btn-default',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

export function Button({ className, style, variant = 'default', disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn('btn', variantClass[variant], className)}
      disabled={disabled}
      style={{
        padding: '0.85rem 1.2rem',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...props}
    />
  );
}
