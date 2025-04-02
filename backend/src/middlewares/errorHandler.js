const errorHandler = (err, req, res, next) => {
    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
    }

    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        status: "ERROR 💥 " + statusCode,
        message: "Error caught by the middleware: " + err.message
    });
};

module.exports = {
    errorHandler
};