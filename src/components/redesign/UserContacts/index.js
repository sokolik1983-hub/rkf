import React, { Fragment, useEffect, useState, useRef } from "react";
import { Collapse } from "react-collapse";

import Card from "../../Card";
import {formatWorkTime} from "../../../utils";
import {timeSecondsCutter} from "../../../utils/datetime";
import {Request} from "../../../utils/request";
import {beautify} from "../../../utils/phone";
import Counter from "../../CounterComponent";

import "./index.scss";


const UserContacts = ({
    id,
    legal_city,
    city,
    legal_address,
    address,
    owner_position,
    owner_name,
    contacts,
    work_time,
    documents,
    site,
    inn,
    kpp,
    ogrn,
    bank_name,
    bank_comment,
    rs_number,
    bic,
    is_active,
    name,
    counters,
    profileAlias
}) => {
    const [socials, setSocials] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const CollapseRef = useRef(null);

    useEffect(() => {
        (() => Request({
            url: '/api/clubs/SocialNetwork/list/' + id
        }, data => setSocials(data),
            error => console.log(error.response)
        ))();
    }, [id]);

    const handleClick = e => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    if (isHidden && CollapseRef && CollapseRef.current) {
        CollapseRef.current.content.offsetHeight > 150 && setIsHidden(false);
    }

    const legal_city_name = legal_city && legal_city.name;
    const city_name = (city && city.name) || legal_city_name;
    const legal_address_or_city = legal_address || legal_city_name;
    const address_or_city = address || legal_address || city_name;
    const mainEmail = contacts && contacts.filter(item => item.contact_type_id === 2)[0];
    const mainPhone = contacts && contacts.filter(item => item.contact_type_id === 1)[0];
    const showRequisites = !is_active && (!!inn || !!kpp || !!ogrn || !!bank_name || !!bic || !!rs_number);

    const getPhoneString = (main_phone, contactsList) => {
        let phonesStr = '';

        if (main_phone) phonesStr += `${main_phone.value}, `;

        if (contactsList && !!contactsList.length) {
            contactsList.filter(item => item.contact_type_id === 1).slice(1).map(contact => (
                phonesStr += `${beautify(contact.value)}, `
            ))
        };

        return phonesStr.substring(0, phonesStr.length - 2);
    };

    return (
        <Card className="user-contacts__info-wrap">
            <Collapse isOpened={isOpen} ref={CollapseRef}>
                <div className="user-contacts__info-title-wrap">
                    <h4 className="user-contacts__info-title">Контакты</h4>
                    {city_name && <span className="user-contacts__info-city">{city_name}</span>}
                </div>
                {owner_name
                    ? <p className="user-contacts__info-owner">
                        <span>{owner_position || 'Руководитель'}:&nbsp;</span>
                        <span>{owner_name}</span>
                    </p>
                    : <p className="user-contacts__info-owner"><span>Руководитель:&nbsp;</span><span>Не указан</span></p>
                }
                {mainEmail ?
                    <div className="user-contacts__info-email">
                        <p>
                            <span style={{ color: '#253c5e' }}>{mainEmail.description || 'E-mail'}:&nbsp;</span>
                            <a href={`mailto:${mainEmail.value}`}>{mainEmail.value}</a>
                        </p>
                    </div>
                    : <div className="user-contacts__info-email"><p><span style={{ color: '#253c5e' }}>E-mail:&nbsp;</span>Не указан</p></div>
                }
                {mainPhone || contacts
                    ? <div className="user-contacts__info-phone">
                        <p>
                            <span>{'Телефон'}:&nbsp;</span>
                            <span>{getPhoneString(mainPhone, contacts)}</span>
                        </p>
                    </div>
                    : <div className="user-contacts__info-phone"><p><span>Телефон:&nbsp;</span><span>Не указан</span></p></div>
                }
                <div className="user-contacts__info-email">
                    {contacts.filter(item => item.contact_type_id === 2).slice(1).map(contact => (
                        <p key={contact.id}>
                            <span>{contact.description || 'E-mail'}:&nbsp;</span>
                            <a href={`mailto:${contact.value}`}>{contact.value}</a>
                        </p>
                    ))}
                </div>
                {work_time && !!work_time.length &&
                    <div className="user-contacts__info-work-time">
                        <span>График работы:&nbsp;</span>
                        {formatWorkTime(work_time).map((period, i) => (
                            <span key={`work-${i}`}>
                                <span>{period.days.join(', ')}</span>
                            &nbsp;c {timeSecondsCutter(period.time_from)} до {timeSecondsCutter(period.time_to)}&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                        ))}
                    </div>
                }
                {name &&
                    <p className="user-contacts__info-name">
                        <span>Полное наименование</span>:&nbsp;
                        <span>{name}</span>
                    </p>
                }
                {legal_address_or_city &&
                    <p className="user-contacts__info-address">
                        <span>Юридический адрес</span>:&nbsp;
                        <span>{legal_address_or_city}</span>
                    </p>
                }
                {address_or_city &&
                    <p className="user-contacts__info-address">
                        <span>Фактический адрес</span>:&nbsp;
                        <span>{address_or_city}</span>
                    </p>
                }
                {bank_comment &&
                    <p className="user-contacts__info-bank">
                        <span>Банковские реквизиты</span>:&nbsp;
                        <span>{bank_comment}</span>
                    </p>
                }
                <div className="user-contacts__info-site">
                    <p>
                        <span>Сайт</span>:&nbsp;
                        {site ?
                            <a href={site} target="_blank" rel="noopener noreferrer">{site}</a> :
                            <span>-</span>
                        }
                    </p>
                </div>
                {socials && !!socials.length &&
                    <div className="user-contacts__info-socials">
                        <span>Соцсети:&nbsp;</span>
                        {socials.map(item => (
                            <Fragment key={item.id}>
                                <a href={item.site}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.description}
                                </a>&nbsp;&nbsp;
                            </Fragment>
                        ))}
                    </div>
                }
                {documents && !!documents.length &&
                    <div className="user-contacts__info-documents">
                        <h4 className="user-contacts__info-title">Документы</h4>
                        {documents.map(doc => (
                            <Fragment key={doc.id}>
                                <a href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {doc.name}
                                </a>
                                <br />
                            </Fragment>
                        ))}
                    </div>
                }
                {showRequisites &&
                    <div className="user-contacts__info-bank">
                        <h4 className="user-contacts__info-title">Реквизиты</h4>
                        {inn &&
                            <p className="user-contacts__info-details" style={{marginTop: '0'}}>
                                <span>ИНН: </span> {inn}
                            </p>
                        }
                        {kpp &&
                            <p className="user-contacts__info-details">
                                <span>КПП: </span> {kpp}
                            </p>
                        }
                        {ogrn &&
                            <p className="user-contacts__info-details">
                                <span>ОГРН: </span> {ogrn}
                            </p>
                        }
                        {bank_name &&
                            <p className="user-contacts__info-details">
                                <span>Банк: </span> {bank_name}
                            </p>
                        }
                        {bic &&
                            <p className="user-contacts__info-details">
                                <span>БИК: </span> {bic}
                            </p>
                        }
                        {rs_number &&
                            <p className="user-contacts__info-details">
                                <span>Расчетный счет: </span> {rs_number}
                            </p>
                        }
                    </div>
                }
            </Collapse>
            {!isHidden &&
                <a className={`user-contacts__info-show-more${isOpen ? ' opened' : ''}`} href="/" onClick={handleClick}> </a>
            }
            {!!counters &&
                <Counter counters = {counters} profileAlias = {profileAlias}/>
            }

        </Card>
    );
};

export default React.memo(UserContacts);