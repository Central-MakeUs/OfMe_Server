const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");


exports.postUsers = async function (req, res) {

    const {email, password, checkPassword, nickname} = req.body;

    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    
    if(!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    
    if(password.length < 8 || password.length > 20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    
    if(!checkPassword)
        return res.send(response(baseResponse.SIGNUP_CHECKPASSWORD_EMPTY));

    if(!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    
    if(nickname.length < 2 || nickname.length > 10)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    
    if(!/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/.test(nickname))
        return res.send(response(baseResponse.SIGNUP_NICKNAME_TYPE));
    

    const signUpResponse = await userService.createUser(email, password, checkPassword, nickname);
    return res.send(signUpResponse);
};

exports.login = async function (req, res) {

    const {email, password} = req.body;

    if (!email)
        return res.send(response(baseResponse.SIGNIN_EMAIL_EMPTY));

    if (email.length > 30)
        return res.send(response(baseResponse.SIGNIN_EMAIL_LENGTH));

    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
    
    if(!password)
        return res.send(response(baseResponse.SIGNIN_PASSWORD_EMPTY));
    
    if(password.length < 8 || password.length > 20)
        return res.send(response(baseResponse.SIGNIN_PASSWORD_LENGTH));

    const loginReponse = await userService.postLogin(email, password);
    return res.send(loginReponse);
}


exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
