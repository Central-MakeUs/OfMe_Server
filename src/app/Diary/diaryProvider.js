const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const diaryDao = require("./diaryDao");
const userDao = require("../User/userDao");
// Provider: Read 비즈니스 로직 처리

exports.getUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getUsers = await userDao.getUser(connection, userId);
  console.log(22222)
  connection.release();

  return getUsers;
};

exports.selectDiary = async function (userId, createAt) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectDiaryRows = await diaryDao.selectDiary(connection, userId, createAt);

  connection.release();

  return selectDiaryRows;
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};