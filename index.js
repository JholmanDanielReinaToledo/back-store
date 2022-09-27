const express = require('express');
const setRoutes = require('./routes')
const { logErrors, errorHandler } = require('./middelwares/error.handler')
require("express-async-errors");


const app = express();

const PORT = 3000;

app.use(express.json());

setRoutes(app)

app.use(logErrors)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Listen in ' + PORT)
});

