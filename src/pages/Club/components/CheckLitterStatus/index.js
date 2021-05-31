import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../../../../components/Card";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import './styles.scss';

const CheckLitterStatus = ({status_clicked}) => {
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
    const handleBarcodeClear = e => {
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
    
    return <Card className={`check-status ${status_clicked ? `_active_card` : ``}`} id="check-status-anchor">
        <div className="check-status__icon" />
        <h3>Информация о ПОМЁТАХ</h3>
        <p>Введите номер родословной интересующей Вас производительницы, чтобы проверить информацию о её щенениях. Номер вводится без буквенного обозначения. После ввода нажмите на кнопку "Поиск".
        </p>
        <form onSubmit={handleSubmit}>
            <div className="check-status__wrap">
                <label htmlFor="check-status-anchor-track" className="search-form__label">Номер родословной</label>
                <input
                    id="check-status-anchor-track"
                    className="check-status__input"
                    type="text"
                    pattern="[0-9]{7}"
                    onChange={({ target }) =>  setCode(target.value.slice(0, 7).replace(/[^0-9]/g, ''))
                    }
                    value={code}
                    title="Допускается ввод только цифр"
                    placeholder=""
                    disabled={loading || status ? true : false}
                    required
                />
                {code &&
                    <button type="button" className={`check-status__cancel ${status ? `_hide` : ``}`} onClick={handleBarcodeClear} />}
                <div className="search-form__note">
                    Допускается ввод только цифр
                </div>
            </div>
            {!!status == false ? <div className="check-status__button">
                <button
                    type="submit"
                    disabled={loading}
                >
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="#90999e" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7106 11.0006H12.5006L16.7406 15.2606C17.1506 15.6706 17.1506 16.3406 16.7406 16.7506C16.3306 17.1606 15.6606 17.1606 15.2506 16.7506L11.0006 12.5006V11.7106L10.7306 11.4306C9.33063 12.6306 7.42063 13.2506 5.39063 12.9106C2.61063 12.4406 0.390626 10.1206 0.0506256 7.32063C-0.469374 3.09063 3.09063 -0.469374 7.32063 0.0506256C10.1206 0.390626 12.4406 2.61063 12.9106 5.39063C13.2506 7.42063 12.6306 9.33063 11.4306 10.7306L11.7106 11.0006ZM2.00063 6.50063C2.00063 8.99063 4.01063 11.0006 6.50063 11.0006C8.99063 11.0006 11.0006 8.99063 11.0006 6.50063C11.0006 4.01063 8.99063 2.00063 6.50063 2.00063C4.01063 2.00063 2.00063 4.01063 2.00063 6.50063Z" />
                    </svg>
                </button>
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
    </Card>
};

export default React.memo(CheckLitterStatus);