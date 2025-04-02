const {expressjwt: jwt} = require('express-jwt');
const {AppError} = require('./errorHandler');

// Middleware: JWT Token verification
const authenticateJwt = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

// Middleware: Admin verification
const isAdmin = (req, res, next) => {
    // req.auth is given by express-jwt and contains decrypted token data
    if (req.auth && req.auth.role === 'admin') {
        return next();
    }

    throw new AppError('Access denied: you need to be admin', 403);
};

module.exports = {
    authenticateJwt,
    isAdmin,
}