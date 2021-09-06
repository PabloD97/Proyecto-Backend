const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function (request, response, next) {
  const token = request.headers["authorization"];
  if (!token) {
    const error = new Error();
    error.message = "Token must be sent";
    error.status = 400;
    throw error;
  }

  //si hay token, debemos verificar con el metodo
  // verify que nos brinda jwt
  jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
    if (err) {
      const error = new Error();
      error.message = "Invaled token";
      error.status = 401;
      throw error;
    }

    request.user = decodedToken.user;
    next();
  });
};
