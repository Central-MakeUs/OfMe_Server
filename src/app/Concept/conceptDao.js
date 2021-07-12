// 컨셉 스테이지 1번 조회
async function selectConceptStageOne(stage) {
  const ConceptStageQuery = `
                SELECT email, nickname 
                FROM UserInfo;
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, stage);
  return ConceptStageRows;
}

// 컨셉 스테이지 2번 조회
async function selectConceptStageTwo(stage) {
  const ConceptStageQuery = `
                SELECT email, nickname 
                FROM UserInfo;
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, stage);
  return ConceptStageRows;
}

// 컨셉 스테이지 3번 조회
async function selectConceptStageThree(stage) {
  const ConceptStageQuery = `
                SELECT email, nickname 
                FROM UserInfo;
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, stage);
  return ConceptStageRows;
}


module.exports = {
  selectConceptStageOne,
  selectConceptStageTwo,
  selectConceptStageThree,
};
