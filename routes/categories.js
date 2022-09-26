const express = require('express');
const router = express.Router();
const CategoriesServices = require('../services/categories');

const categoriesServices = new CategoriesServices();

router.get('/', (req, res) => {
  const categories = categoriesServices.find();

  res.status(200).json(categories);
})


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const category = await categoriesServices.findOne(id);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400).send()
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await categoriesServices.create(body);

  res.status(201).json({
    message: 'created',
    data: newCategory,
  })
});

router.patch('/:id', async (req, res) => {
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
    res.status(404).json({
      message: error.message,
    });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const rta = await categoriesServices.delete(id);

  res.json(rta)
});


module.exports = router;
