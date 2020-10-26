import React, {useEffect} from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import {connectWidgetLogin} from "../Login/connectors";
import "./index.scss";


const ConfirmSuccess = ({logOutUser}) => {
    useEffect(() => {
        logOutUser();
    }, []);

    return (
        <Layout>
            <div className="confirm-page">
                <Container className="content confirm-page__content">
                    <img src="/static/images/confirm-password/happy-dog.svg" alt="собака" className="confirm-page__img"/>
                    <h2 className="confirm-page__title">Ваш пароль успешно изменён!<br/> Теперь Вы можете войти в свою учётную запись с новым паролем.</h2>
                </Container>
            </div>
        </Layout>
    );
}

export default connectWidgetLogin(React.memo(ConfirmSuccess));