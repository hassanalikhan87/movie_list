import React from 'react';
import styled, { css } from 'styled-components';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import { COLOR } from '../../constants/styles/color';

interface HeadingProps {
  title: string;
  tag: 'h1' | 'h2';
}

const Heading: React.FC<HeadingProps> = ({ title, tag }) => {
  return <H1 $tag={tag}>{title}</H1>;
};

export default Heading;

const H1 = styled.h1<{ $tag: string }>`
  color: ${COLOR.white};
  ${({ $tag }) =>
    $tag === 'h1'
      ? css`
          ${TYPOGRAPHY.h2}
        `
      : css`
          ${TYPOGRAPHY.h3}
        `}
  ${MEDIA_QUERY.above.desktop} {
    ${({ $tag }) =>
      $tag === 'h1'
        ? css`
            ${TYPOGRAPHY.h1}
          `
        : css`
            ${TYPOGRAPHY.h2}
          `}
  }
`;
