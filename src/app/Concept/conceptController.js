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
 * [GET] /concepts/stageTwo/:keywordId
 */
exports.getConceptStageTwo = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const keywordId = req.params.keywordId;
    const stageTwoRows = await conceptProvider.selectConceptStageTwo(keywordId);

    if (stageTwoRows.length < 1) return res.send(response(baseResponse.CONCEPT_KEYWORD_NOT_EXIST));
    else return res.send(response(baseResponse.SUCCESS, stageTwoRows));
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

    const stageThreeRows = await conceptProvider.selectConceptStageThree();

    return res.send(response(baseResponse.SUCCESS, stageThreeRows));
};

/**
 * API No. 4
 * API Name : 컨셉 정보 조회 API
 * [GET] /concepts/:conceptId
 */
exports.getConcept = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const conceptId = req.params.conceptId;
    const getConceptRows = await conceptProvider.getConcept(conceptId);

    if (getConceptRows.length > 0) return res.send(response(baseResponse.SUCCESS, getConceptRows));
    else return res.send(response(baseResponse.CONCEPT_NOT_EXIST));
};

/**
 * API No. 5
 * API Name : 컨셉 등록 API
 * [POST] /concepts
 */
exports.postConcept = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));
    
    const selectConceptIngRows = await conceptProvider.selectConceptIng(userId);
    if (selectConceptIngRows.length > 0) {
        return res.send(response(baseResponse.CONCEPT_POST_EXIST));
    }

    const { testList } = req.body;
    let conceptId = 0;

    if (testList[0] == 1 && testList[1] == 1){ // 모스
        conceptId = 1;
    } else if (testList[0] == 1 && testList[1] == 2){ // 리아
        conceptId = 3;
    } else if (testList[0] == 1 && testList[1] == 3){ // 시애나
        conceptId = 5;
    } else if (testList[0] == 1 && testList[1] == 4){ // 헤더
        conceptId = 6;
    } else if (testList[0] == 2 && testList[1] == 1){ // 로하
        conceptId = 7;
    } else if (testList[0] == 2 && (testList[1] == 2 || testList[1] == 4)){ // 제이비
        conceptId = 2;
    } else if (testList[0] == 2 && testList[1] == 3){ // 이노
        conceptId = 4;
    } else if (testList[0] == 3 && testList[1] == 1){ // 주주
        conceptId = 10;
    } else if (testList[0] == 3 && testList[1] == 2){ // 옐로우
        conceptId = 11;
    } else if (testList[0] == 3 && testList[1] == 3){ // 빈
        conceptId = 14;
    } else if (testList[0] == 3 && testList[1] == 4){ // 베어
        conceptId = 17;
    } else if (testList[0] == 4 && testList[1] == 1){ // 로키
        conceptId = 8;
    } else if (testList[0] == 4 && testList[1] == 2){ // 마크
        conceptId = 12;
    } else if (testList[0] == 4 && (testList[1] == 3 || testList[1] == 4)){ // 피즈
        conceptId = 16;
    } else if (testList[0] == 5 && testList[1] == 1){ // 폴
        conceptId = 9;
    } else if (testList[0] == 5 && testList[1] == 2){ // 오앤
        conceptId = 19;
    } else if (testList[0] == 5 && (testList[1] == 3 || testList[1] == 4)){ // 하이
        conceptId = 15;
    } else if (testList[0] == 6 && testList[1] == 1){ // 크리스탈
        conceptId = 18;
    } else if (testList[0] == 6 && testList[1] == 2){ // 로키
        conceptId = 8;
    } else if (testList[0] == 6 && testList[1] == 3){ // 폴
        conceptId = 9;
    } else if (testList[0] == 6 && testList[1] == 4){ // 리아
        conceptId = 3;
    } else if (testList[0] == 7 && testList[1] == 1){ // 이노
        conceptId = 4;
    } else if (testList[0] == 7 && testList[1] == 2){ // 옐로우
        conceptId = 11;
    } else if (testList[0] == 7 && testList[1] == 3){ // 크리스탈
        conceptId = 18;
    } else if (testList[0] == 7 && testList[1] == 4){ // 유우
        conceptId = 20;
    } else if (testList[0] == 8 && testList[1] == 1){ // 시애나
        conceptId = 5;
    } else if (testList[0] == 8 && (testList[1] == 2 || testList[1] == 4)){ // 마크
        conceptId = 12;
    } else if (testList[0] == 8 && testList[1] == 3){ // 오앤
        conceptId = 19;
    } else if (testList[0] == 9 && testList[1] == 1){ // 로하
        conceptId = 7;
    } else if (testList[0] == 9 && (testList[1] == 2 || testList[1] == 3)){ // 베어
        conceptId = 17;
    } else if (testList[0] == 9 && testList[1] == 4){ // 피즈
        conceptId = 16;
    } else if (testList[0] == 10 && (testList[1] == 1 || testList[1] == 4)){ // 유우
        conceptId = 20;
    } else if (testList[0] == 10 && testList[1] == 2){ // 빈
        conceptId = 14;
    } else if (testList[0] == 10 && testList[1] == 3){ // 뮤즈
        conceptId = 13;
    } else if (testList[0] == 11 && testList[1] == 1){ // 하이
        conceptId = 15;
    } else if (testList[0] == 11 && testList[1] == 2){ // 제이비
        conceptId = 2;
    } else if (testList[0] == 11 && testList[1] == 3){ // 주주
        conceptId = 10;
    } else if (testList[0] == 11 && testList[1] == 4){ // 리아
        conceptId = 3;
    } else if (testList[0] == 7 && (testList[1] == 1 || testList[1] == 3)){ // 모스
        conceptId = 1;
    } else if (testList[0] == 7 && testList[1] == 2){ // 헤더
        conceptId = 6;
    } else if (testList[0] == 7 && testList[1] == 4){ // 뮤즈
        conceptId = 13;
    }

    const postConceptRows = await conceptService.createConcept(userId, conceptId);

    if (postConceptRows.affectedRows == 1) {
        return res.send(response(baseResponse.SUCCESS, {"conceptId": conceptId}));
    } else
        return res.send(response(baseResponse.CONCEPT_POST_NOT_EXIST));
};

/**
 * API No. 6
 * API Name : 모든 컨셉 인덱스 조회 API
 * [GET] /concepts/all
 */
exports.getConceptId = async function (req, res) {
    const getConceptIdRows = await conceptProvider.getConceptId();
    if (getConceptIdRows.length > 0) {
        return res.send(response(baseResponse.SUCCESS, getConceptIdRows));
    } else
        return res.send(response(baseResponse.DB_ERROR));
};