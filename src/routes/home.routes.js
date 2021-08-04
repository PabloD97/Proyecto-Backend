const { Router } = require('express');

module.exports = function({HomeController}){
    const router = Router();

    // No vamos a invocar el metodo index, solo vamos a 
    // pasat la atribucion de la funcion y que express se encargue 
    // de ejecutarlo.
    // Cuando hacemos esto express ejecuta la funcion
    // y le pasa su scope, pero como lo configuramos en el container, 
    // eso no va a pasar ahora. Va a mantener el scope de la clase.
    router.get('/', HomeController.index); 

    return router;
}