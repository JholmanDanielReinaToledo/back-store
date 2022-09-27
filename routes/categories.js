const express = require('express');
const router = express.Router();
const CategoriesServices = require('../services/categories');

const categoriesServices = new CategoriesServices();

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoriesServices.find();

    res.status(200).json(categories);
  } catch (error) {
    next(error)
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoriesServices.findOne(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await categoriesServices.create(body);

    res.status(201).json({
      message: 'created',
      data: newCategory,
    })
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const {id} = req.params;

    const updatedCategory = await categoriesServices.update(id, body);

    res.json({
      message: 'update',
      data: updatedCategory,
      id,
    })

  } catch (error) {
    next(error)
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await categoriesServices.delete(id);
    res.json(rta)
  } catch (error) {
    next(error)
  }
});


module.exports = router;
