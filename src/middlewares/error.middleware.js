module.exports = (err ,request, response, next) => {
    const httpStatus = err.status || 500;

    return response.status(httpStatus).send({
        status: httpStatus,
        message: err.message || 'Internal server error'
    });
};