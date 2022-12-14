const faker = require('faker');
const { internet } = require('faker');
const { toNumber, find, max, map, findIndex } = require('lodash');
const boom = require('@hapi/boom');
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
    const category =  find(this.categories, item => item.id === toNumber(id));
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const index = findIndex(this.categories, item => item.id === toNumber(id));
    if (index < 0) {
      throw boom.notFound('Category not found');
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
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return {
      id,
    }
  }
}

module.exports = CategoriesService;
