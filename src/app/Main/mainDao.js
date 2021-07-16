// 연도,월,일로 다이어리 조회
async function selectCharacters(connection, userId) {
  const selectQuery = `
select User.nickname, ConceptData.name, ConceptData.id, ConceptImage.conceptImg, UserConcept.timer
from UserConcept
inner join User on User.id = UserConcept.userId
inner join ConceptData on ConceptData.id = UserConcept.conceptId
inner join ConceptImage on ConceptImage.conceptId = ConceptData.id
where UserConcept.userId = ? and UserConcept.status = 'Activated';
                `;
  const [selectCharactersRows] = await connection.query(selectQuery, userId);
  return selectCharactersRows;
}

// 다이어리 작성
async function updateCharactersEnd(connection, updateParams) {
  const updateCharactersQuery = `
update UserConcept
set status = 'End'
where userId = ? and status = 'Activated'
order by id DESC limit 1;
                `;
  const [updateCharactersEndRow] = await connection.query(updateCharactersQuery, updateParams);
  return updateCharactersEndRow;
}

module.exports = {
  selectCharacters,
  updateCharactersEnd,
};
