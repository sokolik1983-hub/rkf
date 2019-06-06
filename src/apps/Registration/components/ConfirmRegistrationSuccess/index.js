import Window from "components/Window";
import {Link, withRouter} from "react-router-dom";
import React from "react";
import './style.scss'

const ConfirmRegistrationSuccess = ({history}) => {
    const onClose = () => history.push('/');
    return (
        <div className="confirm-registration">
            <Window
                style={{backgroundColor: '#3366FF'}}
                image={'/static/icons/registration/success_pic.svg'}
                onClose={onClose}
            >
                <h3 className="confirm-registration__title">Спасибо за вашу регистрацию!</h3>
                <div className="confirm-registration__content">
                    <p>Мы выслали вам письмо на почту для подтверждения.
                        Зайдите на указанную вами почту и перейдите поссылке.
                        Ссылка активна 24 часа.</p>
                </div>
                <Link to={'/'} className="btn">Понятно</Link>
            </Window>
        </div>
    )
}


export default withRouter(ConfirmRegistrationSuccess);