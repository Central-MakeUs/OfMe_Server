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
exports.selectConceptStageTwo = async function (keywordId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const conceptStageTwoResult = await conceptDao.selectConceptStageTwo(connection, keywordId);
  connection.release();

  return conceptStageTwoResult;
};
exports.selectConceptStageThree = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const conceptStageThreeResult = await conceptDao.selectConceptStageThree(connection);
  connection.release();

  return conceptStageThreeResult;
};
exports.getConcept = async function (conceptId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const conceptResult = await conceptDao.selectConcept(connection, conceptId);
  connection.release();

  return conceptResult;
};
exports.selectConceptIng = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const conceptResult = await conceptDao.selectConceptIng(connection, userId);
  connection.release();

  return conceptResult;
};