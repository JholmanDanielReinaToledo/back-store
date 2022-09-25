const express = require('express');
const { find, toNumber } = require('lodash');
const router = express.Router();

const categories = [
  {
    id: 1,
    name: 'Television',
    products: [
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
    ]
  },
  {
    id: 2,
    name: 'Tecnology',
    products: [
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
  },
];

router.get('/', (req, res) => {
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    res.json(find(categories, {id: toNumber(id)}));
  }
});

router.get('/:id/products', (req, res) => {
  const { id } = req.params;
  if (find(categories, {id: toNumber(id)}).products) {
    res.json(find(categories, {id: toNumber(id)}).products);
  }
});


router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  })
});

router.patch('/:id', (req, res) => {
  const body = req.body;
  const {id} = req.params;
  res.json({
    message: 'update',
    data: body,
    id,
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  })
});


module.exports = router;
