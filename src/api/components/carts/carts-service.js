const {
  available,
} = require('../../../models/carts-schema');
const cartsRepository = require('./carts-repository');

async function getCarts() {
  const carts = await cartsRepository.getCarts();
  const results = [];
  for (let i = 0; i < carts.length; i += 1) {
    const cart = carts[i];
    results.push({
      id: cart.id,
      product: cart.product,
      quantity: cart.quantity,
      amount: cart.amount,
      available: cart.available,
    });
  }

  return results;
}

async function getCart(id) {
  const cart = await cartsRepository.getCart(id);

  // Cart not found
  if (!cart) {
    return null;
  }

  return {
    id: cart.id,
    product: cart.product,
    quantity: cart.quantity,
    amount: cart.amount,
    available: cart.available,
  };
}

async function createCart(
  product,
  quantity,
  amount,
  available
) {
  try {
    await cartsRepository.createCart(
      product,
      quantity,
      amount,
      available
    );
  } catch (err) {
    return null;
  }

  return true;
}

async function updateCart(
  id,
  product,
  quantity,
  amount,
  available
) {
  const cart = await cartsRepository.getCart(id);

  // Cart not found
  if (!cart) {
    return null;
  }

  try {
    await cartsRepository.updateCart(
      id,
      product,
      quantity,
      amount,
      available
    );
  } catch (err) {
    return null;
  }

  return true;
}

async function deleteCart(id) {
  const cart = await cartsRepository.getCart(id);
  if (!cart) {
    return null;
  }

  try {
    await cartsRepository.deleteCart(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
};
