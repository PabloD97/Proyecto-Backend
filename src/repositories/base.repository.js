class BaseRepository{
    // Vamos a pasar el modelo/entidad de mongodb 
    // con la que va a interactuar;
    constructor(model){
        this.model = model;
    }

    // para obtener un documento de mondgo
    async get(id){
        return await this.model.findById(id)
    }

    async getAll(){
        return await this.model.find();
    }

    async create(entity){
        return await this.model.create(entity);
    }

    async update(id, entity){
        return await this.model.findByIdAndUpdate(id, entity, {new: true}); //{new: true} -> hace que mongose nos retorne la entidad actualizada
    }

    async delete(id){
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;