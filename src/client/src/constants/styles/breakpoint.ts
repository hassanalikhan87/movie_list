export type ValueOfObject<T> = T[keyof T];

export const BREAKPOINT = {
  mobile: 1199,
  desktop: 1200,
} as const;

export type KeyOfBreakpoint = keyof typeof BREAKPOINT;
export type ValueOfBreakpoint = ValueOfObject<typeof BREAKPOINT>;
