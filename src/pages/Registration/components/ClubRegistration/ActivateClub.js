import React, {useState} from "react";
import {withRouter} from "react-router";
import {compose} from "redux";
import Loading from "../../../../components/Loading";
import {connectWidgetLogin} from "../../../Login/connectors";


const ActivateClub = ({club, history, logOutUser}) => {
    const [code, setCode] = useState(null);
    const [loading, setLoading] = useState(false);

    const onEmailSubmit = (e) => {
        e.preventDefault();
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
                    alert('Код активации отправлен на ' + club.mail);
                    setCode('');
                } else {
                    alert(`Ошибка: ${Object.values(response.errors)}`);
                }
            });
    };

    const onCodeSubmit = (e) => {
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
                    alert('Клуб активирован');
                    logOutUser();
                    history.push('/');
                } else {
                    alert('Произошла ошибка');
                }
            });
    };

    return loading ?
        <Loading/> :
        <div className="club-registration__activate">
            <h3>{club.name || club.legal_name}</h3>
            <table className="club-registration__activate-table">
                <tbody>
                    <tr>
                        <th>ОГРН</th>
                        <th>ИНН</th>
                        <th>Адрес</th>
                        <th>ФИО</th>
                    </tr>
                    <tr>
                        <td>{club.ogrn || 'Отсутствует'}</td>
                        <td>{club.inn || 'Отсутствует'}</td>
                        <td>{club.address || club.legal_address || 'Отсутствует'}</td>
                        <td>{club.owner_name || 'Отсутствует'}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Активация клуба</h3>
            {code === null ?
                <form onSubmit={onEmailSubmit} className="club-registration__activate-form">
                    <p>Код активации будет отправлен на почту: <b>{club.mail}</b></p>
                    <p className="club-registration__activate-warn">Если email указан неверно, воспользуйтесь формой обратной ссвязи</p>
                    <button type="submit">Отправить</button>
                </form> :
                <form onSubmit={onCodeSubmit} className="club-registration__activate-form">
                    <input size="30"
                           type="text"
                           onChange={e => setCode(e.target.value)}
                           minLength="4"
                           required
                           placeholder="Введите код активации"
                    />
                    <button type="submit">Отправить</button>
                </form>
            }
        </div>
};

export default compose(withRouter, connectWidgetLogin)(React.memo(ActivateClub));