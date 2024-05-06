const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const cartsControllers = require('./carts-controller');
const cartsValidator = require('./carts-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/carts', route);

  route.get(
    '/',
    authenticationMiddleware,
    cartsControllers.getCarts
  );

  route.post(
    '/',
    authenticationMiddleware,
    celebrate(cartsValidator.createCart),
    cartsControllers.createCart
  );

  route.get(
    '/:id',
    authenticationMiddleware,
    cartsControllers.getCart
  );

  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(cartsValidator.updateCart),
    cartsControllers.updateCart
  );

  route.delete(
    '/:id',
    authenticationMiddleware,
    cartsControllers.deleteCart
  );
};
