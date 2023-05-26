const NotFoundError = require('./not-found');
const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
  NotFoundError,
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError
}