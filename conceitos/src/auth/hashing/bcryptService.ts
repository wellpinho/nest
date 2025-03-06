import { HashingServiceProtocol } from './hasging.service';
import bcrypt from 'bcrypt';

export class BcryptService extends HashingServiceProtocol {
  async hash(password: string): Promise<string> {
    const hashedPassword = bcrypt.hash(password, 10);

    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
