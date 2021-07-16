const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const mainDao = require("./mainDao");
// Provider: Read 비즈니스 로직 처리

/**
 * API No. 1
 * API Name : 데일리 다이어리 조회 API
 * [GET] /diarys?year=&months=&days=
 */
exports.selectCharacters = async function (userId, createAt) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectCharactersRows = await mainDao.selectCharacters(connection, userId, createAt);

  connection.release();

  return selectCharactersRows;
};
/**
 * API Name : 데일리 다이어리 수정 API
 * 다이어리 작성자와 수정할 사용자와 같은 사람인지 확인
 */
exports.selectDiaryId = async function (diaryId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectDiaryIdRows = await diaryDao.selectDiaryId(connection, diaryId);

  connection.release();

  return selectDiaryIdRows;
};
/**
 * API Name : 데일리 다이어리 수정 API
 * 수정할 다이어리 이미지 불러오기
 */
exports.selectDiaryImg = async function (diaryId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectDiaryImgRows = await diaryDao.selectDiaryImg(connection, diaryId);

  connection.release();

  return selectDiaryImgRows;
};