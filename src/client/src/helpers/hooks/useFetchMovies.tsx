import { useState, useEffect } from 'react';
import { fetchMoviesApi } from '../apis/fetch-movies-api';
import { UseFetchMoviesResult, Movie } from '../types';

const useFetchMovies = (): UseFetchMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMovies = async (page: number) => {
      setLoading(true); // Set loading state to true when the request starts
      try {
        const data = await fetchMoviesApi(page, 8); // Fetch 8 movies per page
        setMovies(data.movies);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false); // Set loading state to false when the request completes
      }
    };

    loadMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return { movies, error, currentPage, totalPages, loading, handlePageChange };
};

export default useFetchMovies;
