const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const typeDao = require("./typeDao");
const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");


exports.retrieveTypes = async function() {
  const connection = await pool.getConnection(async (conn) => conn);
  const typeListResult = await typeDao.selectTypes(connection);
  connection.release();

  return response(baseResponse.SUCCESS, typeListResult);
}

