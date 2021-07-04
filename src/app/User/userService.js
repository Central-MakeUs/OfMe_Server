const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


exports.createUser = async function (email, password, checkPassword, nickname) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            // 이메일 중복 확인
            const emailRows = await userProvider.emailCheck(email);
            if (emailRows.length > 0)
                return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
            
            // 비밀번호 재확인
            if (!(password === checkPassword))
                return errResponse(baseResponse.SIGNUP_PASSWORD_CONFIRM);

            // 닉네임 중복 확인
            const nicknameRows = await userProvider.nicknameCheck(nickname);
            if(nicknameRows.length > 0)
                return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);
            
            // 비밀번호 암호화
            const hashedPassword = await crypto
                .createHash("sha512")
                .update(password)
                .digest("hex");

            const insertUserInfoParams = [email, hashedPassword, nickname];

            const connection = await pool.getConnection(async (conn) => conn);

            const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
            console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
            connection.release();
            return response(baseResponse.SUCCESS, {"createUser" : userIdResult[0].insertId});

        } catch (err) {
            await connection.rollback();
            connection.release();
            logger.error(`App - createUser Service error\n: ${err.message}`);
            return errResponse(baseResponse.DB_ERROR);
        }
    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postLogin = async function (email, password) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {

            // 이메일 존재 유무 확인
            const emailRows = await userProvider.emailCheck(email);
            if (emailRows.length < 1)
                return errResponse(baseResponse.LOGIN_EMAIL_NOT_EXIST);
            
            // 계정 상태 확인
            const userInfoRows = await userProvider.accountCheck(email);

            if (userInfoRows[0].status === "Deleted") {
                return errResponse(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT);
            }
            
            // 비밀번호 확인
            const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

            console.log(hashedPassword);
            const passwordRows = await userProvider.passwordCheck(email);
            console.log(passwordRows);

            if (passwordRows[0].password !== hashedPassword) {
                return errResponse(baseResponse.LOGIN_PASSWORD_WRONG);
            }


            //토큰 생성 Service
            let token = await jwt.sign(
                {
                    userId: userInfoRows[0].id,
                }, // 토큰의 내용(payload)
                secret_config.jwtsecret, // 비밀키
                {
                    expiresIn: "365d",
                    subject: "userInfo",
                } // 유효 기간 365일
            );

            console.log(token);

            return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});

        } catch (err) {
            await connection.rollback();
            connection.release();
            logger.error(`App - postLogin Service error\n: ${err.message}`);
            return errResponse(baseResponse.DB_ERROR);
        }
    } catch (err) {
        logger.error(`App - postLogin Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};