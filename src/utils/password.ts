import crypto from 'crypto';
export default class Password {
  static createHash(password: string) {
    return new Promise<string>((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('base64');

      crypto.pbkdf2(password, salt, 1000, 64, 'sha1', (err, buff) => {
        if (err) reject(err);

        const hashedPassword = `${buff.toString('base64')}.${salt}`;
        resolve(hashedPassword);
      });
    });
  }

  static comparePassword(password: string, storePassword: string) {
    return new Promise<boolean>((resolve, reject) => {
      const [hashedPassword, salt] = storePassword.split('.');

      crypto.pbkdf2(password, salt, 1000, 64, 'sha1', (err, buff) => {
        if (err) reject(err);
        resolve(buff.toString('base64') === hashedPassword);
      });
    });
  }
}
