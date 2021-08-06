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
 * API Name : 데일리 다이어리 작성 API
 * [POST] /diarys
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
    else if (!character) return res.send(response(baseResponse.DIARY_CHARACTER_NOT_EXIST));
    else if (img.length > 4) return res.send(response(baseResponse.DIARY_IMG_NOT_EXIST));

    const createDiaryRows = await diaryService.createDiary(userId, title, character, text, img, createAt);

    if(createDiaryRows.length < 1) return res.send(response(baseResponse.DIARY_NOT_EXIST));
    else return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 3
 * API Name : 데일리 다이어리 수정 API
 * [PATCH] /diarys
 */
exports.patchDiarys = async function (req, res) {
    /**
     * body: title, character, text, createAt, img, diaryId
     */
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const {title, character, text, createAt, img, diaryId} = req.body;

    if (!title) return res.send(response(baseResponse.DIARY_TITLE_NOT_EXIST));
    else if (!text) return res.send(response(baseResponse.DIARY_TEXT_NOT_EXIST));
    else if (!createAt) return res.send(response(baseResponse.DIARY_CREATEAT_NOT_EXIST));
    else if (!character) return res.send(response(baseResponse.DIARY_CHARACTER_NOT_EXIST));
    else if (img.length > 4) return res.send(response(baseResponse.DIARY_IMG_NOT_EXIST));

    const selectDiaryIdRows = await diaryProvider.selectDiaryId(userId, diaryId);

    if (selectDiaryIdRows[0].userId != userId) return res.send(response(baseResponse.DIARY_USER_NOT_EXIST));
    else if(selectDiaryIdRows.length < 1) return res.send(response(baseResponse.DIARY_NOT_EXIST));

    const selectDiaryImgRows = await diaryProvider.selectDiaryImg(diaryId);

    const updateDiaryRows = await diaryService.updateDiary(selectDiaryImgRows, diaryId, userId, title, character, text, img, createAt);

    if (updateDiaryRows) return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 4
 * API Name : 데일리 다이어리 삭제 API
 * [PATCH] /diarys/:diaryId
 */
exports.deleteDiarys = async function (req, res) {
    /**
     * params: diaryId
     */
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const diaryId = req.params.diaryId;

    if (!diaryId) return res.send(response(baseResponse.DIARY_ID_NOT_EXIST));

    const selectDiaryIdRows = await diaryProvider.selectDiaryId(userId, diaryId);
    if (selectDiaryIdRows[0].userId != userId) return res.send(response(baseResponse.DIARY_USER_NOT_EXIST));
    else if(selectDiaryIdRows.length < 1) return res.send(response(baseResponse.DIARY_NOT_EXIST));

    const deleteDiaryRows = await diaryService.deleteDiary(diaryId);

    if (deleteDiaryRows) return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 5
 * API Name : 날짜에 대한 컨셉 조회 API
 * [GET] /date?years=&months=&days=
 */
exports.getDateDiarys = async function (req, res) {
    /**
     * queryString: years, months, days
     */
    const userId = req.verifiedToken.userId;
    const {years, months, days} = req.query;
    const createAt = years+'-'+months+'-'+days;
    console.log(userId)
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const selectDiaryRows = await diaryProvider.selectDateDiary(userId, createAt);

    if(selectDiaryRows.length < 1) return res.send(response(baseResponse.DIARY_NOT_EXIST));
    else return res.send(response(baseResponse.SUCCESS, selectDiaryRows));
};