import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold focus:outline-none';
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary hover:bg-primary-dark text-white'
      : 'bg-secondary hover:bg-secondary-dark text-white';

  return (
    <button className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
