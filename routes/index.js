const express = require('express');
const products = require('./products')
const categories = require('./categories')
const users = require('./users')

const setRoutes = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', products);
  router.use('/categories', categories);
  router.use('/users', users);
};

module.exports = setRoutes;
