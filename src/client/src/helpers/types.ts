export interface Movie {
  _id: string;
  title: string;
  publishingYear: number;
  poster: string;
}

export interface UseFetchMoviesResult {
  movies: Movie[];
  error: string | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  handlePageChange: (newPage: number) => void;
}
