module.exports = function(request,response, next){
    const queryStrings = request.query; // todos los queryString que enviemos van a pasar por aca

    for(const key in queryStrings){

        if(!isNaN(queryStrings[key])){
            queryStrings[key] = parseInt(queryStrings[key]);
        }
    }

    request.query = queryStrings;
    next();
}