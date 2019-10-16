import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const ClubConfirm = ({ club }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(null);
    const [activated, setActivated] = useState(false);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleCodeChange = (e) => setCode(e.target.value);
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
                "mail": email
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.returnCode >= 200 && response.returnCode < 300) {
                    alert('Код активации отправлен на ' + email);
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
                "activation_code": code
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.returnCode >= 200 && response.returnCode < 300) {
                    alert('Клуб активирован');
                    setActivated(true);
                } else {
                    alert('Произошла ошибка');
                }
            });
    }

    return (
        activated
            ? <Redirect to="/not-confirmed" />
            : <React.Fragment>
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
                <form onSubmit={onEmailSubmit}>
                    <input size="30" onChange={handleEmailChange} value={email} required type="email" placeholder="Введите email" />
                    <button style={{ marginLeft: '10px' }} type="submit">Отправить</button>
                </form>
                {
                    code !== null
                        ? <form onSubmit={onCodeSubmit}>
                            <input size="30" type="text" onChange={handleCodeChange} minLength="4" required placeholder="Введите код активации" />
                            <button type="submit">Отправить</button>
                        </form>
                        : null
                }
            </React.Fragment>
    );
};

export default ClubConfirm;