import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: any[];
  constructor() {
    this.users = new Array(100)
      .fill(1)
      .map((e, i) => {
        return {
          id: i + 1,
          name : faker.name.findName(),
          email : faker.internet.email(),
          image : faker.image.avatar(),
        };
      });
  }
  getAll() {
    return this.users.sort((e1, e2) => {
        if (e1.id > e2.id) {
            return 1;
        } else if (e1.id === e2.id) {
            return 0;
        } else { return -1}
    });
  }
  getUserById(userId: number) {
    return this.users.find(e => e.id === Number(userId));
  }
  remove(userId) {
    const userIndex = this.users.findIndex(e => e.id === Number(userId));
      console.log("bac"+userIndex);
    this.users.splice(userIndex, 1);
    return userId;
  }
  addUser(createUserDto: CreateUserDto) {
    const user = {
      id: this.generateId(),
      name: createUserDto.name,
      email: createUserDto.email,
      image: createUserDto.email,
    };
    this.users.push(user);
    return this.users;
  }
  
  updateUser(id,createUserDto: CreateUserDto) {

    const user=this.getUserById(id);

    if(!user)
      return null;

    if(user) {
        user.name = createUserDto.name;
        user.email = createUserDto.email;
    }
    return user;
  }

  private generateId() {
    return this.users.length > 0 ?
      Math.max(...this.users.map(e => e.id)) + 1 :
      1;
  }
}
