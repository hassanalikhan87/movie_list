import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import AddMovie from './components/movie/AddMovie';
import EditMovie from './components/movie/EditMovie';
import MovieList from './components/movie/MovieList';
import Footer from './components/layout/Footer';
import styled from 'styled-components';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { checkTokenExpiration } from './helpers/check-token-expiration';

const App: React.FC = () => {
  useEffect(() => {
    checkTokenExpiration();
  }, []);
  return (
    <Router>
      <Container>
        <div>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MovieList />} />
              <Route path="/add" element={<AddMovie />} />
              <Route path="/edit" element={<EditMovie />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;
