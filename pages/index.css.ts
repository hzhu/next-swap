import { style } from '@vanilla-extract/css';
import { sprinkles } from '../styles/sprinkles.css';
import { vars } from '../styles/theme.css'

export const exampleStyle = style({
  backgroundColor: vars.color.brand,
  fontFamily: vars.font.body,
  color: 'white',
  padding: 10
});

export const container = sprinkles({
  display: 'flex',
  paddingX: 'large',

  // Conditional sprinkles:
  flexDirection: {
    mobile: 'column',
    desktop: 'row'
  },
  background: {
    lightMode: 'slate-50', // defined in sprinkles.css.ts
    darkMode: 'slate-800'
  }
});
