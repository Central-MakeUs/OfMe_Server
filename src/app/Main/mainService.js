const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const mainProvider = require("./mainProvider");
const mainDao = require("./mainDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

/**
 * API No. 2
 * API Name : 데일리 다이어리 작성 API
 */
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

            await diaryDao.insertDiaryImg(connection, [DiaryImgList]);
        }
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createDiary Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

/**
 * API No. 3
 * API Name : 데일리 다이어리 수정 API
 */
exports.updateDiary = async function (selectDiaryImgRows, id, userId, title, character, text, img, createAt) {
    try {
        const insertDiaryParams = [title, character, text, createAt, id];
        let DiaryImgList = [];
        const connection = await pool.getConnection(async (conn) => conn);

        const updateDiary = await diaryDao.updateDiary(connection, insertDiaryParams);

        if (selectDiaryImgRows.length > 0) {
            for (i in img){
                DiaryImgList = [createAt, img[i], selectDiaryImgRows[i].id];
                await diaryDao.updateDiaryImg(connection, DiaryImgList);
            }
        }
        
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - updateDiary Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

/**
 * API No. 4
 * API Name : 데일리 다이어리 삭제 API
 */
exports.deleteDiary = async function (diaryId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const deleteDiary = await diaryDao.deleteDiary(connection, diaryId);
        const deleteDiaryImg = await diaryDao.deleteDiaryImg(connection, diaryId);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - updateDiary Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};