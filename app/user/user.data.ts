import { User } from '@app/user';

export class UserData implements User {
  constructor(public email: string = '', public name: string = '', public id: string = '') {
  }
}
