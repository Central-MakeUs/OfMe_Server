const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const conceptDao = require("./conceptDao");

// Provider: Read 비즈니스 로직 처리

exports.selectConcept = async function (stage) {
  if (stage === '1') {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectConceptStageOne(stage);
    connection.release();

    return userListResult;

  } else if (stage === '2') {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectConceptStageTwo(stage);
    connection.release();

    return userListResult;
  } else if (stage === '3') {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectConceptStageThree(stage);
    connection.release();

    return userListResult;
  }
};