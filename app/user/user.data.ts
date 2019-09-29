import { User } from '../user';

export class UserData implements User {
  public id: string;
  public name: string;
  public credentials: { email: string };

  public constructor(user: User) {
    this.id = user.id || '';
    this.name = user.name || '';
    this.credentials = {
      email: user.credentials.email || ''
    };
  }
}
