// 마이페이지 상단 내 정보들
async function selectMypage(connection, userId) {
  const ConceptStageQuery = `
select nickname, ConceptData.name, User.imgUrl,TypeData.highlight, sum(Reward.point) as point
from User
inner join UserConcept on User.id = UserConcept.userId
inner join ConceptData on UserConcept.conceptId = ConceptData.id
inner join UserType on UserType.userId = User.id
inner join TypeData on TypeData.id = UserType.typeId
inner join Reward on Reward.userId = User.id
where User.id = ? and User.status = 'Activated' and UserConcept.status = 'Activated' and UserType.status = 'Activated' and Reward.status = 'Activated';
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, userId);
  return ConceptStageRows;
}

// 마이페이지 중단 함께한 친구들 조회
async function selectMyfriend(connection, userId) {
  const ConceptStageQuery = `
select ConceptImage.url, name, UserConcept.conceptPoint
from UserConcept
inner join ConceptData on UserConcept.conceptId = ConceptData.id
inner join (select * from ConceptImage limit 1) ConceptImage on ConceptData.id = ConceptImage.conceptId
where userId = ?;
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, userId);
  return ConceptStageRows;
}

// 마이페이지 하단 나의 성향 히스토리 조회
async function selectMyhistory(connection, userId) {
  const ConceptStageQuery = `
select highlight, date_format(UserType.createAt, '%Y-%m-%d') as createAt
from UserType
inner join TypeData on TypeData.id = UserType.typeId
where userId = ?;
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, userId);
  return ConceptStageRows;
}

// 내정보 조회
async function selectMypageDetail(connection, userId) {
  const ConceptStageQuery = `
select imgUrl, email, nickname
from User
where id = ? and status = 'Activated';
                `;
  const [ConceptStageRows] = await connection.query(ConceptStageQuery, userId);
  return ConceptStageRows;
}

// 내정보 조회
async function selectMypageDetailPassword(connection, userId) {
  const Query = `
select password
from User
where id = ? and status = 'Activated';
                `;
  const [Rows] = await connection.query(Query, userId);
  return Rows;
}

// 비밀번호 조회
async function updateMypageDetail(connection, updateMypageDetailParams) {
  const Query = `
update User
set password = ?
where id = ?;
                `;
  const [Rows] = await connection.query(Query, updateMypageDetailParams);
  return Rows;
}
module.exports = {
  selectMypage,
  selectMyfriend,
  selectMyhistory,
  selectMypageDetail,
  selectMypageDetailPassword,
  updateMypageDetail,
};
