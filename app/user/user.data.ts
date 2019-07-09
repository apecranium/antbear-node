import { User } from '@app/user';

export class UserData implements User {
  public id: string;
  public name: string;
  public credentials: { email: string };

  constructor(user: User) {
    this.id = user.id || '';
    this.name = user.name || '';
    this.credentials = {
      email: user.credentials.email || ''
    };
  }
}
