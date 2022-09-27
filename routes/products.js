const express = require('express');
const router = express.Router();
const ProducServices = require('../services/product')

const serviceProduct = new ProducServices();

router.get('/', async (req, res, next) => {
  try {
    const products = await serviceProduct.find();

    res.json(products);
  } catch (error) {
    next(error);
  }
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

router.post('/', async (req, res, next) => {

  try {
    const body = req.body;
    const newProduct = await serviceProduct.create(body);

    res.status(201).json({
      message: 'created',
      data: newProduct,
    })
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
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
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const rta = await serviceProduct.delete(id);

    res.json(rta)
  } catch (error) {
    next(error);
  }
});


module.exports = router;
