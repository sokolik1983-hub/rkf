import React, {useState} from 'react';
import {withRouter} from 'react-router';
import {compose} from 'redux';
import {connectWidgetLogin} from "../../../Auth/connectors";


const ClubConfirm = ({ club, history, logOutUser }) => {
    const [code, setCode] = useState(null);

    const getFieldValue = field => field ? field : 'Отсутствует';

    const onEmailSubmit = (e) => {
        e.preventDefault();
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
                if (response.returnCode >= 200 && response.returnCode < 300) {
                    alert('Клуб активирован');
                    logOutUser();
                    history.push('/');
                } else {
                    alert('Произошла ошибка');
                }
            });
    };

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>ОГРН</th>
                        <th>ИНН</th>
                        <th>Адрес</th>
                        <th>ФИО</th>
                    </tr>
                    <tr>
                        <td>{getFieldValue(club.ogrn)}</td>
                        <td>{getFieldValue(club.inn)}</td>
                        <td>{getFieldValue(club.address ? club.address : club.legal_address)}</td>
                        <td>{getFieldValue(club.owner_name)}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Активация клуба</h3>
            {code === null ?
                <form onSubmit={onEmailSubmit}>
                    <p>Код активации будет отправлен на почту: <strong>{club.mail}</strong></p>
                    <p style={{fontWeight: '600', color: 'firebrick'}}>Если email указан неверно, воспользуйтесь формой обратной ссвязи</p>
                    <button style={{ marginTop: '10px' }} type="submit">Отправить</button>
                </form> :
                <form onSubmit={onCodeSubmit}>
                    <input size="30"
                           type="text"
                           onChange={(e) => setCode(e.target.value)}
                           minLength="4"
                           required
                           placeholder="Введите код активации"
                    />
                    <button type="submit" style={{ marginTop: '10px' }}>Отправить</button>
                </form>
            }
        </>
    );
};

export default compose(withRouter, connectWidgetLogin)(ClubConfirm);