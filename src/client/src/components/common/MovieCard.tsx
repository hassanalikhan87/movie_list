import React from 'react';
import styled from 'styled-components';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { FONT_WEIGHT } from '../../constants/styles/font';
import { COLOR } from '../../constants/styles/color';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import { SPACING } from '../../constants/styles/spacing';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  _id: string;
  title: string;
  publishingYear: number;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  _id,
  title,
  publishingYear,
  poster,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/edit', { state: { id: _id } });
  };

  return (
    <Container onClick={handleClick}>
      <Image src={`http://localhost:9000/uploads/${poster}`} alt={title} />
      <div>
        <Title>{title}</Title>
        <Year>{publishingYear}</Year>
      </div>
    </Container>
  );
};

export default MovieCard;

const Container = styled.div`
  background-color: transparent;
  grid-column: span 3;
  background-color: ${COLOR.card};
  margin-bottom: 10px;
  padding: 0;
  border-radius: 12px;
  cursor: pointer;
  ${MEDIA_QUERY.above.desktop} {
    padding: ${SPACING.s3};
    grid-column: span 3;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  aspect-ratio: 133 / 200;
  object-fit: cover;
  border-radius: 12px;
`;

const Title = styled.div`
  ${TYPOGRAPHY.bodyRG}
  margin: ${SPACING.s4} 0 0 0;
  padding: 0 ${SPACING.s4};
  font-weight: 500;
  color: ${COLOR.white};
  ${MEDIA_QUERY.above.desktop} {
    padding: 0 ${SPACING.s3};
  }
`;
const Year = styled.div`
  ${TYPOGRAPHY.caption}
  padding: 0 ${SPACING.s4};
  margin: ${SPACING.s3} 0;
  font-weight: ${FONT_WEIGHT.regular};
  color: ${COLOR.white};
  ${MEDIA_QUERY.above.desktop} {
    padding: 0 ${SPACING.s3};
  }
`;
