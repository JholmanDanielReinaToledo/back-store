const express = require('express');
const router = express.Router();
const ProducServices = require('../services/product')

const serviceProduct = new ProducServices();

router.get('/', async (req, res) => {
  const products = await serviceProduct.find();

  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await serviceProduct.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await serviceProduct.create(body);

  res.status(201).json({
    message: 'created',
    data: newProduct,
  })
});

router.patch('/:id', async (req, res) => {
  try {
    const body = req.body;
    const {id} = req.params;

    const updatedProduct = await serviceProduct.update(id, body);

    res.json({
      message: 'update',
      data: updatedProduct,
      id,
    })

  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const rta = await serviceProduct.delete(id);

  res.json(rta)
});


module.exports = router;
