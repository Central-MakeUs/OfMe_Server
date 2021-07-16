module.exports = function(app){
    const main = require('./mainController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 메인화면 조회 API (캐릭터)
    app.get('/characters', jwtMiddleware, main.getCharacters);

    // 4. 컨셉 사용 종료 API
    app.patch('/characters/ends', jwtMiddleware, main.patchCharactersEnd);

    // 3. 데일리 다이어리 수정 API
    app.patch('/diarys', jwtMiddleware, main.patchDiarys);
    
    // 3. 데일리 다이어리 삭제 API
    app.delete('/diarys/:diaryId', jwtMiddleware, main.deleteDiarys);
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API