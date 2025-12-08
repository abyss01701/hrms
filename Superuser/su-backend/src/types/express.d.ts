// src/types/express.d.ts
import type { UserEntity } from '../users/user.entity'; // adjust to your real user type

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: string;
      tokenVersion: number;
    }

    interface Request {
      user?: User;  // 👈 THIS FIXES THE ERROR
    }
  }
}
