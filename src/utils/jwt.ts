import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { enviroment } from '../config/enviroment';
interface JwtResponse {
  userId: number;
  iat: number;
  exp: number;
}
export default class Jwt {
  static signToken(userId: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const payload = {
        userId,
      };
      const options = {
        expiresIn: '1h',
      };
      jwt.sign(payload, enviroment.secretKeyJwt, options, (err, token) => {
        if (err) {
          console.error('[signToken]', err);
          reject(new Error('Internal error'));
        }
        resolve(token as string);
      });
    });
  }

  static verifyToken(req: Request): Promise<JwtResponse> {
    return new Promise<JwtResponse>((resolve, reject) => {
      const errMessage = 'Unauthorized';
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        reject(new Error(errMessage));
      } else {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, enviroment.secretKeyJwt, (err, payload) => {
          if (err) {
            reject(new Error(errMessage));
          }
          resolve(payload as JwtResponse);
        });
      }
    });
  }
}
