// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, nickname 
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 유저 이메일 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailListQuery = `
                SELECT id, email 
                FROM User
                WHERE email = ?;
                `;
  const [userEmailRows] = await connection.query(selectUserEmailListQuery, email);
  return userEmailRows;
}

// 유저 닉네임 조회
async function selectUserNickname(connection, nickname) {
  const selectUserNicknameListQuery = `
                SELECT id, nickname 
                FROM User
                WHERE nickname = ?;
                `;
  const [userNicknameRows] = await connection.query(selectUserNicknameListQuery, nickname);
  return userNicknameRows;
}

// 유저 상태 확인
async function selectUserStatus(connection, email) {
  const selectUserStatusListQuery = `
                SELECT id, email, status 
                FROM User
                WHERE email = ?;
                `;
  const [userStatusRows] = await connection.query(selectUserStatusListQuery, email);
  return userStatusRows;
}

// 16가지 유형 조회
async function selectTypes(connection) {
  const selectTypesQuery = `
                SELECT id, name, highlight
                FROM TypeData
                `;
  const [selectTypesRows] = await connection.query(selectTypesQuery);
  return selectTypesRows;
}



module.exports = {
  selectUser,
  selectUserEmail,
  selectUserNickname,
  selectUserStatus,
  selectTypes
};
