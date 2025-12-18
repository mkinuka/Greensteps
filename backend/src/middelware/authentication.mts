import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

// Simple user type
export type AuthUser = {
  id: string;
  email: string;
};

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.auth_token;
    
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    req.user = { id: decoded.userId, email: decoded.email };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};