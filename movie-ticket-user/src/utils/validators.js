
// 회원가입 ID, PW, NICK 정규식
export const regexMap = {
    id: /^[a-zA-Z0-9]{1,20}$/,
    pw: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    nick: /^[a-zA-Z0-9가-힣]{1,20}$/
};