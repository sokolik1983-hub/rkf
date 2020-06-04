import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Request } from 'utils/request';
import Loading from 'components/Loading';
import Card from 'components/Card';
import './styles.scss';

const PuppyMetrics = ({ history }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const { id: puppyId } = useParams();
    const { breed,
        dog_name,
        date_of_birth,
        sex_type,
        color,
        stamp,
        father_dog_name,
        mother_dog_name,
        father_dog_pedigree,
        mother_dog_pedigree,
        breeder_full_name,
        breeder_address,
        breeder_email,
        owner_full_name,
        owner_address,
        owner_email,
        is_rejected,
        left_for_review,
        reason_comment,
        nursery_name,
        nursery_phone,
        nursery_web_site,
        nursery_mail } = data;
    const date = new Date(date_of_birth);
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    useEffect(() => {
        setLoading(true);
        Request({
            url: `/api/requests/NurseryLitterRequest/puppy_metric?id=${puppyId}`
        }, result => {
            result && setData(result);
            setLoading(false);
        }, error => {
            console.log(error);
            setLoading(false);
        })
    }, []);

    return loading
        ? <Loading />
        : <Card style={{ margin: 0 }}>
            <div className="nursery-documents-status__head">
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
                Name address and telephone of the organization which issued the puppy card<br />
                    {nursery_name}&nbsp;{[nursery_phone, nursery_web_site, nursery_mail].filter(v => v).join(', ')}
                </p>


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
                            <td colSpan="6" >
                                <strong>ПОРОДА /</strong> BREED
                            <span className="PuppyMetrics__data">{breed}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" >
                                <strong>КЛИЧКА /</strong> NAME
                            <span className="PuppyMetrics__data">{dog_name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td width="66%" colSpan="4">
                                <strong>ДАТА РОЖДЕНИЯ /</strong><br />DATE OF BIRTH
                            <span className="PuppyMetrics__data">
                                    {
                                        date_of_birth
                                            ? `«${('0' + date.getDate()).slice(-2)}» ${monthNames[date.getMonth()]} ${date.getFullYear()} г.`
                                            : <span>&nbsp;&nbsp;&nbsp;«_______»____________________________202&nbsp;&nbsp;г.</span>
                                    }

                                </span>
                            </td>
                            <td colSpan="2">
                                <strong>ПОЛ /</strong><br />SEX
                            <span className="PuppyMetrics__data">{sex_type}</span>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%" colSpan="3">
                                <strong>ОКРАС /</strong><br />COLOUR
                            <span className="PuppyMetrics__data">{color}</span>
                            </td>
                            <td colSpan="3">
                                <strong>КЛЕЙМО /</strong><br />TATTOO
                            <span className="PuppyMetrics__data">{stamp}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan="2" width="66%">
                                <strong>ОТЕЦ /</strong><br />SIRE
                            <span className="PuppyMetrics__data">{father_dog_name}</span>
                            </td>
                            <td>
                                <strong>РКФ № /</strong><br />RKF #
                        <span className="PuppyMetrics__data">{father_dog_pedigree}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" width="66%">
                                <strong>МАТЬ /</strong><br />DAM
                            <span className="PuppyMetrics__data">{mother_dog_name}</span>
                            </td>
                            <td>
                                <strong>РКФ № /</strong><br />RKF #
                            <span className="PuppyMetrics__data">{mother_dog_pedigree}</span>
                            </td>
                        </tr>
                        <tr>
                            <td width="33%">
                                <div className="PuppyMetrics__column-block">
                                    <span><strong>ЗАВОДЧИК /</strong> BREEDER</span>
                                    <span className="PuppyMetrics__data no-margin">{breeder_full_name}</span>
                                </div>
                            </td>
                            <td colSpan="2"><strong>АДРЕС /</strong> ADDRESS<br />
                                <span className="PuppyMetrics__data no-margin">{breeder_address}</span>
                                <br /><strong>E-mail:</strong>
                                <span className="PuppyMetrics__data">{breeder_email}</span>
                            </td>
                        </tr>
                        <tr>
                            <td width="33%">
                                <div className="PuppyMetrics__column-block">
                                    <span><strong>ВЛАДЕЛЕЦ /</strong> OWNER</span>
                                    <span className="PuppyMetrics__data no-margin">{owner_full_name}</span>
                                </div>
                            </td>
                            <td colSpan="2"><strong>АДРЕС /</strong> ADDRESS<br />
                                <span className="PuppyMetrics__data no-margin">{owner_address}</span>
                                <br /><strong>E-mail:</strong>
                                <span className="PuppyMetrics__data">{owner_email}</span>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="PuppyMetrics__footer">
                    <p>
                        <strong><span style={{ textDecoration: 'underline' }}>ОСОБЫЕ ОТМЕТКИ</span>:</strong>&nbsp;
                    Отбракован: <span className="PuppyMetrics__data">
                        <strong>{is_rejected ? 'ДА' : 'НЕТ'}</strong>&nbsp;
                            {is_rejected
                                ? `(${reason_comment})`
                                : `(_______________________________________________________________)`
                            }
                        </span>
                        {!is_rejected && <div style={{paddingLeft: '400px'}}>(указать причину отбраковки)</div>}
                    </p>

                    <p>
                        Оставлен на переосмотр: <span className="PuppyMetrics__data">
                            <strong>{left_for_review ? 'ДА' : 'НЕТ'}</strong>&nbsp;
                            {left_for_review
                                ? `(в ____ месяцев ${reason_comment})`
                                : `(в ____ месяцев ____________________________________________________________)`
                            }
                        </span>
                        {!left_for_review && <div style={{paddingLeft: '400px'}}>(указать причину переосмотра)</div>}
                        
                    </p>

                    <p>
                        <strong>ПОДПИСЬ ЗАВОДЧИКА /</strong> BREEDER’S SIGNATURE________________________________________________________<br />
                        <strong>ПОДПИСЬ ОТВЕТСТВЕННОГО ЛИЦА КИНОЛОГИЧЕСКОЙ ОРГАНИЗАЦИИ /</strong><br />
                    KENNEL CLUB REPRESENTATIVE'S SIGNATURE______________________________________________<span style={{ marginLeft: '70px' }}>м.п.</span>
                    </p>
                </div>
                <div className="print-button">
                    <a href="/" title="" onClick={e => { e.preventDefault(); window.print() }}>Печать</a>
                </div>
            </div>
        </Card>
}

export default PuppyMetrics;