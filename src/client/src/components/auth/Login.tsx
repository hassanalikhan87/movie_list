import React, { useState } from 'react';
import styled from 'styled-components';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { COLOR } from '../../constants/styles/color';
import { SPACING } from '../../constants/styles/spacing';
import Heading from '../common/MainHeading';
import TextInput from '../common/TextInput';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import Button from '../common/Button';
import { loginUser } from '../../helpers/apis/login-user';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      login(token, rememberMe);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <HeadingWrapper>
          <Heading tag="h1" title="Sign in" />
        </HeadingWrapper>
        <Form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CheckboxWrapper>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </CheckboxLabel>
          </CheckboxWrapper>
          <Button type="submit" variant="primary" children="Login" fullWidth />
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormWrapper>
    </Container>
  );
};

export default Login;

// Styles remain the same
const Container = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 111px);
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 ${SPACING.s6};
  ${MEDIA_QUERY.above.desktop} {
    padding: 0;
  }
`;

const HeadingWrapper = styled.div`
  margin-bottom: ${SPACING.s8};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${MEDIA_QUERY.above.desktop} {
    width: 300px;
  }
`;

const ErrorMessage = styled.p`
  color: ${COLOR.error};
  margin-top: 20px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLOR.white};
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  ${TYPOGRAPHY.caption}
  display: flex;
  align-items: center;
  font-size: 14px;
  input {
    margin-right: 8px;
    accent-color: ${COLOR.input};
    &:after {
      height: 18px;
      width: 18px;
    }
  }
`;
