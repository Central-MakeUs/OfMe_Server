const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const diaryProvider = require("../Diary/diaryProvider");
const diaryService = require("../Diary/diaryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 데일리 다이어리 조회 API
 * [GET] /diarys?year=&months=&days=
 */
exports.getDiarys = async function (req, res) {
    /**
     * queryString: years, months, days
     */
    const userId = req.verifiedToken.userId;
    const {years, months, days} = req.query;
    const createAt = years+'-'+months+'-'+days;

    const userRows = await userProvider.getUser(userId);

    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const selectDiaryRows = await diaryProvider.selectDiary(userId, createAt);
    console.log(!selectDiaryRows);
    if(selectDiaryRows.length < 1) return res.send(response(baseResponse.DIARY_NOT_EXIST));
    else return res.send(response(baseResponse.SUCCESS, selectDiaryRows));
};

/**
 * API No. 2
 * API Name : 데일리 다이어리 수정 API
 * [POST]] /diarys
 */
exports.postDiarys = async function (req, res) {
    /**
     * body: title, character, text, img, createAt
     */
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const {title, character, text, img, createAt} = req.body;

    if (!title) return res.send(response(baseResponse.DIARY_TITLE_NOT_EXIST));
    else if (!text) return res.send(response(baseResponse.DIARY_TEXT_NOT_EXIST));
    else if (!createAt) return res.send(response(baseResponse.DIARY_CREATEAT_NOT_EXIST));
    else if (img.length > 4) return res.send(response(baseResponse.DIARY_IMG_NOT_EXIST));

    const createDiaryRows = await diaryService.createDiary(userId, title, character, text, img, createAt);
    console.log(createDiaryRows);
    if(createDiaryRows.length < 1) return res.send(response(baseResponse.DIARY_NOT_EXIST));
    else return res.send(response(baseResponse.SUCCESS));
};

exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};











/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
