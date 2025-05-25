import React, {useRef, useState} from "react";

import "../assets/styles/pages/register.css";
import Input from "../components/Input";
import Span from "../components/Span";
import { regexMap } from "../utils/validators";
import {registerUser} from "../utils/api";
import {useNavigate} from "react-router-dom"
import USER_CODES from "../constants/user-status-codes.json";

const Register = () => {

    // 페이지 이동을 위한 navigate
    const navigate = useNavigate();

    // Focus 를 위한 Ref
    const inputRefs = useRef({
        id: null,
        pw: null,
        nick: null,
        mail: null,
        phone: null,
        age: null,
        gender: null,
    });

    // 유저가 입력한 정보를 담는 State
    const [userInfo, setUserInfo] = useState({
        u_id: "",
        u_pw: "",
        u_nick: "",
        u_age: "",
        u_gender: "",
        u_mail: "",
        u_phone: ""
    });

    // 아이디, 패스워드, 닉네임 검증 오류를 담는 State
    const [errors, setErrors] = useState({
        id_err: "",
        pw_err: "",
        nick_err: ""
    });


    // 폼 체인지 핸들러
    const formChangeHandler = (e) => {
        console.log("formChangeHandler()");

        const { name, value } = e.target;

        let newValue = value;

        if (name === "u_phone") {
            newValue = formatPhoneNumber(value);
        }
        setUserInfo(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    // ID, PW, NICK 검증
    const validateUser = (type) => {
        console.log("validateUser()");
        const regex = regexMap[type];
        const value = userInfo[`u_${type}`];
        const messageMap = {
            id: "아이디는 20자 이내의 영문자와 숫자만 사용할 수 있습니다.",
            pw: "비밀번호는 특수기호, 영문자, 숫자를 포함해야 합니다.",
            nick: "닉네임은 20자 이내의 영문자, 숫자, 한글만 사용할 수 있습니다."
        };

        setErrors(prev => ({
            ...prev,
            [`${type}_err`]: regex.test(value) ? "" : messageMap[type]
        }));

    };

    // 전화번호 형식
    const formatPhoneNumber = (value) => {
        const phone = value.replace(/[^0-9]/g, '');

        if (phone.length < 4) {
            return phone;
        } else if (phone.length < 8) {
            return phone.slice(0, 3) + '-' + phone.slice(3);
        } else {
            return phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7, 11);
        }
    };


    // 서버로 유저가 입력한 정보 전송 By Axios
    const sendUserInfoByAxios = (validatedUserInfo) => {
        console.log("sendUserInfoByAxios()");

        registerUser(validatedUserInfo)
            .then(r => {
                let result = r.data.data ?? null;
                // 가입 성공
                if (result === USER_CODES.USER_INSERT_SUCCESS) {
                    alert('회원가입이 완료되었습니다.');
                    navigate("/");
                // 중복된 아이디
                } else if (result === USER_CODES.USER_ID_ALREADY_EXIST) {
                    alert('중복된 아이디입니다.');
                    inputRefs.current.id.focus();
                // 알 수 없는 오류시
                } else {
                    alert('알 수 없는 오류입니다.');

                }
            })
            .catch((err) => {
                let res = err.response.data ?? null;
                // 서버에서 Validate 실패 시
                if (res.data === USER_CODES.USER_VALIDATE_FAIL) {
                    alert('올바르지 않은 형식이 제출되었습니다.');
                    console.error(res.error);
                    // DB 서버 에러 시
                } else if (res.data === USER_CODES.DB_ERROR) {
                    alert('죄송합니다. 요청 중 서버에 오류가 발생했습니다.');
                    // 알 수 없는 에러 시
                } else {
                    alert('죄송합니다. 알 수 없는 오류가 발생했습니다.');

                }
            });

    };

    // 폼 데이터 검증 핸들러
    const formValidateHandler = () => {
        console.log("formValidateHandler()");

        if (userInfo.u_id === "") {
            alert('아이디가 정상적으로 입력되지 않았습니다.');
            inputRefs.current.id.focus();

        } else if (userInfo.u_pw === "") {
            alert('비밀번호가 정상적으로 입력되지 않았습니다.');
            inputRefs.current.pw.focus();

        } else if (userInfo.u_nick === "") {
            alert('닉네임이 정상적으로 입력되지 않았습니다.');
            inputRefs.current.nick.focus();

        } else if (userInfo.u_age === "") {
            alert('연령대가 정상적으로 입력되지 않았습니다.');
            inputRefs.current.age.focus();

        } else if (userInfo.u_gender === "") {
            alert('성별이 정상적으로 입력되지 않았습니다.');
            inputRefs.current.gender.focus();

        } else if (userInfo.u_mail === "") {
            alert('메일이 정상적으로 입력되지 않았습니다.');
            inputRefs.current.mail.focus();

        } else if (userInfo.u_phone === "") {
            alert('연락처가 정상적으로 입력되지 않았습니다.');
            inputRefs.current.phone.focus();

        } else if (errors.nick_err || errors.pw_err || errors.nick_err) {
            alert('입력된 정보를 다시 한번 확인해주세요.');

        } else {
            sendUserInfoByAxios(userInfo);
        }
    };

    return (
        <>
            <section>
                <div id="section_wrap">
                    <div className="word">
                        회원가입
                    </div>
                    <div id="form">
                        <form>
                            <p>아이디</p>
                            <Input type="text"
                                   name="u_id"
                                   onChange={formChangeHandler}
                                   onBlur={() => validateUser("id")}
                                   ref={el => inputRefs.current.id = el}
                            />
                            <Span
                                id="idError"
                                className="error-msg"
                                text={errors.id_err}
                            >

                            </Span>

                            <p>비밀번호</p>
                            <Input
                                type="password"
                                name="u_pw"
                                onChange={formChangeHandler}
                                onBlur={() => validateUser("pw")}
                                ref={el => inputRefs.current.pw = el}
                            />
                            <Span
                                id="pwError"
                                className="error-msg"
                                text={errors.pw_err}
                            >

                            </Span>

                            <p>닉네임</p>
                            <Input
                                type="text"
                                name="u_nick"
                                onChange={formChangeHandler}
                                onBlur={() => validateUser("nick")}
                                ref={el => inputRefs.current.nick = el}
                            />
                            <Span
                                id="nickError"
                                className="error-msg"
                                text={errors.nick_err}
                            >

                            </Span>

                            <p>연령대</p>
                            <select
                                name="u_age"
                                onChange={formChangeHandler}
                                ref={el => inputRefs.current.age = el}
                            >
                                <option value="">연령대를 선택하세요</option>
                                <option value="10대">10대</option>
                                <option value="20대">20대</option>
                                <option value="30대">30대</option>
                                <option value="40대">40대</option>
                                <option value="50대">50대</option>
                                <option value="60대">60대</option>
                                <option value="70대">70대</option>
                                <option value="80대">80대</option>
                            </select>
                            <br/>

                            <p>성별</p>
                            <select
                                name="u_gender"
                                onChange={formChangeHandler}
                                ref={el => inputRefs.current.gender = el}
                            >
                                <option value="">성별을 선택하세요</option>
                                <option value="M">남성</option>
                                <option value="W">여성</option>
                            </select>
                            <br/>

                            <p>메일주소</p>
                            <Input
                                type="email"
                                name="u_mail"
                                onChange={formChangeHandler}
                                ref={el => inputRefs.current.mail = el}
                                className="mail"/>
                            <br/>

                            <p>전화번호</p>
                            <Input
                                type="text"
                                name="u_phone"
                                value={userInfo.u_phone}
                                onChange={formChangeHandler}
                                ref={el => inputRefs.current.phone = el}
                                maxLength="13"/>
                            <br/>

                            <Input
                                className="join_btn"
                                type="button"
                                value="회원가입"
                                onClick={formValidateHandler}/>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;