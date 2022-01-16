import { Injectable } from '@nestjs/common';
import { User } from './classes';
import { Gender } from './enums';

@Injectable()
export class UserService {
  public readonly _users: User[] = [];

  constructor() {
    const user = new User();

    user.id = 1;
    user.userName = 'askanymark';
    user.password = 'test';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.phoneNumber = '123';
    user.gender = Gender.Male;

    this._users.push(user);
  }

  async register(newUser: User): Promise<User> {
    newUser.id = this._users.length === 0 ? 1 : this._users.length + 1;
    this._users.push(newUser);

    return newUser;
  }

  async find(): Promise<User[]> {
    return this._users;
  }

  async get(id: number): Promise<User> {
    return this._users.find(u => u?.id === id);
  }

  async update(id: number, updatedUser: User): Promise<User> {
    const user = this._users.find(u => u?.id === id);

    if (typeof user === 'undefined') {
      return;
    }

    const index = this._users.indexOf(user);
    this._users[index] = { ...user, ...updatedUser };

    return { ...user, ...updatedUser };
  }

  async remove(id: number): Promise<boolean> {
    const user = this._users.find(u => u?.id === id);

    if (typeof user === 'undefined') {
      return false;
    }

    const index = this._users.indexOf(user);
    delete this._users[index];

    return true;
  }

  async exists(username: string): Promise<boolean> {
    const user = this._users.find(u => u?.userName === username);

    return typeof user !== 'undefined';
  }

  async login(username: string, password: string): Promise<any> {
    const user = this._users.find(u => u?.userName === username && u?.password === password);

    if (typeof user === 'undefined') {
      return;
    }

    // TODO jwt stuff
  }
}
