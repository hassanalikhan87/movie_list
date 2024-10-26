import { JWT_SECRET } from '@env';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Middleware to authenticate JWT tokens
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'No token, authorization denied' });
    return;
  }

  try {
    // Verify token and attach user payload to the request object
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.body.user = decoded; // Attach decoded JWT payload to `req.user`

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
