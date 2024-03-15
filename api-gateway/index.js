const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());

const {
  USER_API_URL,
  ORDERS_API_URL,
  PRODUCTS_API_URL,
} = require('./URLs');


const optionsUser = {
  target: USER_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsProducts = {
  target: PRODUCTS_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsOrders = {
  target: ORDERS_API_URL,
  changeOrigin: true, 
  logger: console,
};

const userProxy = createProxyMiddleware(optionsUser);
const productsProxy = createProxyMiddleware(optionsProducts);
const ordersProxy = createProxyMiddleware(optionsOrders);


app.get('/', (req, res) => res.send('Hello Gateway API'));
app.get('/user', userProxy);
app.get('/orders', ordersProxy);
app.get('/products', productsProxy);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));