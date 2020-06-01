import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Request } from 'utils/request';
import Loading from 'components/Loading';
import Card from 'components/Card';
import './styles.scss';

const DocRegistry = ({ history, distinction }) => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const isPedigree = distinction === 'pedigree';
    const url = isPedigree
        ? `/api/requests/PedigreeRequest/register_of_documents?id=${id}`
        : `/api/requests/LitterRequest/register_of_documents?id=${id}`;

    useEffect(() => {
        Request({
            url: url
        }, result => setData(result));
    }, []);

    const { phone, mail, name, club_name, request_check_code, number, federation_name, declarants } = data;
    const date = new Date(data.date);
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    return !data.number
        ? <Loading />
        : <Card style={{ margin: 0 }}>
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Назад</button>
            </div>
            <div className="DocRegistry">
                <div className="request-check-code">Идентификатор документа: &nbsp;<em>{request_check_code}</em></div>
                <h1>Р Е Е С Т Р &nbsp; Д О К У М Е Н Т О В,</h1>
                <h2>приложенных к заявлению на {isPedigree ? 'оформление родословной' : 'регистрацию помета'}</h2>
                <div className="DocRegistry__columns">
                    <div>
                        <p><strong>Заявление №</strong>{number}</p>
                        <p><strong>Федерация: </strong>{federation_name}</p>

                        <p><strong>Наименование клуба: </strong>{club_name}</p>
                        <p><strong>ФИО заявителя: </strong>{name}</p>
                    </div>
                    <div>
                        <p>{`«${('0' + date.getDate()).slice(-2)}» ${monthNames[date.getMonth()]} ${date.getFullYear()} г.`}</p>
                        <br />
                        <p><strong>Тел. заявителя: </strong>{phone}</p>
                        <p><strong>E-mail заявителя: </strong>{mail}</p>
                    </div>
                </div>
                <h3>Квитанция об оплате</h3>
                <h3>Содержание заявление:</h3>
                <table>
                    <colgroup>
                        <col width="35" />
                        <col width="220" />
                        <col />
                        <col width="120" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>№<br />п/п</td>
                            <td>ФИО {isPedigree ? 'владельца собаки' : 'заводчика'}</td>
                            <td>Прикрепленные документы</td>
                            <td>Номер для отслеживания</td>
                        </tr>
                        {
                            declarants && declarants.map((d, key) => {
                                return <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{d.name}</td>
                                    <td>
                                        {
                                            d.documents && d.documents.map((d, key) => <p key={key}>{`- ${d}`}</p>)
                                        }
                                    </td>
                                    <td>{d.barcode}</td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
                <div className="print-button">
                    <a href="/" title="" onClick={e => { e.preventDefault(); window.print() }}>Печать</a>
                </div>
            </div>
        </Card>
}

export default DocRegistry;