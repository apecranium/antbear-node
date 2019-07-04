import { Config } from '@app/config';
import { HttpError } from '@app/shared/httperror';
import { User, UserData, UserModel } from '@app/user';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class UserService {
  private secret: string;
  private expiry: string;

  constructor(env: Config) {
    this.secret = env.SECRET_KEY;
    this.expiry = env.TOKEN_EXPIRY;
  }

  public async registerUser(userdata: User): Promise<string> {
    if (await UserModel.findOne({ email: userdata.email })) {
      throw new HttpError(400, 'A user with that email already exists.');
    }
    const hashedPassword = await hash(userdata.password, 10);
    const user = await UserModel.create({
      email: userdata.email,
      name: userdata.name,
      password: hashedPassword
    });
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }

  public async loginUser(userdata: User): Promise<string> {
    const user = await UserModel.findOne({ email: userdata.email });
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    const match = await compare(userdata.password, user.password);
    if (!match) {
      throw new HttpError(401, 'Authentication failed.');
    }
    const token = sign({ id: user.id }, this.secret, { expiresIn: this.expiry });
    return token;
  }

  public async getUser(id: string): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    return new UserData(user.id, user.name);
  }
}
