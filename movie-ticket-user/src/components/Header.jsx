import React from "react";

import "../assets/styles/components/header.css";
import {Link, useNavigate} from "react-router-dom";
import {logoutUser} from "../utils/api";
const Header = ({isLoggined, setIsLoggined}) => {

    const navigate = useNavigate();

    const logoutBtnClickHandler = () => {
        console.log("logoutBtnClickHandler()");

        if (isLoggined) {
            logoutUser()
                .then((res) => {
                    alert('로그아웃이 완료되었습니다.');
                    setIsLoggined(false);
                    navigate('/');
                })
                .catch((err) => {
                    alert('로그아웃 중 오류가 발생했습니다.');
                    setIsLoggined(false);
                    navigate('/');
                });
        } else {
            alert('올바르지 않은 요청입니다.');
            navigate('/');
        }
    };

    return (
        <div id="header_wrap">

            <div className="header_contents">
                <div className="logo">
                    <Link to="/"><img src="/img/logo.png" alt="로고 이미지"/></Link>
                </div>
                { isLoggined ? (
                    <div className="lnb">
                        <ul>
                            <li>
                                <Link to="#none" onClick={logoutBtnClickHandler}>
                            <span className="material-symbols-outlined">
                                logout
                                </span>
                                    <p>로그아웃</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/modify">
                            <span className="material-symbols-outlined">
                                person
                             </span>
                                    <p>내정보</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#mymovies">
                            <span className="material-symbols-outlined">
								movie
						   	</span>
                                    <p>MY MOVIE</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="lnb">
                        <ul>
                            <li>
                                <Link to="/login">
                            <span className="material-symbols-outlined">
                                lock
                             </span>
                                    <p>로그인</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                            <span className="material-symbols-outlined">
                                person_add
                                </span>
                                    <p>회원가입</p>
                                </Link>
                            </li>
                            <li>
                                {/*<a th:href="@{/member/mymovie}">*/}
                                <span className="material-symbols-outlined">
								movie
						   </span>
                                <p>MY MOVIE</p>
                                {/*</a>*/}
                            </li>
                        </ul>
                    </div>

                )}
            </div>
        </div>
    );
}

export default Header;