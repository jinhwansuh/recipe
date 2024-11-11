import { ElementType, HTMLAttributes, ReactNode } from 'react';
import { KeyOf } from '~/types/helper';
import { textVariants } from './Text.css';
import * as S from './Text.css';

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fontStyle?: KeyOf<typeof textVariants>;
  as?: ElementType;
}

export default function Text({
  as,
  fontStyle = 'body',
  children,
  ...props
}: TextProps) {
  const Tag = as || 'div';
  return (
    <Tag as className={S.textVariants[fontStyle]} {...props}>
      {children}
    </Tag>
  );
}
