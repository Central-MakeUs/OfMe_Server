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

    const selectMypageRows = await conceptProvider.selectMypage(userId);

    return res.send(response(baseResponse.SUCCESS, selectMypageRows));
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

    const selectMypageRows = await conceptProvider.selectMypage(userId);

    return res.send(response(baseResponse.SUCCESS, selectMypageRows));
};