import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Card from "../../../../components/Card";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Button from "../../../../components/Button";

import './styles.scss';

const CheckLitterStatus = ({ cardClicked }) => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { query } = useParams();

    useEffect(() => {
        if (query && query.length === 13) {
            setCode(query);
            requestTracking(query);
        }
    }, [query]);

    const handleSubmit = e => {
        e.preventDefault();
        requestTracking(code);
    };
    const handleReset = e => {
        e.preventDefault();
        setStatus(null);
        setCode('');
    };
    const handleInputClear = e => {
        e.preventDefault();
        setCode('');
    };

    const requestTracking = async (rcf) => {
        setLoading(true);
        await Request({

            url: `/api/dog/dog/everk_check_litter/${rcf}`
        }, data => {
            setStatus(data);
            if (!!data === false) {
                setAlert(true);
            }
        }, error => {
            console.log(error.response);
            setStatus([]);
        });

        setLoading(false);
    };

    return <Card className={`check-status ${cardClicked === 5 && `_active_card`}`} id="check-status__letter">
        <div className="search-form__image documents-status"/>
        <div className="check-status__icon" />
        <div className="check-status__text_wrap">
        <h3>Информация о ПОМЁТАХ</h3>
        <p>Введите номер родословной интересующей Вас производительницы, чтобы проверить информацию о её щенениях. Номер вводится без буквенного обозначения. После ввода нажмите на кнопку "Поиск".
        </p>
        <form onSubmit={handleSubmit}>
            <div className="check-status__wrap">
                <input
                    id="check-status-letter-track"
                    className="check-status__input"
                    type="text"
                    onChange={({ target }) => setCode(target.value.slice(0, 7).replace(/[^0-9]/g, ''))
                    }
                    value={code}
                    title="Допускается ввод только цифр"
                    placeholder="Введите номер родословной"
                    disabled={loading || status ? true : false}
                    required
                />
                {code &&
                    <button type="button" className={`check-status__cancel ${status ? `_hide` : ``}`} onClick={handleInputClear} />}
            </div>
            {!!status === false ? <div className="check-status__button">
                    <Button
                        className="btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        Поиск
                    </Button>
            </div>
                :
                <div className="check-status__button--clear">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleReset}
                    >
                        <span></span>
                    </button>
                </div>}
        </form>
        {
            loading
                ? <Loading centered={false} />
                : !!status && <div className="check-status__table">
                    <div className="check-status__info">
                        <h3 className="check-status__nickname">Кличка:<span>{status.dog_name}</span></h3>
                        <h3 className="check-status__breed">Порода:<span>{status.breed_name}</span></h3>
                    </div>

                    {status.litter && <table>
                        <colgroup>
                            <col width="15%" />
                            <col width="85%" />
                        </colgroup>
                        <tbody>
                            <tr className="check-status__table-heading">
                                <td>Дата</td>
                                <td>Количество щенков</td>
                            </tr>
                            {
                                status.litter.map((item, key) => {

                                    return (
                                        <tr key={key}>
                                            <td>{new Date(item.birth_date).toLocaleDateString("ru-RU")}</td>
                                            <td>{item.dog_count}</td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                    }



                </div>
        }
        {alert &&
            <Alert
                text="Номер не найден"
                autoclose={1.5}
                onOk={() => setAlert(false)}
            />
        }
        </div>
    </Card>
};

export default React.memo(CheckLitterStatus);