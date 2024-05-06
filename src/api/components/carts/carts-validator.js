const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createCart: {
    body: {
      product: joi.string().min(1).max(100).required().label('Product'),
      quantity: joi.number().required().label('Quantity'),
      amount: joi.number().required().label('Amount'),
      available: joi.string().valid('yes', 'no').required().label('Availability'),
    },
  },

  updateCart: {
    body: {
      product: joi.string().min(1).max(100).required().label('Product'),
      quantity: joi.number().required().label('Quantity'),
      amount: joi.number().required().label('Amount'),
      available: joi.string().valid('yes', 'no').required().label('Availability'),
    },
  },

};
