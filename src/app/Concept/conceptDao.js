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

// 컨셉 정보 조회
async function selectConcept(connection, conceptId) {
  const ConceptQuery = `
select ConceptData.id, url, name, subName, description, advantage, habit, behavior, value, music
from ConceptData
inner join ConceptImage on ConceptImage.conceptId = ConceptData.id
where ConceptData.id = ? and ConceptData.status = 'Activated' limit 1;
                `;
  const [ConceptRows] = await connection.query(ConceptQuery, conceptId);
  return ConceptRows;
}

// 컨셉 등록
async function insertConcept(connection, insertConceptParams) {
  const ConceptQuery = `
insert into UserConcept(userId, conceptId)
values (?, ?);
                `;
  const [ConceptRows] = await connection.query(ConceptQuery, insertConceptParams);
  return ConceptRows;
}

// 컨셉 이미 진행중인지 확인
async function selectConceptIng(connection, userId) {
  const ConceptQuery = `
select *
from UserConcept
where userId = ? and (status = 'Activated' OR status = 'Stop')
                `;
  const [ConceptRows] = await connection.query(ConceptQuery, userId);
  return ConceptRows;
}
// 컨셉 인덱스 불러오기
async function selectConceptId(connection) {
  const ConceptQuery = `
select id, name
from ConceptData
where status = 'Activated'
                `;
  const [ConceptRows] = await connection.query(ConceptQuery);
  return ConceptRows;
}
module.exports = {
  selectConceptStageOne,
  selectConceptStageTwo,
  selectConceptStageThree,
  selectConcept,
  insertConcept,
  selectConceptIng,
  selectConceptId
};
