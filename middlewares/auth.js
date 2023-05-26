require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require("../errors");
const User = require('../models/user');

const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('You are not authorized');
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select('-password');

    req.user = user;

    next();
  } catch(error) {
    throw new UnauthenticatedError('No token provided');
  }
}

module.exports = authorizationMiddleware;