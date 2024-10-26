import styled, { keyframes } from 'styled-components';
import { COLOR } from '../../constants/styles/color';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const MovieCardSkeleton = styled.div`
  grid-column: span 3;
  width: 100%;
  height: 50vh;
  background-color: ${COLOR.card};
  background-image: linear-gradient(
    90deg,
    ${COLOR.card} 0%,
    rgba(255, 255, 255, 0.2) 50%,
    ${COLOR.card} 100%
  );
  background-size: 200% 100%;
  border-radius: 12px;
  animation: ${shimmer} 1.6s infinite ease-in-out;
  position: relative;
  overflow: hidden;
`;

export default MovieCardSkeleton;
