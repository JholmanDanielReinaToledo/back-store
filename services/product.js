const {image, commerce} = require('faker');
const { toNumber, find, max, map, findIndex } = require('lodash');
const boom = require('@hapi/boom');

class ProductServices {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: index+1,
        name: commerce.productName(),
        price: toNumber(commerce.price()),
        image: image.imageUrl(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: max(map(this.products, x => x.id)) + 1,
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = find(this.products, item => item.id === toNumber(id));
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const index = findIndex(this.products, item => item.id === toNumber(id));
    if (index < 0) {
      throw boom.notFound('Product not found');
    } else {
      const product = this.products[index];
      this.products[index] = {
        id,
        ...product,
        ...changes
      };
      return this.products[index];
    }
  }

  async delete(id) {
    const index = findIndex(this.products, item => item.id === toNumber(id));
    if (index < 0) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {
      id,
    }
  }
}

module.exports = ProductServices;
