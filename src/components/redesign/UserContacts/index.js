import React, { Fragment, useEffect, useState, useRef } from "react";
import Card from "components/Card";
import { formatWorkTime } from "utils";
import { timeSecondsCutter } from "utils/datetime";
import { Request } from "utils/request";
import { beautify } from "utils/phone";
import { Collapse } from 'react-collapse';
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
    rs_number,
    bic,
    is_active,
    name
}) => {
    const [socials, setSocials] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

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
    }

    const CollapseRef = useRef(null);
    if (isHidden && CollapseRef && CollapseRef.current) {
        CollapseRef.current.content.offsetHeight > 150 && setIsHidden(false);
    }
    const legal_city_name = legal_city && legal_city.name;
    const city_name = (city && city.name) || legal_city_name;
    const legal_address_or_city = legal_address || legal_city_name;
    const address_or_city = address || legal_address || city_name;

    const mainEmail = contacts && contacts.filter(item => item.contact_type_id === 2)[0];
    const mainPhone = contacts && contacts.filter(item => item.contact_type_id === 1)[0];
    //const mainWorkTime = work_time && formatWorkTime(work_time)[0];
    return (
        <Card className="user-contacts__info-wrap">
            <Collapse isOpened={isOpen} ref={CollapseRef}>
                <h4 className="user-contacts__info-title">Контакты</h4>
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
                {mainPhone
                    ? <div className="user-contacts__info-phone">
                        <p>
                            <span>{mainPhone.description || 'Телефон'}:&nbsp;</span>
                            <span>{beautify(mainPhone.value)}</span>
                        </p>
                    </div>
                    : <div className="user-contacts__info-phone"><p><span>Телефон:&nbsp;</span><span>Не указан</span></p></div>
                }

                {address_or_city
                    ? <p className="user-contacts__info-address">
                        <span>Город</span>:&nbsp;
                    <span>{city_name ? city_name : 'Не указан'}</span>
                    </p>
                    : <p className="user-contacts__info-address">
                        <span>Город</span>:&nbsp;<span>Не указан</span>
                    </p>
                }
                {/* {work_time && !!work_time.length &&
                    <div className="user-contacts__info-work-time">
                        <span>График работы:&nbsp;</span>
                        {
                            mainWorkTime.days
                                ? <><span>{mainWorkTime.days.join(', ')}</span>&nbsp;c {timeSecondsCutter(mainWorkTime.time_from)} до {timeSecondsCutter(mainWorkTime.time_to)}</>
                                : 'Не указан'
                        }

                    </div>
                } */}
                <div className="user-contacts__info-email">
                    {contacts.filter(item => item.contact_type_id === 2).slice(1).map(contact => (
                        <p key={contact.id}>
                            <span>{contact.description || 'E-mail'}:&nbsp;</span>
                            <a href={`mailto:${contact.value}`}>{contact.value}</a>
                        </p>
                    ))}
                </div>
                <div className="user-contacts__info-phone">
                    {contacts.filter(item => item.contact_type_id === 1).slice(1).map(contact => (
                        contact.value && <p key={contact.id}>
                            <span>{contact.description || 'Телефон'}:&nbsp;</span>
                            <span>{beautify(contact.value)}</span>
                        </p>
                    ))}
                </div>

                {work_time && !!work_time.length &&
                    <div className="user-contacts__info-work-time">
                        <span>График работы</span>
                        {formatWorkTime(work_time).map((period, i) => (
                            <p key={`work-${i}`}>
                                <span>{period.days.join(', ')}</span>
                            &nbsp;c {timeSecondsCutter(period.time_from)} до {timeSecondsCutter(period.time_to)}
                            </p>
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
                        {socials.map(item => (
                            <Fragment key={item.id}>
                                <a href={item.site}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.description}
                                </a>
                                <br />
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
                {!is_active &&
                    <div className="user-contacts__info-bank">
                        <h4 className="user-contacts__info-title">Реквизиты</h4>
                        <p className="user-contacts__info-details">
                            <span>ИНН: </span> {inn}
                        </p>
                        <p className="user-contacts__info-details">
                            <span>КПП: </span> {kpp}
                        </p>
                        <p className="user-contacts__info-details">
                            <span>ОГРН: </span> {ogrn}
                        </p>
                        <p className="user-contacts__info-details">
                            <span>Банк: </span> {bank_name}
                        </p>
                        <p className="user-contacts__info-details">
                            <span>БИК: </span> {bic}
                        </p>
                        <p className="user-contacts__info-details">
                            <span>Расчетный счет: </span> {rs_number}
                        </p>
                    </div>
                }</Collapse>
            {!isHidden && <a className={`user-contacts__info-show-more${isOpen ? ' opened' : ''}`} href="/" onClick={handleClick}> </a>}
        </Card>
    );
};

export default React.memo(UserContacts);