const cartsService = require('./carts-service');
const {
  errorResponder,
  errorTypes,
} = require('../../../core/errors');

async function getCarts(request, response, next) {
  try {
    const carts = await cartsService.getCarts();
    return response.status(200).json(carts);
  } catch (error) {
    return next(error);
  }
}

async function getCart(request, response, next) {
  try {
    const cart = await cartsService.getCart(
      request.params.id
    );

    if (!cart) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Unknown cart'
      );
    }

    return response.status(200).json(cart);
  } catch (error) {
    return next(error);
  }
}

async function createCart(request, response, next) {
  try {
    const product = request.body.product;
    const quantity = request.body.quantity;
    const amount = request.body.amount;
    const available = request.body.available;

    const success = await cartsService.createCart(
      product,
      quantity,
      amount,
      available
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create cart'
      );
    }

    return response
      .status(200)
      .json({ product, quantity, amount, available });
  } catch (error) {
    return next(error);
  }
}

async function updateCart(request, response, next) {
  try {
    const id = request.params.id;
    const product = request.body.product;
    const quantity = request.body.quantity;
    const amount = request.body.amount;
    const available = request.body.available;

    const success = await cartsService.updateCart(
      id,
      product,
      quantity,
      amount,
      available
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update cart'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

async function deleteCart(request, response, next) {
  try {
    const id = request.params.id;

    const success = await cartsService.deleteCart(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete cart'
      );
    }

    return response
      .status(200)
      .json({
        message: 'Successfully removed product from cart',
      });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
};
