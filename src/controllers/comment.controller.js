let _commentService = null;

class CommentController {
  constructor({ CommentService }) {
    _commentService = CommentService;
  }

  async get(request, response) {
    const { commentId } = request.params;
    const comment = await _commentService.get(commentId);
    return response.send(comment); // este es un metodo de express.
  }

  async update(request, response) {
    const { body } = request;
    const { commentId } = request.params;
    const updateComment = await _commentService.update(commentId, body);
    return response.send(updateComment);
  }

  async delete(request, response) {
    const { commentId } = request.params;
    const deleteComment = await _commentService.delete(commentId);
    return response.send(deleteComment);
  }

  async getIdeaComments(request, response) {
    const { ideaId } = request.params;
    const comments = await _commentService.getIdeaComments(ideaId);
    return response.send(comments);
  }

  async createComment(request, response) {
    const { body } = request;
    const { ideaId } = request.params;
    const { id: userId} = request.user;
    const createdComment = await _commentService.createComment(body, ideaId, userId);
    return response.status(201).send(createdComment);
  }
}

module.exports = CommentController;
