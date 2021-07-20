const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const mypageProvider = require("../Mypage/mypageProvider");
const mypageService = require("../Mypage/mypageService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 마이 페이지 조회 API
 * [GET] /mypages
 */
exports.getMypage = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const selectMypageRows = await mypageProvider.selectMypage(userId);
    
    return res.send(response(baseResponse.SUCCESS, selectMypageRows));
};

/**
 * API No. 2
 * API Name : 내 정보 조회 API
 * [GET] /mypages/details
 */
exports.getMypageDetail = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const selectMypageDetailRows = await mypageProvider.selectMypageDetail(userId);
    if (selectMypageDetailRows.length <= 0) return baseResponse.LOGIN_WITHDRAWAL_ACCOUNT;

    return res.send(response(baseResponse.SUCCESS, selectMypageDetailRows));
};

/**
 * API No. 3
 * API Name : 내 정보 수정 API
 * [PATCH] /mypages/details
 */
exports.patchMypageDetail = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const selectMypageRows = await conceptProvider.selectMypage(userId);

    return res.send(response(baseResponse.SUCCESS, selectMypageRows));
};

/**
 * API No. 4
 * API Name : 비밀번호 수정 API
 * [PATCH] /mypages/passwords
 */
exports.patchPassWord = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const { password, checkPassword } = req.body;

    if(!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    
    if(password.length < 8 || password.length > 20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    
    if(!checkPassword)
        return res.send(response(baseResponse.SIGNUP_CHECKPASSWORD_EMPTY));
    
    if (!(password === checkPassword))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_CONFIRM));

    const updateMypageDetailRows = await mypageService.updateMypageDetail(userId, password, checkPassword);

    if (updateMypageDetailRows.affectedRows === 0)
        return res.send(response(baseResponse.SIGNUP_USER_PASSWORD_CONFIRM));

    return res.send(response(baseResponse.SUCCESS));
};