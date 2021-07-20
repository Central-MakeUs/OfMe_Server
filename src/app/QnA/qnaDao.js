// 질문 리스트 조회
async function selectQuestions(connection, selectParams) {
  const selectQuestionsQuery = `
SELECT rankrow.id, sort, question, QnAAnswer.share
FROM (
   SELECT *, RANK() OVER (PARTITION BY qna.sort ORDER BY qna.question ASC, qna.id ASC) AS a
   FROM QnAQuestion AS qna
    WHERE sort = 'D' or sort = 'T'
) AS rankrow
LEFT JOIN QnAAnswer on QnAAnswer.questionId = rankrow.id
WHERE rankrow.a <= 20 or QnAAnswer.userId = ? and rankrow.status = 'Activated'
UNION ALL
SELECT rankrow.id, sort, question, QnAAnswer.share
FROM (
   SELECT *, RANK() OVER (PARTITION BY qna.sort ORDER BY qna.question ASC, qna.id ASC) AS a
   FROM QnAQuestion AS qna
    WHERE sort = 'O'
    ORDER BY RAND()
) AS rankrow
LEFT JOIN QnAAnswer on QnAAnswer.questionId = rankrow.id
WHERE rankrow.a <= 20 or QnAAnswer.userId = ? and rankrow.status = 'Activated';
                `;
  const [selectQuestionsRows] = await connection.query(selectQuestionsQuery, selectParams);
  return selectQuestionsRows;
}
// 질문 리스트 조회
async function selectQuestionsList(connection, selectParams) {
  const selectQuestionsQuery = `
SELECT QnAQuestion.id, sort, question, QnAAnswer.share
FROM (
   SELECT *
   FROM QnAAnswer AS qna
    WHERE userId = ? and status = 'Activated'
) AS QnAAnswer
RIGHT JOIN QnAQuestion on QnAQuestion.id = QnAAnswer.questionId
WHERE QnAQuestion.sort = ? and QnAQuestion.status = 'Activated';
                `;
  const [selectQuestionsRows] = await connection.query(selectQuestionsQuery, selectParams);
  return selectQuestionsRows;
}
// 질문 리스트 조회
async function selectListShare(connection, selectParams) {
  const selectQuestionsQuery = `
SELECT QnAQuestion.id, sort, question, QnAAnswer.share
FROM (
   SELECT *
   FROM QnAAnswer AS qna
    WHERE userId = ? and status = 'Activated'
) AS QnAAnswer
RIGHT JOIN QnAQuestion on QnAQuestion.id = QnAAnswer.questionId
WHERE QnAQuestion.sort = ? and share = ? and QnAQuestion.status = 'Activated';
                `;
  const [selectQuestionsRows] = await connection.query(selectQuestionsQuery, selectParams);
  return selectQuestionsRows;
}
// 질문 리스트 조회
async function selectListNoAnswer(connection, selectParams) {
  const selectQuestionsQuery = `
SELECT QnAQuestion.id, sort, question, QnAAnswer.share
FROM (
   SELECT *
   FROM QnAAnswer AS qna
    WHERE userId = ? and status = 'Activated'
) AS QnAAnswer
RIGHT JOIN QnAQuestion on QnAQuestion.id = QnAAnswer.questionId
WHERE QnAQuestion.sort = ? and share IS NULL and QnAQuestion.status = 'Activated';
                `;
  const [selectQuestionsRows] = await connection.query(selectQuestionsQuery, selectParams);
  return selectQuestionsRows;
}
// 질문 리스트 조회
async function selectAnswers(connection, selectParams) {
  const selectQuestionsQuery = `
SELECT question, answer, share, date_format(QnAQuestion.createAt, '%Y-%m-%d') as createAt
FROM QnAQuestion
INNER JOIN QnAAnswer ON QnAQuestion.id = QnAAnswer.questionId
WHERE QnAAnswer.userId = ? and QnAAnswer.status = 'Activated' and QnAQuestion.id = ?;
                `;
  const [selectQuestionsRows] = await connection.query(selectQuestionsQuery, selectParams);
  return selectQuestionsRows;
}
// 질문 리스트 조회
async function createAnswers(connection, createAnswersParams) {
  const QuestionsQuery = `
INSERT INTO QnAAnswer(questionId, userId, answer, share)
VALUES (?, ? ,?, ?);
                `;
  const [QuestionsRows] = await connection.query(QuestionsQuery, createAnswersParams);
  return QuestionsRows;
}
// 질문 리스트 조회
async function createReward(connection, createRewardParams) {
  const QuestionsQuery = `
INSERT INTO Reward(userId, point, route)
VALUES (?, ? ,?);
                `;
  const [QuestionsRows] = await connection.query(QuestionsQuery, createRewardParams);
  return QuestionsRows;
}
// 질문 리스트 조회
async function selectAnswersIs(connection, selectParams) {
  const QuestionsQuery = `
SELECT *
FROM QnAAnswer
where questionId = ? and userId = ? and status = 'Activated';
                `;
  const [QuestionsRows] = await connection.query(QuestionsQuery, selectParams);
  return QuestionsRows;
}
// 질문 리스트 조회
async function selectQuestionIs(connection, selectParams) {
  const QuestionsQuery = `
SELECT *
FROM QnAQuestion
WHERE id = ? and status = 'Activated';
                `;
  const [QuestionsRows] = await connection.query(QuestionsQuery, selectParams);
  return QuestionsRows;
}
// 답변 수정
async function updateAnswers(connection, Params) {
  const QuestionsQuery = `
update QnAAnswer
set answer = ?, share = ?
where id = ? and status = 'Activated';
                `;
  const [QuestionsRows] = await connection.query(QuestionsQuery, Params);
  return QuestionsRows;
}
// 답변 삭제
async function deleteAnswers(connection, Params) {
  const QuestionsQuery = `
update QnAAnswer
set status = 'Deleted'
where id = ? and status = 'Activated';
                `;
  const [QuestionsRows] = await connection.query(QuestionsQuery, Params);
  return QuestionsRows;
}
module.exports = {
  selectQuestions,
  selectQuestionsList,
  selectListShare,
  selectListNoAnswer,
  selectAnswers,
  createAnswers,
  createReward,
  selectAnswersIs,
  selectQuestionIs,
  updateAnswers,
  deleteAnswers,
};
