const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const qnaProvider = require("../QnA/qnaProvider");
const qnaService = require("../QnA/qnaService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 질문 리스트 조회 API
 * [GET] /questions
 */
exports.getQuestions = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const questionsRows = await qnaProvider.selectQuestions(userId);

    return res.send(response(baseResponse.SUCCESS, questionsRows));
};

/**
 * API No. 2
 * API Name : 질문 상세 조회 API
 * [GET] /questions/list?sort=&answers=
 */
exports.getQuestionsList = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const {sort, answers} = req.query;
    
    if (sort !== 'O' && sort !== 'D' && sort !== 'T')
        return res.send(response(baseResponse.QNA_SORT_NOT_EXIST));

    if ((0 > answers || answers >= 4))
        return res.send(response(baseResponse.QNA_ANSWERS_NOT_EXIST));

    if (answers === '0') {
        const questionsListRows = await qnaProvider.selectQuestionsList(sort, userId);
        return res.send(response(baseResponse.SUCCESS, questionsListRows));
    }
    else if (answers === '1') {
            const share = 'Y'
            const questionsListRows = await qnaProvider.selectListShare(sort, userId, share);
            return res.send(response(baseResponse.SUCCESS, questionsListRows));
        }
    else if (answers === '2') {
            const share = 'N'
            const questionsListRows = await qnaProvider.selectListShare(sort, userId, share);
            return res.send(response(baseResponse.SUCCESS, questionsListRows));
    }
    else if (answers === '3') {
        const questionsListRows = await qnaProvider.selectListNoAnswer(sort, userId);
        return res.send(response(baseResponse.SUCCESS, questionsListRows));
    }


    return res.send(response(baseResponse.QNA_NOT_EXIST));
};

/**
 * API No. 3
 * API Name : 답변 조회 API
 * [GET] /questions/:questionId/answers
 */
exports.getAnswers = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const stageThreeRows = await conceptProvider.selectConceptStageThree();

    return res.send(response(baseResponse.SUCCESS, stageThreeRows));
};

/**
 * API No. 4
 * API Name : 답변 등록 API
 * [POST] /questions/:questionId/answers
 */
exports.postAnswers = async function (req, res) {
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
 * API Name : 답변 수정 API
 * [PATCH] /questions/:questionId/answers
 */
exports.patchAnswers = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const conceptId = req.body.conceptId;

    const getConceptRows = await conceptProvider.getConcept(conceptId);
    if (getConceptRows.length > 0) {
        const selectConceptIngRows = await conceptProvider.selectConceptIng(conceptId);

        if (selectConceptIngRows.length > 0)
            return res.send(response(baseResponse.CONCEPT_POST_EXIST));
        const createConceptRows = await conceptService.createConcept(userId, conceptId);
        return res.send(response(baseResponse.SUCCESS));
    } else
        return res.send(response(baseResponse.CONCEPT_POST_NOT_EXIST));
};

/**
 * API No. 6
 * API Name : 답변 삭제 API
 * [DELETE] /questions/:questionId/answers
 */
exports.deleteAnswers = async function (req, res) {
    const getConceptIdRows = await conceptProvider.getConceptId();
    if (getConceptIdRows.length > 0) {
        return res.send(response(baseResponse.SUCCESS, getConceptIdRows));
    } else
        return res.send(response(baseResponse.DB_ERROR));
};