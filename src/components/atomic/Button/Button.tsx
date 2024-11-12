import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as s from './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={s.button} {...props}>
      {children}
    </button>
  );
}
