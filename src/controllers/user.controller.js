let _userService = null;

class UserController{
    constructor({UserService}) {
        _userService = UserService;
    }


    async get(request, response){
        const {userId} = request.params;
        const user = await _userService.get(userId);
        return response.send(user); // este es un metodo de express.
    }

    async getAll(request, response){
        const users = await _userService.getAll();
        return response.send(users);
    }

    async update(request, response){
        const {body} = request;
        const { userId } = request.params;
        const updateUser = await _userService.update(userId, body);
        return response.send(updateUser);
    }

    async delete(request,response){
        const {userId} = request.params;
        const deleteUser = await _userService.delete(userId);
        return response.send(deleteUser);
    }
}

module.exports = UserController;