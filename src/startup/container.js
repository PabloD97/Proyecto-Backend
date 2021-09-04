const { createContainer, asClass, asValue, asFunction } = require("awilix");
// asClass -> ayuda a inyectar un objeto como una classe
// asValue -> para inyectar un objeto como un valor
// asFunction -> nos va ayudar a inyectar un objeto como una funcion

// config
const config = require("../config");
const app = require('.')

// services
const { HomeService, UserService, IdeaService, CommentService } = require("../services");


// controllers
const { HomeController, UserController, IdeaController, CommentController } = require("../controllers");

// routes
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { User, Idea, Comment } = require('../models')
const container = createContainer();

// repositories
const { UserRepository, IdeaRepository, CommentRepository } = require('../repositories');

container
  .register({
    // configuracion principal de la aplicacion
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton(),

  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(), //-> lo pasamos como funcion, xque fue una funcion lo que exportamos de home.routes.js
  })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton() 
  });

module.exports = container;
