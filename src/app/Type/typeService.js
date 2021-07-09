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


// exports.createUser = async function (email, password, checkPassword, nickname) {
//     try {
//         const connection = await pool.getConnection(async (conn) => conn);
//         try {
//             // 이메일 중복 확인
//             const emailRows = await userProvider.emailCheck(email);
//             if (emailRows.length > 0)
//                 return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
            
//             // 비밀번호 재확인
//             if (!(password === checkPassword))
//                 return errResponse(baseResponse.SIGNUP_PASSWORD_CONFIRM);

//             // 닉네임 중복 확인
//             const nicknameRows = await userProvider.nicknameCheck(nickname);
//             if(nicknameRows.length > 0)
//                 return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);
            
//             // 비밀번호 암호화
//             const hashedPassword = await crypto
//                 .createHash("sha512")
//                 .update(password)
//                 .digest("hex");

//             const insertUserInfoParams = [email, hashedPassword, nickname];

//             await connection.beginTransaction();

//             const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
//             console.log(`추가된 회원 : ${userIdResult[0].insertId}`)

//             await connection.commit();
//             connection.release();

//             return response(baseResponse.SUCCESS, {"createUser" : userIdResult[0].insertId});

//         } catch (err) {
//             await connection.rollback();
//             connection.release();
//             logger.error(`App - createUser Service error\n: ${err.message}`);
//             return errResponse(baseResponse.DB_ERROR);
//         }
//     } catch (err) {
//         logger.error(`App - createUser Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// };
