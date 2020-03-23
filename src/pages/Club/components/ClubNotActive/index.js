import React from "react";
import Layout from "../../../../components/Layouts";
import Container from "../../../../components/Layouts/Container";
import "./index.scss";


const ClubNotActive = () => (
    <Layout>
        <Container className="content club-not-active">
            <div className="club-not-active__content">
                <h1 className="club-not-active__title">Это временно</h1>
                <h2 className="club-not-active__subtitle">Клуб приостановил свою работу, но обещал возобновить...</h2>
            </div>
            <img src="/static/images/default/club-not-active.svg" alt="" className="club-not-active__img"/>
        </Container>
    </Layout>
);

export default React.memo(ClubNotActive);