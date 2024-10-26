import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://<username>:<password>@cluster0.zbdwf.mongodb.net/<database_name>?retryWrites=true&w=majority';

export const PORT = process.env.PORT || 5001;

export const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
