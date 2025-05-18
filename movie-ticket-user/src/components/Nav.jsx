import React from "react";

import "../assets/styles/components/nav.css";
const Nav = () => {
    return (
        <nav>
            <div id="nav_wrap">
                <div className="nav_contents">
                    <li><a href="/public" >영화</a></li>
                    <li><a href="/public" >예매</a></li>
                    <input type="text" name="search" className="search" placeholder="영화 제목을 입력해주세요"/>
                </div>
            </div>
        </nav>
    );
}
export default Nav;