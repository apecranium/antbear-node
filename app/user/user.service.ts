import { HttpError } from '../shared';
import { User, UserData, UserModel } from '../user';

export class UserService {

  public async getUsers(): Promise<User[]> {
    const userList = new Array<User>();
    const users = await UserModel.find();
    for (const user of users) {
      userList.push(new UserData(user));
    }
    return userList;
  }

  public async createUser(u: User): Promise<User> {
    const user = new UserModel(u);
    await user.save();
    return new UserData(user);
  }

  public async getUser(id: string): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    return new UserData(user);
  }

  public async updateUser(u: User): Promise<User> {
    const user = await UserModel.findById(u.id);
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    user.credentials.email = u.credentials.email ? u.credentials.email : user.credentials.email;
    user.name = u.name ? u.name : user.name;
    await user.save();
    return new UserData(user);
  }

  public async deleteUser(id: string): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new HttpError(404, 'User not found.');
    }
    await user.remove();
    return new UserData(user);
  }
}
