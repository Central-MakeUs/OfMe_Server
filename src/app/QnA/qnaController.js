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
    
    const questionId = req.params.questionId;
    const selectAnswersRows = await qnaProvider.selectAnswers(userId, questionId);

    if (selectAnswersRows.length > 0)
        return res.send(response(baseResponse.SUCCESS, selectAnswersRows));
    else
        return res.send(response(baseResponse.QNA_QUESTION_NOT_EXIST));
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

    const {questionId, answer, share} = req.body;

    if (share !== 'Y' && share !== 'N') return res.send(response(baseResponse.QNA_SHARE_NOT_EXIST));
    if (share.length < 1) return res.send(response(baseResponse.QNA_SHARE_NOT_EXIST));
    if (questionId.length < 1) return res.send(response(baseResponse.QNA_QUESTIONID_NOT_EXIST));
    if (answer.length < 1) return res.send(response(baseResponse.QNA_ANSEWER_NOT_EXIST));
    if (answer.length > 290) return res.send(response(baseResponse.QNA_ANSEWER_LENGTH_NOT_EXIST));

    const getQuestionIsRows = await qnaProvider.selectQuestionIs(questionId);
    if (getQuestionIsRows < 1) return res.send(response(baseResponse.QNA_QUESTION_IS_NOT_EXIST));

    const getAnswersIsRows = await qnaProvider.selectAnswersIs(questionId, userId);
    if (getAnswersIsRows.length > 0) return res.send(response(baseResponse.QNA_ANSEWER_EXIST));

    const postAnswersRows = await qnaService.createAnswers(questionId, userId, answer, share);

    return res.send(postAnswersRows);
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

    const {questionId, answer, share} = req.body;

    if (share !== 'Y' && share !== 'N') return res.send(response(baseResponse.QNA_SHARE_NOT_EXIST));
    if (share.length < 1) return res.send(response(baseResponse.QNA_SHARE_NOT_EXIST));
    if (questionId.length < 1) return res.send(response(baseResponse.QNA_QUESTIONID_NOT_EXIST));
    if (answer.length < 1) return res.send(response(baseResponse.QNA_ANSEWER_NOT_EXIST));
    if (answer.length > 290) return res.send(response(baseResponse.QNA_ANSEWER_LENGTH_NOT_EXIST));

    const getQuestionIsRows = await qnaProvider.selectQuestionIs(questionId);
    if (getQuestionIsRows < 1) return res.send(response(baseResponse.QNA_QUESTION_IS_NOT_EXIST));

    const getAnswersIsRows = await qnaProvider.selectAnswersIs(questionId, userId);
    if (getAnswersIsRows.length < 1) return res.send(response(baseResponse.QNA_ANSEWER_IS_NOT_EXIST));

    const updateAnswersRows = await qnaService.updateAnswers(getAnswersIsRows[0].id, userId, answer, share, questionId);

    return res.send(updateAnswersRows);
};

/**
 * API No. 6
 * API Name : 답변 삭제 API
 * [DELETE] /questions/:questionId/answers
 */
exports.deleteAnswers = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const {questionId} = req.body;

    const getQuestionIsRows = await qnaProvider.selectQuestionIs(questionId);
    if (getQuestionIsRows < 1) return res.send(response(baseResponse.QNA_QUESTION_IS_NOT_EXIST));

    const getAnswersIsRows = await qnaProvider.selectAnswersIs(questionId, userId);
    if (getAnswersIsRows.length < 1) return res.send(response(baseResponse.QNA_ANSEWER_IS_NOT_EXIST));

    const deleteAnswersRows = await qnaService.deleteAnswers(getAnswersIsRows[0].id);

    return res.send(deleteAnswersRows);
};