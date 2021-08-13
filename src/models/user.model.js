const mongoose = require("mongoose");
const { Schema } = mongoose;
//-> de aca, vamos a sacar algunos metodos que nos van a servir para encriptar la contraseña de los usuario
// y hacer la comparacion con la contra encriptada. Y tambien para general el salt
// compareSync -> nos ayuda a comparar las contraseñas una vez encriptadas
// hashSync -> ayuda a crear un hash para una contraseña
// genSaltSync -> genera un salt que se le agrega al hash de una contraseña
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
});

//Metodos del schema por si queremos encriptar la logica
// o aplicar alguna logica si queremos que se guarde el
// documento.
// Mongoose nos provee algunos Hooks que podemos utilizar
// .pre()

// Se sobreescribira el metodo toJSON
// que mongoose utiliza y llama cada vez que se va a devolver
// un objeto del documento.
// Lo hacemos para eliminar el campo contraseña
UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
  // de esta manera nos aseguramos que el campo 'password' haya sido eliminado
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

// Debe ser una funcion normal para que no se pierda el scope de mongoose
// Pro: Verificar que la contraseña haya sido hasheada con su correspondiente salt
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    return next();
  }

  const salt = genSaltSync(10);
  const hashPassword = hashSync(user.password, salt);
  user.password = hashPassword;
  next();
});

module.exports = mongoose.model("user", UserSchema);
