import React, {useState} from "react";
import {withRouter} from "react-router";
import {compose} from "redux";
import Loading from "components/Loading";
import {connectWidgetLogin} from "pages/Login/connectors";


const ActivateClub = ({club, history, logOutUser, close}) => {
    const [code, setCode] = useState(null);
    const [errorCode, setErrorCode] = useState(null);
    const [loading, setLoading] = useState(false);

    const onEmailSubmit = () => {
        setLoading(true);

        fetch('/api/Activation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "club_id": club.club_id,
                "mail": club.mail
            })
        })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                if (response.returnCode >= 200 && response.returnCode < 300) {
                    setCode('');
                } else {
                    alert(`Ошибка: ${Object.values(response.errors)}`);
                }
            });
    };

    const onCodeSubmit = e => {
        e.preventDefault();
        setLoading(true);

        fetch('/api/Activation/confirm', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "activation_code": code,
                "mail": club.mail
            })
        })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                if (response.returnCode >= 200 && response.returnCode < 300) {
                    alert('Регистрация завершена.\nДанные для входа отправлены на указанную почту.');
                    logOutUser();
                    history.push('/');
                } else {
                    setErrorCode(true);
                }
            });
    };

    return loading ?
        <Loading/> :
        <div className="club-registration__activate">
            <h4 className="club-registration__activate-header">{code === null ? 'Активация клуба' : 'Подтвердите ваш e-mail'}</h4>
            <button className="club-registration__activate-close" onClick={() => close()}/>
            <div className="club-registration__activate-content">
                <img className="club-registration__activate-content__img" src="/static/images/default/email.svg" alt=""/>
                <div className="club-registration__activate-content__text">
                    {code === null ?
                        <>
                            <div className="club-registration__activate-info">
                                <p>Пожалуйста, проверьте правильность указанной информации:</p>
                                <p><span>Название:&nbsp;</span><span>{club.name || club.legal_name}</span></p>
                                <p><span>ОГРН:&nbsp;</span><span>{club.ogrn || 'Отсутствует'}</span></p>
                                <p><span>ИНН:&nbsp;</span><span>{club.inn || 'Отсутствует'}</span></p>
                                <p><span>Адрес:&nbsp;</span><span>{club.address || club.legal_address || 'Отсутствует'}</span></p>
                                <p><span>ФИО руководителя:&nbsp;</span><span>{club.owner_name || 'Отсутствует'}</span></p>
                            </div>
                            <div className="club-registration__activate-email">
                                <p>Код активации будет отправлен на почту: <b>{club.mail}</b></p>
                                <p className="club-registration__activate-warn">Если информация указана неверно, воспользуйтесь формой обратной связи</p>
                            </div>
                        </> :
                        <div className="club-registration__activate-confirm">
                            <p>Мы отправили письмо с проверочным кодом на указанный вами адрес: <b>{club.mail}</b></p>
                            <p>Пожалуйста, зайдите в свою почту и введите полученный код ниже.</p>
                            <form onSubmit={onCodeSubmit} className="club-registration__activate-form">
                                <input
                                    className={errorCode ? 'club-registration__activate-form__input __error' : 'club-registration__activate-form__input'}
                                    size="30"
                                    type="text"
                                    onChange={e => setCode(e.target.value)}
                                    onClick={() => setErrorCode(false)}
                                    minLength="4"
                                    required
                                    placeholder="Введите код активации"
                                />
                                {errorCode &&
                                    <span className="club-registration__activate-form__error">
                                        Введен неверный код активации
                                    </span>
                                }
                            </form>
                        </div>
                    }
                </div>
            </div>
            <div className="club-registration__activate-btns">
                {code === null ?
                    <button className="btn btn-primary" onClick={onEmailSubmit}>Отправить</button>
                    :
                    <button className="btn btn-primary" onClick={onCodeSubmit}>Отправить</button>
                }
            </div>
        </div>
};

export default compose(withRouter, connectWidgetLogin)(React.memo(ActivateClub));