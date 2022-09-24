const express = require('express');

const products = require('./routes/products');
const categories = require('./routes/categories');
const users = require('./routes/users')

const app = express();

const PORT = 3000;

app.use(products);
app.use(categories);
app.use(users);

app.listen(PORT, () => {
  console.log('Listen in ' + PORT)
});

