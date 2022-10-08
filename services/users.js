const faker = require('faker');
const { internet } = require('faker');
const { toNumber, find, findIndex, max, map } = require('lodash');
const boom = require('@hapi/boom');

class UsersServices {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: index+1,
        name: faker.name.firstName(),
        password: internet.password()
      });
    }
  }

  async create(data) {
    const newUser = {
      id: max(map(this.users, x => x.id)) + 1,
      ...data,
    };

    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = find(this.users, item => item.id === toNumber(id));
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = findIndex(this.users, item => item.id === toNumber(id));
    if (index < 0) {
      throw boom.notFound('User not found');
    } else {
      const user = this.users[index];
      this.users[index] = {
        id,
        ...user,
        ...changes
      };
      return this.users[index];
    }
  }

  async delete(id) {
    const index = findIndex(this.users, item => item.id === toNumber(id));
    if (index < 0) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return {
      id,
    }
  }
}

module.exports = UsersServices;
