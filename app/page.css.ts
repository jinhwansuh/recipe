import { style } from '@vanilla-extract/css';

export const HeaderContainer = style({
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const HeaderWrapper = style({
  display: 'flex',
  gap: '8px',
});
