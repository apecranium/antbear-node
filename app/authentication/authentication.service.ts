import { Config } from '@app/config';
import { HttpError } from '@app/shared/httperror';
import { User, UserModel } from '@app/user';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthenticationService {
  private secret: string;
  private expiry: string;

  constructor(env: Config) {
    this.secret = env.SECRET_KEY;
    this.expiry = env.TOKEN_EXPIRY;
  }

  public async registerUser(userData: User): Promise<string> {
    if (await UserModel.findOne({ credentials: { email: userData.credentials.email }})) {
      throw new HttpError(400, 'A user with that email already exists.');
    }
    if (!userData.credentials.password) {
      throw new HttpError(400, 'Password field is required.');
    }
    const hashedPassword = await hash(userData.credentials.password, 10);
    const user = await UserModel.create({
      name: userData.name,
      credentials: {
        email: userData.credentials.email,
        password: hashedPassword
    }});
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }

  public async loginUser(userData: User): Promise<string> {
    const user = await UserModel.findOne({ credentials: { email: userData.credentials.email }});
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    if (!userData.credentials.password) {
      throw new HttpError(400, 'Password field is required.');
    }
    const match = await compare(userData.credentials.password, user.credentials.password as string);
    if (!match) {
      throw new HttpError(401, 'Authentication failed.');
    }
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }
}
