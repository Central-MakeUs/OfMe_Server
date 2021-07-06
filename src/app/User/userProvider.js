const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const userDao = require("./userDao");

exports.emailCheck = async function(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return userListResult;
}

exports.nicknameCheck = async function(nickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUserNickname(connection, nickname);
  connection.release();

  return userListResult;
}

exports.passwordCheck = async function(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUserPassword(connection, email);
  connection.release();

  return userListResult;
}

exports.accountCheck = async function(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUserStatus(connection, email);
  connection.release()

  return userListResult;  
}

exports.checkJWT = async function(userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUserJwt(connection, userId);
  connection.release()

  return userListResult; 
}

exports.checkLogoutToken = async function(token) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectLogoutToken(connection, token);
  connection.release()

  return userListResult; 
}