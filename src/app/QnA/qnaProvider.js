const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const qnaDao = require("./qnaDao");

// Provider: Read 비즈니스 로직 처리

exports.selectQuestions = async function (userId) {
  const selectParams = [userId, userId];
  const connection = await pool.getConnection(async (conn) => conn);
  const selectQuestionsResult = await qnaDao.selectQuestions(connection, selectParams);
  connection.release();

  return selectQuestionsResult;
};

exports.selectQuestionsList = async function (sort, userId) {
  const selectParams = [userId, sort];
  const connection = await pool.getConnection(async (conn) => conn);
  const selectQuestionsResult = await qnaDao.selectQuestionsList(connection, selectParams);
  connection.release();

  return selectQuestionsResult;
};

exports.selectListShare = async function (sort, userId, share) {
  const selectParams = [userId, sort, share];
  const connection = await pool.getConnection(async (conn) => conn);
  const selectQuestionsResult = await qnaDao.selectListShare(connection, selectParams);
  connection.release();

  return selectQuestionsResult;
};

exports.selectListNoAnswer = async function (sort, userId) {
  const selectParams = [userId, sort];
  const connection = await pool.getConnection(async (conn) => conn);
  const selectQuestionsResult = await qnaDao.selectListNoAnswer(connection, selectParams);
  connection.release();

  return selectQuestionsResult;
};

exports.selectAnswers = async function (userId, questionId) {
  const selectParams = [userId, questionId];
  const connection = await pool.getConnection(async (conn) => conn);
  const selectAnswersResult = await qnaDao.selectAnswers(connection, selectParams);
  connection.release();

  return selectAnswersResult;
};