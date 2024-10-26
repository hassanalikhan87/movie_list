import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import AddMovie from './components/movie/AddMovie';
import EditMovie from './components/movie/EditMovie';
import MovieList from './components/movie/MovieList';
import Footer from './components/layout/Footer';
import styled from 'styled-components';

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <div>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/edit" element={<EditMovie />} />
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
