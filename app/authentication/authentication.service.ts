import { AuthenticationData } from '@app/authentication';
import { Config } from '@app/config';
import { HttpError } from '@app/shared/httperror';
import { User, UserData, UserModel } from '@app/user';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthenticationService {
  private secret: string;
  private expiry: string;

  constructor(env: Config) {
    this.secret = env.SECRET_KEY;
    this.expiry = env.TOKEN_EXPIRY;
  }

  public async registerUser(authData: AuthenticationData): Promise<string> {
    if (await UserModel.findOne({ email: authData.email })) {
      throw new HttpError(400, 'A user with that email already exists.');
    }
    const hashedPassword = await hash(authData.password, 10);
    const user = await UserModel.create({
      email: authData.email,
      password: hashedPassword
    });
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }

  public async loginUser(authData: AuthenticationData): Promise<string> {
    const user = await UserModel.findOne({ email: authData.email });
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    const match = await compare(authData.password, user.password as string);
    if (!match) {
      throw new HttpError(401, 'Authentication failed.');
    }
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }
}
