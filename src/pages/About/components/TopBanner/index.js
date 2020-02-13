import React from "react";
import Container from "../../../../components/Layouts/Container";
import "./index.scss";


const TopBanner = () => (
    <div className="about-page__top-banner">
        <Container className="top-banner">
            <div className="top-banner__info">
                <h2 className="top-banner__title">Сердце кинологических сообществ</h2>
                <p className="top-banner__subtitle">
                    Наша миссия — создать лучшее в мире сообщество для людей, которые связаны с собаками, чтобы они могли расти и развиваться.
                </p>
            </div>
            <img src="/static/images/about/banner-img.svg" alt="" className="top-banner__img"/>
        </Container>
    </div>
);

export default React.memo(TopBanner);