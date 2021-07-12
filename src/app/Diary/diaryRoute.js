module.exports = function(app){
    const diary = require('./diaryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 데일리 다이어리 조회 API
    app.get('/diarys', jwtMiddleware, diary.getDiarys);

    // 2. 데일리 다이어리 수정 API
    app.post('/diarys', jwtMiddleware, diary.postDiarys);
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API