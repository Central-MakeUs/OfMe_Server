// 연도,월,일로 다이어리 조회
async function selectDiary(connection, userId, createAt) {
  const selectQuery = `
                SELECT id, userId, conceptId, title, content, date_format(createAt, '%Y-%m-%d') as createAt
                FROM DayDiary
                WHERE userId = ? and date(createAt) = ? and status = 'Activated';
                `;
  const [selectDiaryRows] = await connection.query(selectQuery, [userId, createAt]);
  return selectDiaryRows;
}

// 다이어리 작성
async function insertDiaryInfo(connection, insertDiaryParams) {
  const insertDiaryQuery = `
                insert into DayDiary(userId, title, conceptId, content, createAt)
                values (?, ?, ?, ?, ?);
                `;
  const [diaryRow] = await connection.query(insertDiaryQuery, insertDiaryParams);
  return diaryRow;
}

// 다이어리 이미지 작성
async function insertDiaryImg(connection, [DiaryImgList]) {
  const insertUserInfoQuery = `
        INSERT INTO DayDiaryImg(dayDiaryId, createAt, image)
        VALUES ?;
    `;
  const [diaryImgRow] = await connection.query(
    insertUserInfoQuery,
    [DiaryImgList]
  );

  return diaryImgRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM UserInfo 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, id
        FROM UserInfo 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}


module.exports = {
  selectDiary,
  insertDiaryInfo,
  insertDiaryImg,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
