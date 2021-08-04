let _homeService = null;

class HomeController {
    // El HomeService lo inyecta awilix, 
    // al momento de levantar el controller, va a ver 
    // que tenemos una dependencia que es el servicio. 
    // Automaticamente se la va a inyectar.
    // EL nombre debe coincidir con el nombre que colocamos 
    // en el container cuando utilizamos el metodo .register
    // EN nuestro caso, es la key HomeService que pasamos en el register.
    constructor({HomeService}){
        _homeService = HomeService; // este homeService viene por inyeccion de dependencia  
        //no se utiliza this, xque eso seria que la propiedad es de la clase 
        // y no es asi. Al declararlo por afuera, nos aseguramos de que _homeservice
        // sea de tipo ŕivado y solamente sea utilizado en la clase homeController.
    }

    index(request, response){
        return response.send(_homeService.index());
    }
}

module.exports = HomeController;