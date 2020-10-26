import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import "./index.scss";


const ConfirmFailed = () => (
    <Layout>
        <div className="confirm-page">
            <Container className="content confirm-page__content">
                <img src="/static/images/confirm-password/sad-dog.svg" alt="собака" className="confirm-page__img"/>
                <h2 className="confirm-page__title">Изменение пароля отклонено</h2>
            </Container>
        </div>
    </Layout>
);

export default React.memo(ConfirmFailed);