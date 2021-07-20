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
WHERE rankrow.a <= 20 or QnAAnswer.userId = ?
UNION ALL
SELECT rankrow.id, sort, question, QnAAnswer.share
FROM (
   SELECT *, RANK() OVER (PARTITION BY qna.sort ORDER BY qna.question ASC, qna.id ASC) AS a
   FROM QnAQuestion AS qna
    WHERE sort = 'O'
    ORDER BY RAND()
) AS rankrow
LEFT JOIN QnAAnswer on QnAAnswer.questionId = rankrow.id
WHERE rankrow.a <= 20 or QnAAnswer.userId = ?;
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
    WHERE userId = ?
) AS QnAAnswer
RIGHT JOIN QnAQuestion on QnAQuestion.id = QnAAnswer.questionId
WHERE QnAQuestion.sort = ?;
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
    WHERE userId = ?
) AS QnAAnswer
RIGHT JOIN QnAQuestion on QnAQuestion.id = QnAAnswer.questionId
WHERE QnAQuestion.sort = ? and share = ?;
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
    WHERE userId = ?
) AS QnAAnswer
RIGHT JOIN QnAQuestion on QnAQuestion.id = QnAAnswer.questionId
WHERE QnAQuestion.sort = ? and share IS NULL;
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
module.exports = {
  selectQuestions,
  selectQuestionsList,
  selectListShare,
  selectListNoAnswer,
  selectAnswers,
};
