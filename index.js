const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3100;

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://my-app.com'];
const options = {
  origen: (origen, callback) => {
    if (whiteList.includes(origen) || !origen) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido'));
    }
  },
};

app.use(cors(options));
require('./utils/auth');
app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Soy una nueva ruta!!!');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'Product 2',
      price: 500,
    },
  ]);
});

app.get('/products/:id', (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  res.json({
    id,
    name: 'Product 1',
    prces: 1000,
  });
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('http://localhost:' + port);
});
