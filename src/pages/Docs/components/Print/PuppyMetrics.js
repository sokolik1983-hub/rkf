import React from 'react';
import Card from 'components/Card';
import './styles.scss';

const PuppyMetrics = ({ history }) => {

    return <Card style={{ margin: 0 }}>
        <div className="club-documents-status__head">
            <button className="btn-backward" onClick={() => history.goBack()}>Назад</button>
        </div>
        <div className="PuppyMetrics">
            <img className="PuppyMetrics__logo" src="/static/images/header/rkf-logo-transparent.svg" alt="" />
            <p className="PuppyMetrics__centered-block">Бланк №10</p>
            <h1>РОССИЙСКАЯ КИНОЛОГИЧЕСКАЯ ФЕДЕРАЦИЯ<br />
                RUSSIAN KYNOLOGICAL FEDERATION</h1>
            <p className="PuppyMetrics__centered-block">127106 Москва, а/я 28. РКФ;    www.rkf.org.ru;    rkf@rkf.org.ru;</p>

            <h2>МЕТРИКА ЩЕНКА / ЩЕНЯЧЬЯ КАРТОЧКА / PUPPY CARD</h2>

            <p className="PuppyMetrics__bordered-block">Наименование, адрес и телефон кинологической организации, выдавшей метрику щенка<br />
                Name address and telephone of the organization which issued the puppy card</p>


            <p>Заполняется на компьютере специалистом КО или владельцем питомника в строгом соответствии с Актом обследования помета. Метрика щенка не дает права на племенное использование собаки и подлежит обязательному обмену на выписку из ВЕРК (свидетельство о происхождении собаки)
                см. Положения РКФ о Племенной работе)</p>
            <table>
                <colgroup>
                    <col width="125" />
                    <col width="125" />
                    <col width="125" />
                    <col width="125" />
                    <col width="125" />
                    <col width="125" />
                </colgroup>
                <tbody>
                    <tr>
                        <td colSpan="6" ><strong>ПОРОДА /</strong> BREED</td>
                    </tr>
                    <tr>
                        <td colSpan="6" ><strong>КЛИЧКА /</strong> NAME</td></tr>
                    <tr>
                        <td width="66%" colSpan="4">
                            <strong>ДАТА РОЖДЕНИЯ /</strong><br />DATE OF BIRTH &nbsp;&nbsp;&nbsp;«_______»____________________________202&nbsp;&nbsp;г.
                            </td>
                        <td colSpan="2"><strong>ПОЛ /</strong><br />SEX
                            </td>
                    </tr>
                    <tr>
                        <td width="50%" colSpan="3"><strong>ОКРАС /</strong><br />COLOUR</td>
                        <td colSpan="3"><strong>КЛЕЙМО /</strong><br />TATTOO</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td colSpan="2" width="66%"><strong>ОТЕЦ /</strong><br />SIRE</td>
                        <td><strong>РКФ № /</strong><br />RKF #</td>
                    </tr>
                    <tr>
                        <td colSpan="2" width="66%"><strong>МАТЬ /</strong><br />DAM</td>
                        <td><strong>РКФ № /</strong><br />RKF #</td>
                    </tr>
                    <tr>
                        <td width="33%"><strong>ЗАВОДЧИК /</strong> BREEDER<br /><br /><br /></td>
                        <td colSpan="2"><strong>АДРЕС /</strong> ADDRESS<br /> <br /><strong>E-mail:</strong></td>
                    </tr>
                    <tr>
                        <td width="33%"><strong>ВЛАДЕЛЕЦ /</strong> OWNER<br /><br /><br /></td>
                        <td colSpan="2"><strong>АДРЕС /</strong> ADDRESS<br /> <br /><strong>E-mail:</strong></td>
                    </tr>

                </tbody>
            </table>
            <div className="PuppyMetrics__footer">
                <p><strong><span style={{ textDecoration: 'underline' }}>ОСОБЫЕ ОТМЕТКИ</span>:</strong> Отбракован: &nbsp;&nbsp;<strong>НЕТ/ДА</strong></p>

                <p>
                    Оставлен на переосмотр: &nbsp;&nbsp;<strong>НЕТ/ДА</strong><br />
                    (указать причину переосмотра)
                </p>

                <p>
                    <strong>ПОДПИСЬ ЗАВОДЧИКА /</strong> BREEDER’S SIGNATURE________________________________________________________<br />
                    <strong>ПОДПИСЬ ОТВЕТСТВЕННОГО ЛИЦА КИНОЛОГИЧЕСКОЙ ОРГАНИЗАЦИИ /</strong><br />
                    KENNEL CLUB REPRESENTATIVE'S SIGNATURE______________________________________________<span style={{ marginLeft: '70px' }}>м.п.</span>
                </p>
            </div>
            <button type="button" onClick={() => window.print()}>Печать</button>
        </div>
    </Card>
}

export default PuppyMetrics;