import { Router } from 'express';
import {
  getAllMovies,
  getMovie,
  addMovie,
  editMovie,
  removeMovie,
  getAllPaginatedMovies,
} from '@controllers/movieControllers';
import { authMiddleware } from '@middleware/authMiddleware'; // Adjust the import path if necessary
import { uploadMiddleware } from '@middleware/uploadMiddleware'; // Multer middleware for file upload

const router = Router();

// Route to get all movies
router.get('/movies', authMiddleware, getAllMovies);

router.get('/movies/paginated', authMiddleware, getAllPaginatedMovies);

// Route to get a specific movie by ID
router.get('/movies/:id', authMiddleware, getMovie);

// Route to add a new movie with image upload
router.post(
  '/movies',
  authMiddleware,
  uploadMiddleware.single('poster'),
  addMovie,
);

// Route to edit a movie
router.put(
  '/movies/:id',
  authMiddleware,
  uploadMiddleware.single('poster'),
  editMovie,
);

// Route to delete a movie
router.delete('/movies/:id', authMiddleware, removeMovie);

export default router;
