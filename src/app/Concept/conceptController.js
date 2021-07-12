const jwtMiddleware = require("../../../config/jwtMiddleware");
const conceptProvider = require("../Concept/conceptProvider");
const conceptService = require("../Concept/conceptService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 3단계 테스트 문제 조회 API
 * [GET] /concepts/:stage
 */
exports.getConceptStage = async function (req, res) {
    /**
     * params: stage
     */
    const stage= req.params.stage;

    if (!stage)
        return res.send(response(baseResponse.CONCEPT_NOT_EXIST));
    else if (stage in (1,2,3))
        return res.send(response(baseResponse.CONCEPT_STAGE_NOT_EXIST));
    else
        const signUpResponse = await conceptProvider.createUser(stage);

    return res.send(signUpResponse);
};