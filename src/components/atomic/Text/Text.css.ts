import { styleVariants } from '@vanilla-extract/css';

export const textVariants = styleVariants({
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: '600',
  },
  body: {
    fontSize: '16px',
    fontWeight: '400',
  },
  caption: {
    fontSize: '12px',
    fontWeight: '300',
  },
  small: {
    fontSize: '10px',
    fontWeight: '300',
  },
});
