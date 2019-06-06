import Window from "components/Window";
import {Link, withRouter} from "react-router-dom";
import React from "react";
import './style.scss'

const ConfirmRegistrationFailed = ({history}) => {
    const onClose = () => history.push('/auth/registration');
    return (
        <div className="confirm-registration">
            <Window
                style={{backgroundColor: '#FA5D50'}}
                image={'/static/icons/registration/failed_pic.svg'}
                onClose={onClose}
            >
                <h3 className="confirm-registration__title">Ваше время истекло :(</h3>
                <div className="confirm-registration__content">
                    <p>Время на подтверждение вашей почты истекло.
                        Пройдите этапы регистрации заново для того, чтобы получить новую ссылку для подтверждения на
                        вашу почту</p>
                    <Link to={'/auth/registration'} className="btn">Регистрация</Link>
                </div>
            </Window>
        </div>
    )
}

export default withRouter(ConfirmRegistrationFailed);