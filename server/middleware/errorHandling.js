function errorHandling(err, req, res, next) {
    let status
    let message
  
    switch (err.name) {

      case `Data not found`:
        status = 404;
        message = "Data not found";
        break;
  
      default:
          console.log(err)
        status = 500;
        message = "Internal Server Error";
        break;
    }
    res.status(status).json({ message: message });
  }
  
  module.exports = errorHandling;
  