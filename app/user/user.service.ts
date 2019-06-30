import { Config } from '@app/config';
import { HttpError } from '@app/shared/httperror';
import { User, UserModel } from '@app/user';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class UserService {
  private secret: string;
  private expiry: number;

  constructor(env: Config) {
    this.secret = env.SECRET_KEY;
    this.expiry = env.TOKEN_EXPIRY;
  }

  public async registerUser(userdata: User) {
    const hashedPassword = await hash(userdata.password, 10);
    const user = await UserModel.create({
      email: userdata.email,
      name: userdata.name,
      password: hashedPassword
    });
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }

  public async loginUser(userdata: User) {
    const user = await UserModel.findOne({ email: userdata.email });
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    if (await !compare(userdata.password, user.password)) {
      throw new HttpError(401, 'Authentication failed.');
    }
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }
}
