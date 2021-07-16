const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const mainProvider = require("../Main/mainProvider");
const mainService = require("../Main/mainService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 메인화면 조회 API (캐릭터)
 * [GET] /characters
 */
exports.getCharacters = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const selectCharactersRows = await mainProvider.selectCharacters(userId);

    if(selectCharactersRows.length < 1) return res.send(response(baseResponse.MAIN_CHARACTER_NOT_EXIST));
    else return res.send(response(baseResponse.SUCCESS, selectCharactersRows));
};

/**
 * API No. 4
 * API Name : 컨셉 사용 종료 API
 * [PATCH] /characters/ends
 */
exports.patchCharactersEnd = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const userRows = await userProvider.getUser(userId);
    if (!userRows)
        return res.send(response(baseResponse.LOGIN_WITHDRAWAL_ACCOUNT));

    const updateCharactersEndRows = await mainService.updateCharactersEnd(userId);
    console.log(updateCharactersEndRows);
    if(updateCharactersEndRows.affectedRows === 0) return res.send(response(baseResponse.MAIN_CHARACTER_NOT_EXIST));
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