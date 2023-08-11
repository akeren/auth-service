import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

export class Password {
  static async hash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');

    const buffer = await Password.bufferedPassword(password, salt);

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');

    const buffer = await Password.bufferedPassword(suppliedPassword, salt);

    return buffer.toString('hex') === hashedPassword;
  }

  private static async bufferedPassword(password: string, salt: string): Promise<Buffer> {
    return (await promisify(scrypt)(password, salt, 64)) as Buffer;
  }
}
