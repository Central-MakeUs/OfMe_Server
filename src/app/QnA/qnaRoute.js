module.exports = function(app){
    const qna = require('./qnaController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 1. 질문 리스트 조회 API
    app.get('/questions', jwtMiddleware, qna.getQuestions);
    
    // 2. 질문 상세 조회 API
    app.get('/questions/list', jwtMiddleware, qna.getQuestionsList);

    // 3. 답변 조회 API
    app.get('/questions/:questionId/answers', jwtMiddleware, qna.getAnswers);

    // 4. 답변 등록 API
    app.get('/questions/:questionId/answers', jwtMiddleware, qna.postAnswers);

    // 5. 답변 수정 API
    app.post('/questions/:questionId/answers', jwtMiddleware, qna.patchAnswers);

    // 6. 답변 삭제 API
    app.get('/questions/:questionId/answers', jwtMiddleware, qna.deleteAnswers);
};