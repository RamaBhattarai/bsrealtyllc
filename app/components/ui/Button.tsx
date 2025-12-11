import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  asChild = false,
  size = 'default',
  variant = 'default',
  className = '',
  href,
  onClick,
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-2',
    default: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2',
  };

  const variantClasses = {
    default: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 transition-colors',
    ghost: 'text-green-600 hover:bg-green-50 transition-colors',
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (asChild && href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};
