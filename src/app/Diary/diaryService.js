const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const diaryProvider = require("./diaryProvider");
const diaryDao = require("./diaryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createDiary = async function (userId, title, character, text, img, createAt) {
    try {
        const insertDiaryParams = [userId, title, character, text, createAt];
        let DiaryImgList = [];
        const connection = await pool.getConnection(async (conn) => conn);

        const DiaryResult = await diaryDao.insertDiaryInfo(connection, insertDiaryParams);
        if (img.length > 0) {
            for (i in img){
                DiaryImgList.push([DiaryResult.insertId, createAt, img[i]]);
            }
            console.log([DiaryImgList]);
            await diaryDao.insertDiaryImg(connection, [DiaryImgList]);
        }
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};