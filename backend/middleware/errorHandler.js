// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err); 
    const statusCode = err.statusCode || 500; 
    res.status(statusCode).json({
        status: "error",
        error: "Something went wrong on the server",
        message: err.message
    });
};
module.exports = errorHandler;