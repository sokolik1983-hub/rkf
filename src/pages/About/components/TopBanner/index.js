import React from "react";
import Container from "../../../../components/Layouts/Container";
import "./index.scss";


const TopBanner = () => (
    <div className="about-page__top-banner">
        <Container className="top-banner">
            <div className="top-banner__info">
                <h2 className="top-banner__title">RKF.Online</h2>
                <p className="top-banner__subtitle">
                    Цифровая платформа российского кинологического сообщества
                </p>
            </div>
        </Container>
    </div>
);

export default React.memo(TopBanner);