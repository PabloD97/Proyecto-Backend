const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  idea: { type: String, require: true },
  comment: {type: String, require: true},
  description: { type: String },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
    autopopulate: true,
  }
});

// Antes de exportarlo, es buena practica configurar los 
// plugin. Son metodos que le dan mas poder a mongoose como tal.
// El autopopulate, se podria haber hecho sin tener que instalar 
// la dependencia. Pero eso implica que cada vez que haga un find, 
// habria que relacionarlo con la entidad haciendo populate.
// Sin embargo poniendo en la configuraciion de schema 
// autopopulate: true, ya con eso nos trae la propiedad que esta relacionada
// no siempre es recomendable hacer esto.
CommentSchema.plugin(require('mongoose-autopopulate'));

// Puede ir cualquier nombre en el primer parametro, 
// pero se recomienda poner el nobre del schema en minuscula.
module.exports = mongoose.model('comment', CommentSchema);
