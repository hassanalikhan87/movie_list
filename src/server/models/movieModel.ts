import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for a Movie document
export interface MovieDocument extends Document {
  title: string;
  publishingYear: number;
  poster: string;
}

// Define the Movie schema
const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  publishingYear: { type: Number, required: true },
  poster: { type: String, required: true },
});

// Create a Mongoose model
export const Movie = mongoose.model<MovieDocument>('Movie', MovieSchema);

// Function to get all movies
export const getMovies = async (): Promise<MovieDocument[]> => {
  return Movie.find({});
};

// Function to get a movie by ID
export const getMovieById = async (
  id: string,
): Promise<MovieDocument | null> => {
  return Movie.findById(id);
};

export const createMovie = async (
  movieData: MovieDocument,
): Promise<MovieDocument> => {
  const { title, publishingYear, poster } = movieData;
  // Create a new movie instance
  const newMovie = new Movie({
    title,
    publishingYear,
    poster,
  });

  // Save the movie to the database
  return await newMovie.save();
};

// Function to update a movie by ID
const updateMovie = async (
  id: string,
  updatedMovie: Partial<MovieDocument>,
): Promise<MovieDocument | null> => {
  return Movie.findByIdAndUpdate(id, updatedMovie, { new: false });
};

// Function to delete a movie by ID
export const deleteMovie = async (id: string): Promise<void> => {
  await Movie.findByIdAndDelete(id);
};
