import React from "react";
import "../assets/styles/pages/login.css";
import {Link} from "react-router-dom";
import Input from "../components/Input";

const Login = () => {
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
                        />
                        <br/>
                        <p>비밀번호</p>
                        <Input
                            type="password"
                            name="u_pw"
                            id="u_pw"
                        />
                        <br/>
                        <div className="save">
                            <input type="checkbox" name="save_id" id="save_id"/>
                            <label htmlFor="save_id">아이디 저장</label><br/>
                        </div>
                        <div className="find">
                            <Link to="/register"> 회원가입 </Link>
                            |
                            <Link to="#none"> 아이디 찾기 </Link>
                            |
                            <Link to="#none"> 비밀번호 찾기 </Link>
                        </div>
                        <input className="login_btn" type="button" value="로그인"/><br/>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;