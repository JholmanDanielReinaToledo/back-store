const express = require('express');
const { find, toNumber } = require('lodash');
const router = express.Router();
const faker = require('faker');

const products = [
  {
    id: 1,
    name: 'product 1',
    price: 1000,
    discount: 0,
  },
  {
    id: 2,
    name: 'product 2',
    price: 2000,
    discount: 0,
  },
  {
    id: 3,
    name: 'product 3',
    price: 3000,
    discount: 0,
  },
  {
    id: 4,
    name: 'product 4',
    price: 4000,
    discount: 0,
  },
  {
    id: 5,
    name: 'product 5',
    price: 5000,
    discount: 0,
  },
]

router.get('/products', (req, res) => {
  const productss = [];

  const { size } = req.query;
  const limit = size | 10;
  for (let index = 0; index < limit; index++) {
    productss.push({
      id: index+1,
      name: faker.commerce.productName(),
      price: toNumber(faker.commerce.price()),
      image: faker.image.imageUrl(),
    })
  }

  res.json(productss);
});

router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    res.json(find(products, {id: toNumber(id)}));
  }
});

module.exports = router;
