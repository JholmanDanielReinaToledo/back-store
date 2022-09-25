const express = require('express');
const router = express.Router();
const ProducServices = require('../services/product')

const serviceProduct = new ProducServices();

router.get('/', (req, res) => {
  const products = serviceProduct.find();

  res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const product = serviceProduct.findOne(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).send()
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = serviceProduct.create(body);

  res.status(201).json({
    message: 'created',
    data: newProduct,
  })
});

router.patch('/:id', (req, res) => {
  const body = req.body;
  const {id} = req.params;

  const updatedProduct = serviceProduct.update(id, body);

  res.json({
    message: 'update',
    data: updatedProduct,
    id,
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const rta = serviceProduct.delete(id);

  res.json(rta)
});


module.exports = router;
