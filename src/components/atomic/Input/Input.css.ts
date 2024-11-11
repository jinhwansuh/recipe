import { style } from '@vanilla-extract/css';

export const Container = style({
  width: '100%',
});

export const Input = style({
  flex: 1,
  border: '1px solid #eee',
  height: '48px',
  width: '100%',
  borderRadius: '8px',
  padding: '8px 12px',

  ':hover': {
    border: '2px solid #aaa',
  },
  ':focus': {
    border: '2px solid #aaa',
  },
});
