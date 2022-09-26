const express = require('express');
const router = express.Router();
const UsersServices = require('../services/users');

const usersServices = new UsersServices();

router.get('/', (req, res) => {
  const users = usersServices.find();

  res.status(200).json(users);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await usersServices.findOne(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).send()
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await usersServices.create(body);

  res.status(201).json({
    message: 'created',
    data: newUser,
  })
});

router.patch('/:id', async (req, res) => {
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
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const rta = await usersServices.delete(id);

  res.json(rta)
});


module.exports = router;
