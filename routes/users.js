const express = require('express');
const router = express.Router();
const UsersServices = require('../services/users');

const usersServices = new UsersServices();

router.get('/', async (req, res, next) => {
  try {
    const users = await usersServices.find();
    res.status(200).json(users);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await usersServices.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await usersServices.create(body);

    res.status(201).json({
      message: 'created',
      data: newUser,
    })
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const {id} = req.params;

    const updatedUser = await usersServices.update(id, body);

    res.json({
      message: 'update',
      data: updatedUser,
      id,
    })

  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const rta = await usersServices.delete(id);

    res.json(rta)
  } catch (error) {
    next(error)
  }

});


module.exports = router;
