import React, { Fragment, useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { formatWorkTime } from "../../../../utils";
import { timeSecondsCutter } from "../../../../utils/datetime";
import { Request } from "../../../../utils/request";
import { beautify } from "../../../../utils/phone";
import { endpointGetSocials } from "../../config";
import { Collapse } from 'react-collapse';
import "./index.scss";


const ClubInfo = ({
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

    useEffect(() => {
        (() => Request({
            url: endpointGetSocials + id
        }, data => setSocials(data),
            error => console.log(error.response)
        ))();
    }, [id]);

    const handleClick = e => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    const legal_city_name = legal_city && legal_city.name;
    const city_name = (city && city.name) || legal_city_name;
    const legal_address_or_city = legal_address || legal_city_name;
    const address_or_city = address || legal_address || city_name;

    const mainEmail = contacts && contacts.filter(item => item.contact_type_id === 2)[0];
    const mainPhone = contacts && contacts.filter(item => item.contact_type_id === 1)[0];
    const mainWorkTime = work_time && formatWorkTime(work_time)[0];
    return (
        <Card className="club-contacts__info-wrap">
            <Collapse isOpened={isOpen}>
                <h4 className="club-contacts__info-title">Контакты</h4>
                {owner_name &&
                    <p className="club-contacts__info-owner">
                        <span>{owner_position || 'Руководитель'}:&nbsp;</span>
                        <span>{owner_name ? owner_name : 'Не указан'}</span>
                    </p>
                }
                {contacts && !!contacts.length &&
                    <>
                        <div className="club-contacts__info-email">
                            <p key={mainEmail.id}>
                                <span style={{ color: '#253c5e' }}>{mainEmail.description || 'E-mail'}:&nbsp;</span>
                                {
                                    mainEmail.value
                                        ? <a href={`mailto:${mainEmail.value}`}>{mainEmail.value}</a>
                                        : 'Не указан'
                                }
                            </p>
                        </div>
                        <div className="club-contacts__info-phone">
                            <p key={mainPhone.id}>
                                <span>{mainPhone.description || 'Телефон'}:&nbsp;</span>
                                <span>
                                    {
                                        mainPhone.value
                                            ? beautify(mainPhone.value)
                                            : 'Не указан'
                                    }
                                </span>
                            </p>
                        </div>
                    </>
                }
                {work_time && !!work_time.length &&
                    <div className="club-contacts__info-work-time">
                        <span>График работы:&nbsp;</span>
                        {
                            mainWorkTime.days
                                ? <><span>{mainWorkTime.days.join(', ')}</span>&nbsp;c {timeSecondsCutter(mainWorkTime.time_from)} до {timeSecondsCutter(mainWorkTime.time_to)}</>
                                : 'Не указан'
                        }

                    </div>
                }
                <h4 className="club-contacts__info-title subtitle">Дополнительная информация</h4>
                <div className="club-contacts__info-email">
                    {contacts.filter(item => item.contact_type_id === 2).slice(1).map(contact => (
                        <p key={contact.id}>
                            <span>{contact.description || 'E-mail'}:&nbsp;</span>
                            <a href={`mailto:${contact.value}`}>{contact.value}</a>
                        </p>
                    ))}
                </div>
                <div className="club-contacts__info-phone">
                    {contacts.filter(item => item.contact_type_id === 1).slice(1).map(contact => (
                        contact.value && <p key={contact.id}>
                            <span>{contact.description || 'Телефон'}:&nbsp;</span>
                            <span>{beautify(contact.value)}</span>
                        </p>
                    ))}
                </div>

                {work_time && !!work_time.length &&
                    <div className="club-contacts__info-work-time">
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
                    <p className="club-contacts__info-name">
                        <span>Полное наименование</span>:&nbsp;
                    <span>{name}</span>
                    </p>
                }
                {legal_address_or_city &&
                    <p className="club-contacts__info-address">
                        <span>Юридический адрес</span>:&nbsp;
                    <span>{legal_address_or_city}</span>
                    </p>
                }
                {address_or_city &&
                    <p className="club-contacts__info-address">
                        <span>Фактический адрес</span>:&nbsp;
                    <span>{address_or_city}</span>
                    </p>
                }


                <div className="club-contacts__info-site">
                    <p>
                        <span>Сайт</span>:&nbsp;
                    {site ?
                            <a href={site} target="_blank" rel="noopener noreferrer">{site}</a> :
                            <span>-</span>
                        }

                    </p>
                </div>
                {socials && !!socials.length &&
                    <div className="club-contacts__info-socials">
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
                    <div className="club-contacts__info-documents">
                        <h4 className="club-contacts__info-title">Документы</h4>
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
                    <div className="club-contacts__info-bank">
                        <h4 className="club-contacts__info-title">Реквизиты</h4>
                        <p className="club-contacts__info-details">
                            <span>ИНН: </span> {inn}
                        </p>
                        <p className="club-contacts__info-details">
                            <span>КПП: </span> {kpp}
                        </p>
                        <p className="club-contacts__info-details">
                            <span>ОГРН: </span> {ogrn}
                        </p>
                        <p className="club-contacts__info-details">
                            <span>Банк: </span> {bank_name}
                        </p>
                        <p className="club-contacts__info-details">
                            <span>БИК: </span> {bic}
                        </p>
                        <p className="club-contacts__info-details">
                            <span>Расчетный счет: </span> {rs_number}
                        </p>
                    </div>
                }</Collapse>
            <a className={`club-contacts__info-show-more${isOpen ? ' opened' : ''}`} href="/" onClick={handleClick}> </a>
        </Card>
    );
};

export default React.memo(ClubInfo);