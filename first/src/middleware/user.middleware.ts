import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = await this.authService.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded;
  }
}
