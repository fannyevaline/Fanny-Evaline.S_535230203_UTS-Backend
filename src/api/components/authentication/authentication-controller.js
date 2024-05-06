const {
  errorResponder,
  errorTypes,
} = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const attempts = new Map();

function incrementAttemptCount(email) {
  const attemptCount = attempts.get(email) || 0;
  attempts.set(email, attemptCount + 1);
}

function isAttemptLimitReached(email) {
  const attemptCount = attempts.get(email) || 0;
  return attemptCount >= 5;
}

async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    if (isAttemptLimitReached(email)) {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many failed login attempts.'
      );
    }

    const loginSuccess =
      await authenticationServices.checkLoginCredentials(
        email,
        password
      );

    if (!loginSuccess) {
      incrementAttemptCount(email);
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    } else {
      attempts.delete(email);
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
