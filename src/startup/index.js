const express = require('express');

// declaramos las variables por afuera para que sean privadas 
// y de uso solo de esta clase.
let _express = null;
let _config = null;

class Server{
    constructor({config, router}){
        _config = config;
        _express = express().use(router);
    }

    start(){
        // esta promese va ser el encargador de inicializar el server
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(_config.APPLICATION_NAME + " API running on port " + _config.PORT);
            })

            resolve(); // ejecutamos el .resolve() para que la promesa termine
        });
    }
}

module.exports = Server;