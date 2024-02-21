import { Token } from '@prisma/client';

export interface Tokens {
  accesToken: string;
  refreshToken: Token;
}

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}
