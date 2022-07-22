import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../../../components/Card";
import Alert from "../../../../components/Alert";
import Button from "../../../../components/Button";
import Loading from "../../../../components/Loading";
import CardOrganization from "../../../../components/CardOrganization";
import { Request } from "../../../../utils/request";

import "../FoundInfo/index.scss";


const StampSearch = ({cardClicked}) => {
    const [stamp_code, setStampCode] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { params } = useParams();

    useEffect(() => {
        if (params && params.length === 3) {
            setStampCode(params);
        }
    }, [params]);

    const handleSubmit = e => {
        e.preventDefault();
        requestTracking(stamp_code);
    };

    const handleReset = e => {
        e.preventDefault();
        setStatus(false);
        setStampCode('');
    };

    const handleStampCodeClear = e => {
        e.preventDefault();
        setStampCode('');
    };

    const requestTracking = async (stamp_code) => {
        setLoading(true);

        await Request({
            url: `/api/requests/commonrequest/organizations_by_stamp_code?stamp_code=${stamp_code}`
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
        <Card id="stamp-search-anchor" className={cardClicked === 4 && `_active_card`}>
            <div className="search-form__image stamp-search"/>
            <div className="search-form__text_wrap">
            <h3>Поиск клуба/питомника по клейму</h3>
            <p className="search-form__text">Введите код клейма в поле на данной карточке и нажмите кнопку "Поиск". В случае если данные клейма содержатся в Базе РКФ, Вам будет показан клуб/питомник, за которым закреплено указанное Вами клеймо.</p>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__wrap">
                    <input
                        id="stamp-search-anchor-mark"
                        className="search-form__input"
                        type="text"
                        pattern="[A-Za-z]{3}"
                        onChange={({ target }) => setStampCode(target.value.slice(0,3).replace(/[^A-Za-z]/ig, ''))}
                        value={stamp_code}
                        title="Введите 3 латинских символа"
                        placeholder="Введите код клейма"
                        disabled={loading || status}
                        required
                    />
                    {stamp_code &&
                        <button
                            className={`search-form__cancel${status && ' _hide'}`}
                            type="button"
                            onClick={handleStampCodeClear}
                        />
                    }
                </div>
                {status ? <div className="search-form__button--clear">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleReset}
                        >
                            <span></span>
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
            </form>
            {loading ?
                <Loading centered={false} />
                :
                status && <div className="search-form__result">
                    {status.status === 1 &&
                        <>
                            <p>{status.message}</p>
                            {status.organizations.map((org, index) => {
                                return (
                                    <CardOrganization
                                        key={index + org.name}
                                        alias={org.alias}
                                        logo={org.logo}
                                        name={org.name}
                                        user_type={org.user_type}
                                        is_active={org.is_active}
                                        is_active_member={org.is_active_member}
                                        city_name={org.city_name}
                                        city_id={org.city_id}
                                        owner_name={org.owner_name}
                                        owner_position={org.owner_position}
                                        federation_name={org.federation_name}
                                        federation_alias={org.federation_alias}
                                        content={org.content}
                                        phones={org.phones}
                                        mails={org.mails}
                                        breeds={org.breeds}
                                    />
                                );
                            })}
                        </>
                    }
                    {status.status === 2 && <p>Данные о регистрации отсутствуют</p>}
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
    );
}

export default React.memo(StampSearch);
