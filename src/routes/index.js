const express = require("express");

//middleware que vamos a inyectar
const cors = require("cors");
const helmet = require("helmet"); // leer la documentacion de helmet.js
const compression = require("compression"); // ayuda a comprimir las peticiones HTTP para que sea mas rapido
require("express-async-errors"); // ayuda a capturar en un middleware las excepciones asincronas que producen las promesas normalmente.

const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");

module.exports = function ({
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes,
  AuthRoutes,
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  // con use podemos pasar los middleware que querramos utilizar
  // cors(aca va la configuracion) -> investigar despues
  // express.json() -> comvierte las peticiones de tipo POST en un body y les pone
  // una propiedad body a nuestro json que va contener lo que enviemos en tipo json.
  // similar al bodyParser
  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());
  // esto son los default middleware.

  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/user", UserRoutes);
  apiRoutes.use("/idea", IdeaRoutes);
  apiRoutes.use("/comment", CommentRoutes);
  apiRoutes.use("/auth", AuthRoutes);


  apiRoutes.use(NotFoundMiddleware);
  apiRoutes.use(ErrorMiddleware);

  router.use("/v1/api", apiRoutes);
  // ESto lo tenemos que configurar una sola vez para cada una de las rutas
  // luego ya con la practica se vuelve mas facil.

  // Gracias a tener todo ordenador, va ser mas facil escalar.

  return router;
};
