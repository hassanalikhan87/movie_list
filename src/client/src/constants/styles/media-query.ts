import { ValueOfBreakpoint, BREAKPOINT } from './breakpoint';

interface MinMax {
  min?: ValueOfBreakpoint;
  max?: ValueOfBreakpoint;
}

const getMediaQueryByMinMax = ({ min, max }: MinMax): string =>
  min || max
    ? `@media screen ${min ? `and (min-width: ${min}px)` : ''}${
        max ? ` and (max-width: ${max - 1}px)` : ''
      }`
    : '';

// MEDIA_QUERY
export const MEDIA_QUERY = {
  below: {
    mobile: getMediaQueryByMinMax({ max: BREAKPOINT.mobile }),
    desktop: getMediaQueryByMinMax({ max: BREAKPOINT.desktop }),
  },
  above: {
    mobile: getMediaQueryByMinMax({ min: BREAKPOINT.mobile }),
    desktop: getMediaQueryByMinMax({ min: BREAKPOINT.desktop }),
  },
};
