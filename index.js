const express = require('express');
const setRoutes = require('./routes')

const app = express();

const PORT = 3000;

setRoutes(app)

app.listen(PORT, () => {
  console.log('Listen in ' + PORT)
});

