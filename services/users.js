const faker = require('faker');
const { internet } = require('faker');
const { toNumber, find, findIndex, max, map } = require('lodash');

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

  create(data) {
    const newUser = {
      id: max(map(this.users, x => x.id)) + 1,
      ...data,
    };

    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    if (toNumber(id)) {
      return find(this.users, item => item.id === toNumber(id));
    }
    return false;
  }

  update(id, changes) {
    const index = findIndex(this.users, item => item.id === toNumber(id));
    if (index < 0) {
      throw new Error('User not found')
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

  delete(id) {
    const index = findIndex(this.users, item => item.id === toNumber(id));
    if (index < 0) {
      throw new Error('User not found')
    }
    this.users.splice(index, 1);
    return {
      id,
    }
  }
}

module.exports = UsersServices;
