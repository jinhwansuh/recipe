import { InputHTMLAttributes } from 'react';
import * as S from './Input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: InputProps) {
  return (
    <div className={S.Container}>
      <input className={S.Input} {...props}></input>
    </div>
  );
}
