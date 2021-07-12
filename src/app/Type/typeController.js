const jwtMiddleware = require("../../../config/jwtMiddleware");
const typeProvider = require("../Type/typeProvider");
const typeService = require("../Type/typeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");


exports.getTypes = async function (req, res) {
    
    const getTypesResponse = await typeProvider.retrieveTypes();
    return res.send(getTypesResponse);
};

exports.postTypes = async function(req,res) {

    const userId = req.verifiedToken.userId;
    const typeId = req.params.typeId;

    if(!typeId)
        return res.send(response(baseResponse.USERTYPE_TYPEID_EMPTY));
    else if(typeId < 1 || typeId > 16)
        return res.send(response(baseResponse.USERTYPE_TYPEID_ERROR));
    
    const postAndGetTypeResultResponse = await typeService.postAndGetTypeResult(userId, typeId);

    return res.send(postAndGetTypeResultResponse);
};

exports.getTypeTests = async function(req,res) {
    
    const getTypeTestsResponse = await typeProvider.retrieveTypeTests();
    return res.send(getTypeTestsResponse);
}

// exports.postTestTypes = async function(req,res) {
    

// }