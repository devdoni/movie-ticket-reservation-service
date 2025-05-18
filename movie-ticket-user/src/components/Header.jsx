import React from "react";

import "../assets/styles/components/header.css";
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <div id="header_wrap">
            <div className="header_contents">
                <div className="logo">
                    <Link to="/"><img src="/img/logo.png" alt="로고 이미지"/></Link>
                </div>
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

                {/*<div className="lnb">*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <a href="javascript:void(0)" onClick="logoutBtn()">*/}
                {/*            <span className="material-symbols-outlined">*/}
                {/*                logout*/}
                {/*                </span>*/}
                {/*                <p>로그아웃</p>*/}
                {/*            </a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <a th:href="@{/member/modify}">*/}
                {/*            <span className="material-symbols-outlined">*/}
                {/*                person*/}
                {/*             </span>*/}
                {/*                <p>내정보</p>*/}
                {/*            </a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <a th:href="@{/member/mymovie}">*/}
                {/*            <span className="material-symbols-outlined">*/}
				{/*				movie*/}
				{/*		   	</span>*/}
                {/*                <p>MY MOVIE</p>*/}
                {/*            </a>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Header;