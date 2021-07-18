const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const mypageDao = require("./mypageDao");

// Provider: Read 비즈니스 로직 처리

exports.selectMypage = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectMypageResult = await mypageDao.selectMypage(connection, userId);
  const selectMyfriendResult = await mypageDao.selectMyfriend(connection, userId);
  const selectMyhistoryResult = await mypageDao.selectMyhistory(connection, userId);
  connection.release();
  let sumMypage = [];
  sumMypage.push(selectMypageResult, selectMyfriendResult, selectMyhistoryResult);
  return sumMypage;
};