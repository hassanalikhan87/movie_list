import React from 'react';
import MovieCard from '../common/MovieCard';
import styled from 'styled-components';
import { COLOR } from '../../constants/styles/color';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import { SPACING } from '../../constants/styles/spacing';
import { iconByName } from '../icons/Index';
import { useNavigate } from 'react-router-dom';
import Heading from '../common/MainHeading';
import { SIZE } from '../../constants/styles/size';
import useFetchMovies from '../../helpers/hooks/useFetchMovies';
import PaginationComponent from '../common/Pagination';
import NoMoviesToShow from './NoMoviestoShow';
import MovieListLoadingState from './MovieListLoadingState';

const MovieList: React.FC = () => {
  const { movies, error, currentPage, totalPages, loading, handlePageChange } =
    useFetchMovies();
  const navigate = useNavigate();

  const PlusIcon = iconByName['plusInCircle'];
  const LogoutIcon = iconByName['logout'];

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  const handleAddMovie = () => {
    navigate('/add');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!loading && movies.length === 0) {
    return <NoMoviesToShow />;
  }

  return (
    <Wrapper>
      <HeadingSection>
        <LeftSide>
          <Heading tag="h2" title="My movies " />
          <PlusButton onClick={handleAddMovie}>
            <PlusIcon />
          </PlusButton>
        </LeftSide>
        <LogoutButton onClick={handleLogout}>
          <span>Logout</span>
          <LogoutIcon />
        </LogoutButton>
      </HeadingSection>
      {loading ? (
        <MovieListLoadingState />
      ) : (
        <GridContainer>
          {movies.map((movie) => (
            <MovieCard key={movie._id} {...movie} />
          ))}
        </GridContainer>
      )}

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Wrapper>
  );
};

export default MovieList;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${SIZE.maxContentWidth.extraLargeDesktop};
  background-color: ${COLOR.background};
  padding: 0 ${SPACING.s6};
  ${MEDIA_QUERY.above.desktop} {
    padding: ${SPACING.s12} 0;
  }
`;

const HeadingSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${SPACING.s11} 0;

  ${MEDIA_QUERY.above.desktop} {
    margin: 0 ${SPACING.s12} ${SPACING.s12};
  }
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlusButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${COLOR.white};
  self-align: bottom;
  padding: 0;
  margin-left: ${SPACING.s4};
  height: 32px;
`;

const LogoutButton = styled.button`
  ${TYPOGRAPHY.h6};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  color: ${COLOR.white};
  self-align: bottom;
  padding: 0;
  height: 32px;
  span {
    display: none;
  }
  ${MEDIA_QUERY.above.desktop} {
    ${TYPOGRAPHY.h6};
    span {
      display: block;
      margin-right: ${SPACING.s4};
    }
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
