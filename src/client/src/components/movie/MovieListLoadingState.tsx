import styled from 'styled-components';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
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
