import styled from 'styled-components';
import Heading from '../common/MainHeading';
import Button from '../common/Button';
import { SPACING } from '../../constants/styles/spacing';
import { useNavigate } from 'react-router-dom';

const NoMoviesToShow = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/add')
    }
  return (
    <Wrapper>
      <HeadingContainer>
        <Heading title={'Your movie list is empty'} tag={'h2'} />
      </HeadingContainer>
      <Button children="Add a new movie" onClick={handleClick}/>
    </Wrapper>
  );
};

export default NoMoviesToShow;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  width: 100%;
`;

const HeadingContainer = styled.div`
  margin-bottom: ${SPACING.s8};
`;
