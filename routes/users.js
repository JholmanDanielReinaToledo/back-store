const express = require('express');
const router = express.Router();
const UsersServices = require('../services/users');

const usersServices = new UsersServices();

router.get('/', (req, res) => {
  const users = usersServices.find();

  res.status(200).json(users);
})


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
