const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const conceptProvider = require("../Concept/conceptProvider");
const conceptService = require("../Concept/conceptService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 1단계 테스트 문제 조회 API
 * [GET] /concepts/stageOne
 */
exports.getConceptStageOne = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const stageOneRows = await conceptProvider.selectConceptStageOne();

    return res.send(response(baseResponse.SUCCESS, stageOneRows));
};

/**
 * API No. 2
 * API Name : 2단계 테스트 문제 조회 API
 * [GET] /concepts/stageTwo
 */
exports.getConceptStageTwo = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));


    return res.send(response(baseResponse.SUCCESS, selectDiaryRows));
};

/**
 * API No. 3
 * API Name : 3단계 테스트 문제 조회 API
 * [GET] /concepts/stageThree
 */
exports.getConceptStageThree = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));



    return res.send(signUpResponse);
};