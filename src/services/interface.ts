import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export interface ICacheOptions {
  key?: string;
}
