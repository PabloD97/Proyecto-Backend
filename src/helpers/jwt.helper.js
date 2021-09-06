const {sign} = require('jsonwebtoken'); // sirve para firmar los tokens
const {JWT_SECRET} = require('../config'); 

// esto se puede hacer gracias a esto es un objeto
// gracias al datNotation
module.exports.generateToken = function(user){
    // como primer parametro vamos a pasar el objeto que queramos 
    // encriptar, como segunda nuestro JWT_SECRET y como tercera
    // que es opciona, el tiempo de expiracion de nuestro token
    // sign -> nos va retornar un token, dependiendo que tan grande sea nuestro objeto
    // eso de grande va ser el token.
    return sign({user}, JWT_SECRET, {expiresIn: "4h"}); 
}