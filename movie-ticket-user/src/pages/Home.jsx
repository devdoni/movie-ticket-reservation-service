import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "../assets/styles/pages/home.css";

const Home = () => {


    return (
        <>
            <article>
                <div id="article_wrap">
                    <div className="main_img">
                        <div className="title">
                            <strong>브레드이발소 : 빵스타의 탄생</strong>
                            <p>최고의 빵스타는 누가 될 것인가!<br/>
                                프리미엄 상영 예매 GO!</p>
                        </div>
                        <video width="1200" height="600" autoPlay muted>
                            <source src="https://adimg.cgv.co.kr/images/202409/Bread/Bread_1080x608_main.mp4"
                                    type="video/mp4"/>

                        </video>
                    </div>
                </div>
            </article>
            <article>
                <div id="article_wrap2">
                    <div className="list">
                        <h2 id="movie_chart_btn">무비 차트</h2>
                        <h2 id="rank_list_btn">상영 예정작</h2>
                        <div className="movie_list slick-slider" id="movie_list">
                            <ul>
                                <li>
                                    <div className="movie_rank"></div>
                                    <div className="img"></div>
                                    <p></p>
                                </li>

                            </ul>
                        </div>
                        <div className="rank_list slick-slider" id="rank_list">
                            <ul>
                                <li>
                                    <div className="img"></div>
                                    <p></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
            <article>
                <div className="article_wrap3">
                    <div className="event">
                        <h2>EVENT</h2>
                        <div className="event_list">
                            <ul>
                                <li>
                                    <div className="img_con">
                                        <a href="#none"><img
                                            src="https://img.cgv.co.kr/WebApp/contents/eventV4/41996/17267128069630.jpg"/></a>
                                    </div>
                                    <p className="event_title">트랜스포머 ONE_4DX 포스터</p>
                                    <p className="event_day">2024.09.19 ~ 2024.09.30</p>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <div className="img_con">
                                        <a href="#none"><img
                                            src="https://img.cgv.co.kr/WebApp/contents/eventV4/41995/17267279346770.jpg"/></a>
                                    </div>
                                    <p className="event_title">트랜스포머 ONE_IMAX 포스터</p>
                                    <p className="event_day">2024.09.19 ~ 2024.09.30</p>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <div className="img_con">
                                        <a href="#none"><img
                                            src="https://img.cgv.co.kr/WebApp/contents/eventV4/41993/17267090982490.jpg"/></a>
                                    </div>
                                    <p className="event_title">서프라이즈 온리 5천원[브레드 이발소]</p>
                                    <p className="event_day">2024.09.19 ~ 2024.10.31</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>


        </>
    );
}

export default Home;