import React, { Fragment, useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import Card from "../../Card";
import Counter from "../../CounterComponent";
import RandomKeyGenerator from "../../../utils/randomKeyGenerator";

import "./index.scss";


const UserDescription = ({
    mainInfo,
    additionalInfo,
    counters,
    profileAlias,
    judgeInfo,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [specializations, setSpecializations] = useState(null);

    useEffect(() => {
        !!judgeInfo && !!judgeInfo[0] && setSpecializations(judgeInfo.map(item => item.specializations))
    }, [judgeInfo]);

    const normalizeLink = link => {
        if (!link.includes('https://') || !link.includes('http://')) {
            return 'https://' + link;
        }
        return link;
    };

    const getAddressString = addressObj => {
        let address = '';
        if (addressObj) {
            if (addressObj.postcode) address += `${addressObj.postcode}, `;
            if (addressObj.city_name) address += `${addressObj.city_name}${addressObj.street_name ? addressObj.street_name && `, ` : ''}`;
            if (addressObj.street_name) address += `${addressObj.street_name}${addressObj.house_name && `, `}`;
            if (addressObj.house_name) address += `д. ${addressObj.house_name}${addressObj.building_name && `, `}`;
            if (addressObj.building_name) address += `стр. ${addressObj.building_name}${addressObj.flat_name && `, `}`;
            if (addressObj.flat_name) address += `кв. ${addressObj.flat_name}`;
        }
        return address;
    };

    const getPhoneString = (main_phone, phone_status, phonesList) => {
        let phonesStr = '';
        if (main_phone || phone_status) phonesStr += `${main_phone || phone_status}, `;
        if (phonesList && !!phonesList.length) phonesList.map((phone) => phonesStr += `${phone.value}, `);
        return phonesStr.substring(0, phonesStr.length - 2);
    };

    const {
        main_phone_value,
        main_phone_description,
        main_phone_status,
        main_mail_value,
        main_mail_description,
        main_mail_status,
        birth_date,
        birth_date_status
    } = mainInfo;

    const {
        city_name,
        address,
        emails,
        phones,
        social_networks,
        web_site,
        description
    } = additionalInfo || {};


    return (
        <Card className="user-description">
            <div className="user-description__head">
                <h4 className="user-description__title">О себе</h4>
                {city_name &&
                    <span className="user-description__city">{city_name}</span>
                }
            </div>
            <p className="user-description__item _birthday">
                <span className="user-description__item-title">Дата рождения:</span>&nbsp;
                <span>{birth_date || birth_date_status}</span>
            </p>
            <p className="user-description__item _email">
                <span className="user-description__item-title">{main_mail_description || 'E-mail'}:</span>&nbsp;
                {main_mail_value ?
                    <a href={`mailto:${main_mail_value}`} title={main_mail_value}>{main_mail_value}</a> :
                    <span>{main_mail_status}</span>
                }
            </p>
            {emails && !!emails.length &&
                emails.map(item =>
                    <p className="user-description__item _email" key={item.id}>
                        <span className="user-description__item-title">{item.description || 'E-mail'}:</span>&nbsp;
                        <a href={`mailto:${item.value}`} title={item.value}>
                            {item.value}
                        </a>
                    </p>
                )
            }
            <p className="user-description__item _phone">
                <span className="user-description__item-title">{main_phone_description || 'Телефон'}:</span>&nbsp;
                <span>{getPhoneString(main_phone_value, main_phone_status, phones)}</span>
            </p>
            {!!specializations?.length &&
                <>
                    <div className="user-description__item _specialization">
                        <div className="user-description__item-title">Специализация:&nbsp;&nbsp;</div>
                        <div className="user-description__item-specs">
                            {judgeInfo.map(item =>
                                item.specializations[0] !== 'Судья по породам' ?
                                    item.specializations.map(value =>
                                        <Link key={RandomKeyGenerator()}
                                              className="user-description__item-spec"
                                              to={`/referee/${item.judge_id}/2`}>
                                            {value}
                                        </Link>

                                    ) :
                                    <Link key={RandomKeyGenerator()}
                                          className="user-description__item-spec"
                                          to={`/referee/${item.judge_id}/1`}>
                                        {item.specializations}
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                    <div className="user-description__item _lists">
                        <div className="user-description__item-title">Лист судьи/специалиста:&nbsp;&nbsp;</div>
                        <div className="user-description__item-lists">
                            {judgeInfo.map(item =>
                                <>
                                    {item.referee_type_id === 1 &&
                                        <Link key={RandomKeyGenerator()} to={`/referee/${item.judge_id}/1`}>
                                            <span className="user-description__item-list">
                                                Лист судьи по породам №{item.cert_number}{judgeInfo.length > 1 && ','}
                                            </span>
                                        </Link>
                                    }
                                    {item.referee_type_id === 2 &&
                                        <Link key={RandomKeyGenerator()} to={`/referee/${item.judge_id}/2`}>
                                            <span className="user-description__item-list">
                                                Лист судьи/специалиста по рабочим качествам №{item.cert_number}&nbsp;
                                            </span>
                                        </Link>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </>
            }
            {additionalInfo &&
                <>
                    <Collapse isOpened={isOpen}>
                        {getAddressString(address) &&
                            <p className="user-description__item _address">
                                <span className="user-description__item-title">Адрес:</span>&nbsp;
                                <span>{getAddressString(address)}</span>
                            </p>
                        }
                        {web_site &&
                            <p className="user-description__item _site">
                                <span className="user-description__item-title">Сайт:</span>&nbsp;
                                <a href={web_site}
                                   title={web_site}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                >
                                    {web_site}
                                </a>
                            </p>
                        }
                        {social_networks && !!social_networks.length &&
                            <p className="user-description__item _socials">
                                <span className="user-description__item-title">Соцсети:</span>
                                {social_networks.map(item => (
                                    <Fragment key={item.id}>
                                        <br />
                                        <a href={normalizeLink(item.site)}
                                           title={item.description || item.site}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                        >
                                            {item.description || item.site}
                                        </a>
                                    </Fragment>
                                ))}
                            </p>
                        }
                        {description &&
                            <div className="user-description__item _describe">
                                <span className="user-description__item-title">Описание:</span>
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                        }
                    </Collapse>
                    <button
                        className={`user-description__btn${isOpen ? ' _open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </>
            }
            {!!counters &&
                <Counter
                    counters={counters}
                    profileAlias={profileAlias}
                    judgeInfo={judgeInfo}
                />
            }
        </Card>
    )
};

export default React.memo(UserDescription);