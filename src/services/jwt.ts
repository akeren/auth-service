import { sign } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { IUserDocument } from '../models';
import { jwtConfig } from '../config';
import { IJwtPayload } from '.';

export class Jwt {
  constructor(public user: IUserDocument) {}

  sign(): string {
    const token = sign(
      {
        id: this.user.id,
        email: this.user.email,
      },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiryTime,
      }
    );

    return token;
  }

  decodeAccessToken(token: string): IJwtPayload {
    return jwt_decode(token);
  }
}
