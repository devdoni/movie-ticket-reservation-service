import React, {useState} from "react";

import "../assets/styles/pages/register.css";
import Input from "../components/Input";
import Span from "../components/Span";
import { regexMap } from "../utils/validators";
import {registerUser} from "../utils/api";

const Register = () => {

    const [userInfo, setUserInfo] = useState({
        u_id: "",
        u_pw: "",
        u_nick: "",
        u_age: "",
        u_gender: "",
        u_mail: "",
        u_phone: ""
    });
    const [errors, setErrors] = useState({
        id_err: "",
        pw_err: "",
        nick_err: ""
    });

    // 폼의 데이터 체인지 핸들러
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

    // 아이디 유효성 검사 (20자 이내, 영문자+숫자 조합)
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


    const registerButtonClickHandler = () => {
        console.log("registerButtonClickHandler()");

        registerUser(userInfo)
            .then(r => {
                if (r.data === 1) {
                    alert('회원가입에 성공했습니다.');
                    window.location.href = "/";
                } else {
                    alert('회원가입 요청 중 오류가 발생했습니다.');
                    window.location.href = "/";
                }
            })
            .catch((err) => console.log("connection failure"));

    }
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
                                className="mail"/>
                            <br/>

                            <p>전화번호</p>
                            <Input
                                type="text"
                                name="u_phone"
                                value={userInfo.u_phone}
                                onChange={formChangeHandler}
                                maxLength="13"/>
                            <br/>

                            <Input
                                className="join_btn"
                                type="button"
                                value="회원가입"
                                onClick={registerButtonClickHandler}/>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;