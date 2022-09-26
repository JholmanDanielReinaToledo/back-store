const faker = require('faker');
const { internet } = require('faker');
const { toNumber, find, max, map, findIndex } = require('lodash');

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

  async create(data) {
    const newCategory = {
      id: max(map(this.categories, x => x.id)) + 1,
      ...data,
    };

    this.categories.push(newCategory);
    return newCategory;

  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    if (toNumber(id)) {
      return find(this.categories, item => item.id === toNumber(id));
    }
    return false;
  }

  async update(id, changes) {
    const index = findIndex(this.categories, item => item.id === toNumber(id));
    if (index < 0) {
      throw new Error('Category not found')
    } else {
      const product = this.categories[index];
      this.categories[index] = {
        id,
        ...product,
        ...changes
      };
      return this.categories[index];
    }
  }

  async delete(id) {
    const index = findIndex(this.categories, item => item.id === toNumber(id));
    if (index < 0) {
      throw new Error('Category not found')
    }
    this.categories.splice(index, 1);
    return {
      id,
    }
  }
}

module.exports = CategoriesService;
