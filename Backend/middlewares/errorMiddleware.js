const errorMiddleware = (err, req, res, next) => {
    console.error('Error occurred:', err);
  
    // Default status code and error message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
  
    // If error is a database connection error
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      statusCode = 503;
      message = 'Database connection lost. Please try again later.';
    }
  
    // Set the HTTP status code and send JSON response
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = errorMiddleware;
  