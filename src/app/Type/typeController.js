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

// exports.postTypes = async function(req,res) {

//     const userId = req.verifiedToken.userId;

// }