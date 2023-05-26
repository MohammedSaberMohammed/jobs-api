const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  };

  if (err instanceof CustomAPIError) {
    const { statusCode, message: msg } = err;
    
    return res.status(statusCode).json({ msg })
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(error => error.message).join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if(err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`,
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  // return res
  // .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // .send({ err })
  return res
    .status(customError.statusCode)
    .send({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware;