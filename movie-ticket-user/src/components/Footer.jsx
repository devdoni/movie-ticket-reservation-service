import React from "react";

import "../assets/styles/components/footer.css";
const Footer = () => {
    return (
        <footer>
            <div className="footer_wrap">
                <div className="infos">
                    <a href="#none">회사소개</a>
                    <a href="#none">이용약관</a>
                    <a href="#none">개인정보처리방침</a>
                    <a href="#none">법적고지</a>
                </div>
                <div className="copyright">
                    <p>경기도 의정부시 시민로 80 센트럴타워 6층 (의정부동)</p>
                    <p>대표자 : 홍길동 · 사업자등록번호: 123-45-67890 · 통신판매업신고번호 : 2024-경기의정-1234</p>
                    <p>ⓒGreenCorp. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;