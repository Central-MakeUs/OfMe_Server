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

// 다이어리 작성자와 수정자 확인
async function selectDiaryId(connection, diaryId) {
  const selectQuery = `
                SELECT userId
                FROM DayDiary
                WHERE id = ?;
                `;
  const [selectDiaryRows] = await connection.query(selectQuery, diaryId);
  return selectDiaryRows;
}

// 다이어리 수정
async function updateDiary(connection, DiaryParams) {
  const insertDiaryQuery = `
              update DayDiary
              set title = ?, conceptId = ?, content = ?, createAt = ?
              where id = ?;
                `;
  const [diaryRow] = await connection.query(insertDiaryQuery, DiaryParams);
  return diaryRow;
}

// 다이어리 이미지 수정
async function updateDiaryImg(connection, DiaryImgList) {
  const insertUserInfoQuery = `
        update DayDiaryImg
        set createAt = ?, image = ?
        where id = ?;
    `;
  const [diaryImgRow] = await connection.query(
    insertUserInfoQuery,
    DiaryImgList
  );
  return diaryImgRow;
}

// 작성한 다이어리 이미지 불러오기
async function selectDiaryImg(connection, dayDiaryId) {
  const selectQuery = `
                SELECT id, dayDiaryId, image, date_format(createAt, '%Y-%m-%d') as createAt
                FROM DayDiaryImg
                WHERE dayDiaryId = ?;
                `;
  const [selectDiaryRows] = await connection.query(selectQuery, dayDiaryId);
  return selectDiaryRows;
}

module.exports = {
  selectDiary,
  insertDiaryInfo,
  selectDiaryId,
  insertDiaryImg,
  updateDiary,
  updateDiaryImg,
  selectDiaryImg
};
