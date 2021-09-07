const mcache = require("memory-cache");
const { CACHE_KEY } = require("../config");

module.exports = function (duration) {
  return (request, response, next) => {
    const key = CACHE_KEY + (request.originalUrl || (request.baseUrl + request.url));
    const cachedBody = mcache.get(key);

    if (cachedBody) {
      return response.send(JSON.parse(cachedBody));
    } else {
      // si no esta cacheada
      response.sendResponse = response.send;
      // esto es un truquito, cuando se ejecute el send
      // se le tiene que enviar un body. Este
      // se guardara automaticamente en la cache
      response.send = (body) => {
        mcache.put(key, body, duration * 1000);
        response.sendResponse(body);
      };
      next();
    }
  };
};
