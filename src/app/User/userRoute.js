module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 회원가입 API
    app.post('/sign-up', user.postUsers);

    // 로그인 API
    app.post('/login', user.login);

    // JWT 유효성 확인 API
    app.get('/check', jwtMiddleware, user.check);

    // 자동로그인 API
    app.get('/auto-login', jwtMiddleware, user.autoLogin);
};

