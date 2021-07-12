const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const typeProvider = require("./typeProvider");
const typeDao = require("./typeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


exports.postAndGetTypeResult = async function (userId, typeId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            
            // 유형 결과 조회
            const getTypeResult = await typeProvider.retrieveTypeResult(typeId);
            
            await connection.beginTransaction();

            // 유형 결과 등록
            const postUserType = await typeDao.postUserType(connection, userId, typeId);

            await connection.commit();
            connection.release();

            return getTypeResult;

        } catch (err) {
            await connection.rollback();
            connection.release();
            logger.error(`App - postAndGetTypeResult Service error\n: ${err.message}`);
            return errResponse(baseResponse.DB_ERROR);
        }
    } catch (err) {
        logger.error(`App - postAndGetTypeResult Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
