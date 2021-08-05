const { createContainer, asClass, asValue, asFunction } = require("awilix");
// asClass -> ayuda a inyectar un objeto como una classe
// asValue -> para inyectar un objeto como un valor
// asFunction -> nos va ayudar a inyectar un objeto como una funcion

// config
const config = require("../config");
const app = require('.')

// services
const { HomeService } = require("../services");

// controllers
const { HomeController } = require("../controllers");

// routes
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { User, Idea, Comment } = require('../models')
const container = createContainer();

container
  .register({
    // configuracion principal de la aplicacion
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(), //-> lo pasamos como funcion, xque fue una funcion lo que exportamos de home.routes.js
  })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
  });

module.exports = container;
