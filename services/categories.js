const faker = require('faker');
const { internet } = require('faker');
const { toNumber, find } = require('lodash');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: index+1,
        name: faker.name.firstName(),
        password: internet.password()
      });
    }
  }

  create() {

  }

  find() {
    return this.categories;
  }

  findOne(id) {
    if (toNumber(id)) {
      return find(this.categories, item => item.id === toNumber(id));
    }
    return false;
  }

  update() {

  }

  delete() {

  }
}

module.exports = CategoriesService;
