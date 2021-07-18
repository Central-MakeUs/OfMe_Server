const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const conceptProvider = require("./qnaProvider");
const conceptDao = require("./qnaDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createConcept = async function (userId, conceptId) {
    try {
        const insertConceptParams = [userId, conceptId];

        const connection = await pool.getConnection(async (conn) => conn);
        const ConceptResult = await conceptDao.insertConcept(connection, insertConceptParams);
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - createConcept Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};