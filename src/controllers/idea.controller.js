let _ideaService = null;

class IdeaController {
  constructor({ IdeaService }) {
    _ideaService = IdeaService;
  }

  async get(request, response) {
    const { ideaId } = request.params;
    const idea = await _ideaService.get(ideaId);
    return response.send(idea); // este es un metodo de express.
  }

  async getAll(request, response) {
    const ideas = await _ideaService.getAll();
    return response.send(ideas);
  }

  async create(request, response) {
    const { body } = request;
    const createIdea = await _ideaService.create(body);
    return response.status(201).send(createdIdea);
  }

  async update(request, response) {
    const { body } = request;
    const { ideaId } = request.params;
    const updateIdea = await _ideaService.update(ideaId, body);
    return response.send(updateIdea);
  }

  async delete(request, response) {
    const { ideaId } = request.params;
    const deleteIdea = await _ideaService.delete(ideaId);
    return response.send(deleteIdea);
  }

  async getUserIdea(request, response) {
    const { userId } = request.params;
    const ideas = await _ideaService.getUserIdea(userId);
    return response.send(ideas);
  }

  async upvoteIdea(request, response) {
    const { ideaId } = request.params;
    const idea = await _ideaService.upvoteIdea(ideaId);
    return response.send(idea);
  }

  async downvoteIdea(request, response) {
    const { ideaId } = request.params;
    const idea = await _ideaService.downvoteIdea(ideaId);
    return response.send(idea);
  }
}

module.exports = IdeaController;
