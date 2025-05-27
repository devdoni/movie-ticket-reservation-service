import React, {useEffect, useRef, useState} from "react";
import "../assets/styles/pages/login.css";
import {Link, useNavigate} from "react-router-dom";
import Input from "../components/Input";
import {loginUser} from "../utils/api";
import USER_CODES from "../constants/user-status-codes.json";
const Login = ({ setIsLoggined }) => {

    const navigate = useNavigate();

    const inputRefs = useRef({
        id: null,
        pw: null,
    })

    const [userInfo, setUserInfo] = useState({
        u_id: "",
        u_pw: ""
    });

    const [idSaveCheck, setIdSaveCheck] = useState(false);

    useEffect(() => {
        console.log('컴포넌트가 마운트 되었습니다.');

        const savedId = localStorage.getItem("savedUId");
        if (savedId !== null) {
            setIdSaveCheck(true);
            setUserInfo(prev => ({
                ...prev,
                u_id: localStorage.getItem("savedUId"),
            }));
        }

    }, []);

    // 폼 체인지 핸들러
    const formChangeHandler = (e) => {
        console.log("formChangeHandler()");

        const { name, value } = e.target;

        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));

    };

    //아이디 저장 체크박스 핸들러
    const idSaveCheckHandler = () => {
        console.log("idSaveCheckHandler()");

        setIdSaveCheck(prev => !prev);

    };

    // 로그인 버튼 클릭 핸들러
    const loginBtnClickHandler = () => {
        console.log("loginBtnClickHandler()");

        if (userInfo.u_id === "") {
            alert('아이디를 입력해주세요.');
            inputRefs.current.id.focus();

        } else if (userInfo.u_pw === "") {
            alert('비밀번호를 입력해주세요.');
            inputRefs.current.pw.focus();

        } else {
            sendUserLoginInfoByAxios(userInfo);
        }
    }

    // 유저 정보 전송 By Axios
    const sendUserLoginInfoByAxios = (userData) => {
        console.log("sendUserLoginInfoByAxios()");

        loginUser(userData)
            .then(r => {
                let result = r.data;
                if (result.data === USER_CODES.USER_LOGIN_SUCCESS) {
                    // 아이디 저장 체크여부에 따라 로컬 스토리지에 아이디 저장
                    if (idSaveCheck) {
                        localStorage.setItem("savedUId", userInfo.u_id);
                    } else {
                        localStorage.removeItem("savedUId");
                    }
                    alert('로그인이 완료되었습니다.');
                    setIsLoggined(true);
                    navigate("/");

                } else {
                    alert('아이디 또는 패스워드가 일치하지 않습니다.');
                    setUserInfo(prev => ({
                        ...prev,
                        u_pw: ""
                    }));
                }
            })
            .catch(e => {
                alert('죄송합니다 서버와 통신중 오류가 발생했습니다.');
                navigate("/");
            });

    };


    return (
        <section className="login-section">
            <div id="login_section_wrap">
                <div className="word">
                    로그인
                </div>
                <div id="form">
                    <form id="login_form">
                        <p>아이디</p>
                        <Input
                            type="text"
                            name="u_id"
                            id="u_id"
                            value={userInfo.u_id}
                            onChange={formChangeHandler}
                            ref={el => inputRefs.current.id = el}
                        />
                        <br/>
                        <p>비밀번호</p>
                        <Input
                            type="password"
                            name="u_pw"
                            id="u_pw"
                            value={userInfo.u_pw}
                            onChange={formChangeHandler}
                            ref={el => inputRefs.current.pw = el}
                        />
                        <br/>
                        <div className="save">
                            <Input
                                type="checkbox"
                                name="save_id"
                                id="save_id"
                                onChange={idSaveCheckHandler}
                                checked={idSaveCheck}
                            />
                            <label htmlFor="save_id">아이디 저장</label>
                            <br/>
                        </div>
                        <div className="find">
                            <Link to="/register"> 회원가입 </Link>
                            |
                            <Link to="#none"> 아이디 찾기 </Link>
                            |
                            <Link to="#none"> 비밀번호 찾기 </Link>
                        </div>
                        <Input
                            className="login_btn"
                            type="button"
                            value="로그인"
                            onClick={loginBtnClickHandler}
                        />
                        <br/>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;