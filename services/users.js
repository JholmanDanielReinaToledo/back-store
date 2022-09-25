const faker = require('faker');
const { internet } = require('faker');
const { toNumber, find } = require('lodash');

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

  create() {

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

  update() {

  }

  delete() {

  }
}

module.exports = UsersServices;
