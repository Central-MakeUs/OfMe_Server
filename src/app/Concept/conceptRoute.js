module.exports = function(app){
    const concept = require('./conceptController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 3단계 테스트 문제 조회 API
    app.get('/concepts/:stage', jwtMiddleware, concept.getConceptStage);
};