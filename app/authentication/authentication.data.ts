import { User } from '@app/user';

export class AuthenticationData {
  constructor(public email: string = '', public password: string = '') {
  }
}
