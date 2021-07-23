const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const mypageDao = require("./mypageDao");

// Provider: Read 비즈니스 로직 처리

exports.selectMypage = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const user = [userId, userId]
  const selectMypageResult = await mypageDao.selectMypage(connection, user);
  if (selectMypageResult.length <= 0) {
    connection.release();
    return LOGIN_WITHDRAWAL_ACCOUNT;
  }
  const selectMyfriendResult = await mypageDao.selectMyfriend(connection, userId);
  const selectMyhistoryResult = await mypageDao.selectMyhistory(connection, userId);
  connection.release();
  let sumMypage = [];
  sumMypage.push(selectMypageResult, selectMyfriendResult, selectMyhistoryResult);
  return sumMypage;
};
exports.selectMypageDetail = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectMypageDetailResult = await mypageDao.selectMypageDetail(connection, userId);
  connection.release();

  return selectMypageDetailResult;
};
exports.selectMypageDetailPassword = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectMypageDetailPasswordResult = await mypageDao.selectMypageDetailPassword(connection, userId);
  connection.release();

  return selectMypageDetailPasswordResult;
};