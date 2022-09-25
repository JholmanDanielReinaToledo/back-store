const {image, commerce} = require('faker');
const { toNumber, find, max, map, findIndex } = require('lodash');

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

  create(data) {
    const newProduct = {
      id: max(map(this.products, x => x.id)) + 1,
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    if (toNumber(id)) {
      return find(this.products, item => item.id === toNumber(id));
    }
    return false;
  }

  update(id, changes) {
    const index = findIndex(this.products, item => item.id === toNumber(id));
    if (index < 0) {
      throw new Error('Product not found')
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

  delete(id) {
    const index = findIndex(this.products, item => item.id === toNumber(id));
    if (index < 0) {
      throw new Error('Product not found')
    }
    this.products.splice(index, 1);
    return {
      id,
    }
  }
}

module.exports = ProductServices;
