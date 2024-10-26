import styled from 'styled-components';
import { COLOR } from '../../constants/styles/color';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import { SIZE } from '../../constants/styles/size';
import { SPACING } from '../../constants/styles/spacing';
import MovieCardSkeleton from '../common/MovieCardSkeleton';

const MovieListLoadingState = () => {
  return (
    <GridContainer>
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
    </GridContainer>
  );
};

export default MovieListLoadingState;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${SIZE.maxContentWidth.extraLargeDesktop};
  background-color: ${COLOR.background};
  padding: 0 ${SPACING.s6};
  ${MEDIA_QUERY.above.desktop} {
    padding: ${SPACING.s12} 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  ${MEDIA_QUERY.above.desktop} {
    grid-template-columns: repeat(12, 1fr);
    margin: 0 ${SPACING.s12};
  }
`;
