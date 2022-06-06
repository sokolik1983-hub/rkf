import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Request } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import CardOrganization from "../../../../components/CardOrganization";
import { DEFAULT_IMG } from "../../../../appConfig";
import Button from "../../../../components/Button";
import '../FoundInfo/index.scss';


const CheckRegistration = ({ cardClicked }) => {
    const [stamp_number, setStampNumber] = useState('');
    const [stamp_code, setStampCode] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { query, params } = useParams();

    useEffect(() => {
        if (query && query.length === 4) {
            setStampNumber(query);
        }
    }, [query]);

    useEffect(() => {
        if (params && params.length === 3) {
            setStampCode(params);
        }
    }, [params]);

    const handleSubmit = async e => {
        e.preventDefault();
        await requestTracking(stamp_number, stamp_code);
    };

    const handleReset = e => {
        e.preventDefault();
        setStatus(false);
        setStampCode('');
        setStampNumber('');
    };

    const handleStampCodeClear = e => {
        e.preventDefault();
        setStampCode('');
    };

    const handleStampNumberClear = e => {
        e.preventDefault();
        setStampNumber('');
    };

    const requestTracking = async (stamp_number, stamp_code) => {
        setLoading(true);

        await Request({
            url: `/api/requests/commonrequest/dog_registration_information?stamp_number=${stamp_number}&stamp_code=${stamp_code}`
        }, data => {
            setStatus(data);
        }, error => {
            console.log(error.response);
            setStatus(false);
            setAlert(true);
        });

        setLoading(false);
    };

    return (
        <Card id="check-registration-anchor" className={cardClicked === 3 && `_active_card` }>
            <div className="search-form__image check-registration"/>
            <div className="search-form__text_wrap">
            <h3>Регистрационные данные собаки</h3>
            <p className="search-form__text">В целях получения информации о факте регистрации помета в РКФ, наличии у собаки родословной или возможности ее получения введите код и номер клейма и нажмите кнопку "Поиск". Вся необходимая информация будет отображена ниже. Просим Вас использовать данную форму перед отправкой заявки на изготовление документов.</p>
            <form className="search-form registration" onSubmit={handleSubmit}>
                <div className="search-form__wrap">
                    <input
                        id="check-registration-anchor-mark"
                        className="search-form__input"
                        type="text"
                        pattern="[A-Za-z]{3}"
                        onChange={({ target }) => setStampCode(target.value.slice(0,3).replace(/[^A-Za-z]/ig, ''))}
                        value={stamp_code}
                        title="Введите 3 латинских символа"
                        placeholder="Код клейма"
                        disabled={loading || !!status}
                        required
                    />
                    {stamp_code &&
                        <button type="button" className={`search-form__cancel ${status ? `_hide` : ``}`} onClick={handleStampCodeClear} />}
                </div>
                <div className="search-form__wrap search-form__wrap-with_but">
                    <input
                        id="check-registration-anchor-mark-number"
                        className="search-form__input"
                        type="text"
                        pattern="[0-9]{,7}"
                        onChange={({ target }) => setStampNumber(target.value.slice(0,7).replace(/[^0-9]/g, ''))}
                        value={stamp_number}
                        title="Введите числовое значение номера клейма"
                        placeholder="Номер клейма"
                        disabled={loading || !!status}
                        required
                    />
                    {stamp_number &&
                        <button type="button" className={`search-form__cancel ${status ? `_hide` : ``}`} onClick={handleStampNumberClear} />}
                    {status ?
                        <div className="search-form__button--clear">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={handleReset}
                            >
                                <span />
                            </button>
                        </div>
                        :
                        <div className="search-form__button">
                            <Button
                                className="btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                Поиск
                            </Button>
                        </div>
                    }
                </div>
            </form>
            {loading ?
                <Loading centered={false} /> :
                status ?
                    <div className="search-form__result">
                        {status.status === 1 && <p>Данный помет зарегистрирован в РКФ. Вы можете подать заявку на оформление родословной.</p>}
                        {status.status === 2 && <p>{status.message}</p>}
                        {status.status === 3 &&
                            <>
                                <p style={{ color: 'red' }}>Данный помет не зарегистрирован в РКФ. Для уточнения деталей обратитесь в клуб/питомник. <br />
                                Вы не можете подать заявку на оформление родословной.</p>
                                <CardOrganization
                                    alias={status.alias}
                                    logo={status.logo}
                                    name={status.name}
                                    user_type={status.user_type}
                                    is_active={status.is_active}
                                    is_active_member={status.is_active_member}
                                    city_name={status.city_name}
                                    city_id={status.city_id}
                                    owner_name={status.owner_name}
                                    owner_position={status.owner_position}
                                    federation_name={status.federation_name}
                                    federation_alias={status.federation_alias}
                                    content={status.content}
                                    phones={status.phones}
                                    mails={status.mails}
                                    breeds={status.breeds}
                                />
                            </>
                        }
                        {status.status === 4 &&
                            <div className="search-form__default-content">
                                <h3>Ничего не найдено</h3>
                                <img src={DEFAULT_IMG.noNews} alt="Ничего не найдено" />
                            </div>
                        }
                    </div> :
                    null
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
    );
}

export default React.memo(CheckRegistration);