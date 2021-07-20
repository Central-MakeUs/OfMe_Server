const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const qnaProvider = require("./qnaProvider");
const qnaDao = require("./qnaDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createAnswers = async function (questionId, userId, answer, share) {
    try {
        const createAnswersParams = [questionId, userId, answer, share];
        const createRewardParams = [userId, 2, '답변 공유'];

        const connection = await pool.getConnection(async(conn) => conn);
        try {

        await connection.beginTransaction();
        
        const answersResult = await qnaDao.createAnswers(connection, createAnswersParams);
        if (share === 'Y')
            await qnaDao.createReward(connection, createRewardParams);
        await connection.commit();
        connection.release();

        console.log(answersResult);
        return response(baseResponse.SUCCESS);

        } catch (err) {
            await connection.rollback();
            connection.release();
            logger.error(`App - logout Service error\n: ${err.message}`);
            return errResponse(baseResponse.DB_ERROR);
        }
    } catch (err) {
        logger.error(`App - createConcept Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateAnswers = async function (answerId, userId, answer, share, questionId) {
    try {
        const createAnswersParams = [answer, share, answerId];
        const createRewardParams = [userId, 2, '답변 공유'];

        const connection = await pool.getConnection(async(conn) => conn);
        try {

        await connection.beginTransaction();
        
        const answersIsResult = await qnaProvider.selectAnswersIs(questionId, userId);

        if (answersIsResult[0].share === 'N' && share === 'Y')
            await qnaDao.createReward(connection, createRewardParams);

        const answersResult = await qnaDao.updateAnswers(connection, createAnswersParams);

        await connection.commit();
        connection.release();

        return response(baseResponse.SUCCESS);

        } catch (err) {
            await connection.rollback();
            connection.release();
            logger.error(`App - logout Service error\n: ${err.message}`);
            return errResponse(baseResponse.DB_ERROR);
        }
    } catch (err) {
        logger.error(`App - createConcept Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteAnswers = async function (answerId) {
    try {
        const deleteAnswersParams = [answerId];

        const connection = await pool.getConnection(async(conn) => conn);

        const deleteAnswersResult = await qnaDao.deleteAnswers(connection, deleteAnswersParams);

        connection.release();

        return response(baseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - createConcept Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};