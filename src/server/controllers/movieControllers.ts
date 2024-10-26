import { Request, Response, RequestHandler } from 'express';
import {
  getMovies,
  getMovieById,
  // updateMovie,
  deleteMovie,
  Movie,
} from '@models/movieModel';
// import path from 'path';

export const getAllPaginatedMovies: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the 'page' and 'limit' query parameters from the request
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit as string) || 12; // Default to 12 items per page if not provided

    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;

    // Fetch paginated movies and the total count of documents
    const movies = await Movie.find().skip(skip).limit(limit);
    const totalMovies = await Movie.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalMovies / limit);

    // Return the paginated data and total pages
    res.json({ movies, totalPages });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
};

// Get all movies
export const getAllMovies: RequestHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve movies' });
  }
};

// Get a specific movie by ID
export const getMovie: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const movie = await getMovieById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve movie' });
  }
};

// Add a new movie

export const addMovie: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, publishingYear } = req.body;

    // Ensure multer has attached the file
    if (!req.file) {
      res.status(400).json({ error: 'Poster image is required' });
      return;
    }

    const newMovie = new Movie({
      title,
      publishingYear,
      poster: req.file.filename, // Save the path of the uploaded file
    });

    const createdMovie = await newMovie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Failed to create movie' });
  }
};

export const editMovie: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, publishingYear } = req.body;
    // Find the movie by ID
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    // Update the movie fields only if they are provided in the request body
    movie.title = title || movie.title;
    movie.publishingYear = publishingYear || movie.publishingYear;

    // If a new poster file is uploaded, update the poster field
    if (req.file) {
      movie.poster = req.file.filename;
    }

    // Save the updated movie
    const updatedMovie = await movie.save();
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

// Delete a movie
export const removeMovie: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await deleteMovie(req.params.id);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
};
