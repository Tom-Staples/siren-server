const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
const register = require('./Routes/register');
const login = require('./Routes/login');
const auth = require('./Routes/auth');
const priceMachine = require('./Routes/priceMachine');
const feniksModels = require('./Routes/feniksModels');
const feniksFabrics = require('./Routes/feniksFabrics');
const imsModels = require('./Routes/imsModels');
const imsFabrics = require('./Routes/imsFabrics');
const imobModels = require('./Routes/imobModels');
const imobFabrics = require('./Routes/imobFabrics');
const mikarModels = require('./Routes/mikarModels');
const mikarFabrics = require('./Routes/mikarFabrics');
const pphuModels = require('./Routes/pphuModels');
const pphuFabrics = require('./Routes/pphuFabrics');

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept, access-token'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  next();
});

//route middlewares
app.use('/register', register);
app.use('/login', login);
app.use('/auth', auth);
app.use('/priceMachine', priceMachine);
app.use('/feniksModels', feniksModels);
app.use('/feniksFabrics', feniksFabrics);
app.use('/imsModels', imsModels);
app.use('/imsFabrics', imsFabrics);
app.use('/imobModels', imobModels);
app.use('/imobFabrics', imobFabrics);
app.use('/mikarModels', mikarModels);
app.use('/mikarFabrics', mikarFabrics);
app.use('/pphuModels', pphuModels);
app.use('/pphuFabrics', pphuFabrics);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

mongoose.connect(
  process.env.SIREN_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to Siren Database');
  }
);

//listening for requests to the server on port 3001
app.listen(PORT, HOST, () => {
  console.log('Listening on port 3001');
});
