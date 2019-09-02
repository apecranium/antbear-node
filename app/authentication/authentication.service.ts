import { CryptoService, HttpError } from '../shared';
import { Credentials, User, UserModel } from '../user';

export class AuthenticationService {
  constructor(private readonly cryptoService: CryptoService) {
  }

  public async registerUser(userData: User): Promise<string> {
    if (await UserModel.findOne({ 'credentials.email': userData.credentials.email })) {
      throw new HttpError(400, 'A user with that email already exists.');
    }
    if (!userData.credentials.password) {
      throw new HttpError(400, 'Password field is required.');
    }
    const hashedPassword = await this.cryptoService.hash(userData.credentials.password);
    const user = await UserModel.create({
      name: userData.name,
      credentials: {
        email: userData.credentials.email,
        password: hashedPassword
    }});
    const token = await this.cryptoService.sign({ id: user.id });
    return token;
  }

  public async loginUser(creds: Credentials): Promise<string> {
    const user = await UserModel.findOne({ 'credentials.email': creds.email });
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    if (!creds.password) {
      throw new HttpError(400, 'Password field is required.');
    }
    const match = await this.cryptoService.compare(creds.password, user.credentials.password as string);
    if (!match) {
      throw new HttpError(401, 'Authentication failed.');
    }
    const token = await this.cryptoService.sign({ id: user.id });
    return token;
  }
}
