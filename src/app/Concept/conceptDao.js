// 컨셉 스테이지 1번 조회
async function selectConceptStageOne(connection) {
  const ConceptStageQuery = `
select id, keyword
from ConceptTest1
where status = 'Activated';
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery);
  return ConceptStageRows;
}

// 컨셉 스테이지 2번 조회
async function selectConceptStageTwo(connection, keywordId) {
  const ConceptStageQuery = `
select id, keywordId, question, highlight, answer1, answer2, answer3, answer4
from ConceptTest2
where keywordId = ? and status = 'Activated';
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, keywordId);
  return ConceptStageRows;
}

// 컨셉 스테이지 3번 조회
async function selectConceptStageThree(connection) {
  const ConceptStageQuery = `
SELECT id, question, answer1, answer2, answer3, answer4
FROM ConceptTest3
WHERE status = 'Activated'
ORDER BY rand() LIMIT 1;
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery);
  return ConceptStageRows;
}

module.exports = {
  selectConceptStageOne,
  selectConceptStageTwo,
  selectConceptStageThree,
};
