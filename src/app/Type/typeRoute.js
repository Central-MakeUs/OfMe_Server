module.exports = function(app){
    const type = require('./typeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 16가지 유형 조회 API
    app.get('/types', type.getTypes);

    // 유형 선택 등록 후 결과 조회 API
    
    
};

