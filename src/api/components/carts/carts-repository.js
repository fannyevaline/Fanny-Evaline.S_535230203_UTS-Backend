const { Cart } = require('../../../models');

async function getCarts() {
  return Cart.find({});
}

async function getCart(id) {
  return Cart.findById(id);
}

async function createCart(
  product,
  quantity,
  amount,
  available
) {
  return Cart.create({
    product,
    quantity,
    amount,
    available,
  });
}

async function updateCart(
  id,
  product,
  quantity,
  amount,
  available
) {
  return Cart.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        product,
        quantity,
        amount,
        available,
      },
    }
  );
}

async function deleteCart(id) {
  return Cart.deleteOne({ _id: id });
}

module.exports = {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
};
