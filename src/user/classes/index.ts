import { Entity } from '../../entity/classes';
import { Gender } from '../enums';

export class User extends Entity {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
}

User.toString = () => {
  let title: string;

  switch (this.gender) {
    case Gender.Male:
      title = 'Mr';
      break;
    case Gender.Female:
      title = 'Mrs';
      break;
    case Gender.Other:
      title = '';
      break;
  }

  return `${title} ${this.firstName} ${this.lastName}`;
};
