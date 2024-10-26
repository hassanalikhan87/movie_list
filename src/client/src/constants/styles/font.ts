export const FONT = {
  stack: '"Montserrat", ui-sans-serif',
} as const;

export const FONT_WEIGHT = {
  bold: '700',
  semiBold: '600',
  regular: '400',
} as const;

export type FontWeight = keyof typeof FONT_WEIGHT;
