import { style } from '@vanilla-extract/css';

export const button = style({
  padding: '8px 16px',
  background: '#eee',
  borderRadius: 8,

  ':hover': {
    background: '#bbb',
  },
});
