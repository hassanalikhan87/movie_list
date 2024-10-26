import { MongoClient } from 'mongodb';
import { MONGO_URI } from '@env';
import mongoose from 'mongoose';

const uri = MONGO_URI;

export const connectDB = async () => {
  mongoose
    .connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
};
