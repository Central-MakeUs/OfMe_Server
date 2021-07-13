const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const conceptDao = require("./conceptDao");

// Provider: Read 비즈니스 로직 처리

exports.selectConceptStageOne = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const conceptStageOneResult = await conceptDao.selectConceptStageOne(connection);
  connection.release();

  return conceptStageOneResult;
};