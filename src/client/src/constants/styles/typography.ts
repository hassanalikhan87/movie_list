import { css } from 'styled-components';
import { FONT, FONT_WEIGHT } from './font';

export const TYPOGRAPHY = {
  h1: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.semiBold};
    letter-spacing: 0em;
    font-size: 64px;
    line-height: 80px;
  `,
  h2: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.semiBold};
    letter-spacing: 0em;
    font-size: 48px;
    line-height: 56px;
  `,
  h3: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.bold};
    letter-spacing: 0em;
    font-size: 32px;
    line-height: 40px;
  `,
  h4: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.bold};
    letter-spacing: 0em;
    font-size: 24px;
    line-height: 32px;
  `,
  h5: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.bold};
    letter-spacing: 0em;
    font-size: 20px;
    line-height: 24px;
  `,
  h6: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.semiBold};
    letter-spacing: 0em;
    font-size: 16px;
    line-height: 24px;
  `,
  bodyLG: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.regular};
    letter-spacing: 0em;
    font-size: 20px;
    line-height: 32px;
  `,
  bodyRG: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.regular};
    letter-spacing: 0em;
    font-size: 16px;
    line-height: 24px;
  `,
  bodySM: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.regular};
    letter-spacing: 0em;
    font-size: 14px;
    line-height: 24px;
  `,
  bodyXS: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.regular};
    letter-spacing: 0em;
    font-size: 12px;
    line-height: 24px;
  `,
  caption: css`
    font-family: ${FONT.stack};
    font-weight: ${FONT_WEIGHT.regular};
    letter-spacing: 0em;
    font-size: 14px;
    line-height: 16px;
  `,
};

export type Typography = keyof typeof TYPOGRAPHY;
