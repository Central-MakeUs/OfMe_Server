module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },

    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 8~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 2~10자리를 입력해주세요." },

    LOGIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    LOGIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    LOGIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    LOGIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },
    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    SIGNUP_CHECKPASSWORD_EMPTY : { "isSuccess": false, "code": 2019, "message": "재확인 비밀번호를 입력해주세요." },
    SIGNUP_NICKNAME_TYPE : { "isSuccess": false, "code": 2020, "message": "닉네임은 한글만 허용합니다." },
    LOGIN_PASSWORD_LENGTH : { "isSuccess": false, "code": 2021, "message":"비밀번호는 8~20자리를 입력해주세요." },
    USERTYPE_TYPEID_EMPTY : { "isSuccess": false, "code": 2022, "message":"typeId를 입력해주세요." },
    USERTYPE_TYPEID_ERROR : { "isSuccess": false, "code": 2023, "message": "typeId는 1~16 사이의 값을 입력해주세요."},
    USERTYPE_ANSWER_ERROR : { "isSuccess": false, "code": 2024, "message": "body의 value 값 형식이 올바르지 않습니다."},
    USERTYPE_ANSWER_LENGTH : { "isSuccess": false, "code": 2025, "message": "body의 value의 개수가 3개가 아닙니다."},
    USERTYPE_ANSWER_EMPTY : { "isSuccess": false, "code": 2026, "message": "EI, NS, TF, PJ 질문의 답변을 모두 입력해주세요."},



    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"이미 사용중인 아이디입니다.(중복된 이메일입니다.)" },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"이미 사용중인 닉네임입니다." },

    LOGIN_EMAIL_NOT_EXIST : { "isSuccess": false, "code": 3003, "message": "존재하지 않은 이메일입니다." },
    LOGIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    LOGIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "탈퇴 된 계정입니다." },
    SIGNUP_PASSWORD_CONFIRM : { "isSuccess": false, "code": 3007, "message": "비밀번호가 일치하지 않습니다." },
    SIGNIN_ALREADY_LOGIN : { "isSuccess": false, "code": 3008, "message": "이미 로그인된 유저입니다." },
    LOGOUT_ALREADY_LOGOUT : { "isSuccess": false, "code": 3009, "message": "이미 로그아웃된 토큰입니다." },

    // 컨셉 error
    CONCEPT_KEYWORD_NOT_EXIST : { "isSuccess": false, "code": 3020, "message": "키워드가 없습니다. 정확히 입력해주세요." },
    CONCEPT_NOT_EXIST : { "isSuccess": false, "code": 3021, "message": "조회할 컨셉이 없습니다. 정확하게 입력해주세요." },
    CONCEPT_POST_NOT_EXIST : { "isSuccess": false, "code": 3022, "message": "등록할 컨셉이 존재하지 않습니다. 정확하게 입력해주세요." },
    CONCEPT_POST_EXIST : { "isSuccess": false, "code": 3023, "message": "컨셉이 이미 진행중 입니다. 종료하고 다시 시도해주세요." },

    // 메인 error
    MAIN_CHARACTER_NOT_EXIST : { "isSuccess": false, "code": 3030, "message": "진행중인 컨셉이 없습니다. 컨셉을 먼저 정해주세요." },
    MAIN_TIMER_NOT_EXIST : { "isSuccess": false, "code": 3031, "message": "타이머가 입력되지 않았습니다." },
    MAIN_CONCEPT_NOT_EXIST : { "isSuccess": false, "code": 3032, "message": "별점을 등록할 컨셉인덱스를 정해주세요." },
    MAIN_STAR_NOT_EXIST : { "isSuccess": false, "code": 3033, "message": "등록할 별점을 입력해주세요." },
    MAIN_INT_STAR_NOT_EXIST : { "isSuccess": false, "code": 3034, "message": "별점은 정수 1~5로 입력해주세요." },
    

    // 다이어리 error
    DIARY_NOT_EXIST : { "isSuccess": false, "code": 3110, "message": "작성된 다이어리가 없습니다." },
    DIARY_TITLE_NOT_EXIST : { "isSuccess": false, "code": 3111, "message": "타이틀을 입력해주세요." },
    DIARY_TEXT_NOT_EXIST : { "isSuccess": false, "code": 3112, "message": "내용을 입력해주세요." },
    DIARY_CREATEAT_NOT_EXIST : { "isSuccess": false, "code": 3113, "message": "날짜를 선택해주세요." },
    DIARY_IMG_NOT_EXIST : { "isSuccess": false, "code": 3114, "message": "이미지는 최대 4개까지 입니다." },
    DIARY_CHARACTER_NOT_EXIST : { "isSuccess": false, "code": 3115, "message": "캐릭터를 설정해주세요. 캐릭터를 설정하지 않으면 캐릭터인덱스 0을 주십시오." },
    DIARY_USER_NOT_EXIST : { "isSuccess": false, "code": 3116, "message": "권한이 없습니다." },
    DIARY_ID_NOT_EXIST : { "isSuccess": false, "code": 3117, "message": "삭제할 다이어리를 입력해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},

}
