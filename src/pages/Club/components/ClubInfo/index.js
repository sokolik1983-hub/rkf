import React, { Fragment, useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { formatWorkTime } from "../../../../utils";
import { timeSecondsCutter } from "../../../../utils/datetime";
import { Request } from "../../../../utils/request";
import { beautify } from "../../../../utils/phone";
import { endpointGetSocials } from "../../config";
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

    useEffect(() => {
        (() => Request({
            url: endpointGetSocials + id
        }, data => setSocials(data),
            error => console.log(error.response)
        ))();
    }, [id]);
    
    const fact_address = address || legal_address;

    return (
        <Card className="club-page__info-wrap">
            <h4 className="club-page__info-title">Контакты</h4>
            {name &&
                <p className="club-page__info-name">
                    <span>Полное наименование</span><br />
                    <span>{name}</span>
                </p>
            }
            {legal_address &&
                <p className="club-page__info-address">
                    <span>Юридический адрес</span><br />
                    <span>{legal_address}</span>
                </p>
            }
            {fact_address &&
                <p className="club-page__info-address">
                    <span>Фактический адрес</span><br />
                    <span>{fact_address}</span>
                </p>
            }
            {owner_name &&
                <p className="club-page__info-owner">
                    <span>{owner_position || 'Руководитель'}</span><br />
                    <span>{owner_name}</span>
                </p>
            }
            {contacts && !!contacts.length &&
                <>
                    <div className="club-page__info-phone">
                        {contacts.filter(item => item.contact_type_id === 1).map(contact => (
                            <p key={contact.id}>
                                <span>{contact.description || 'Телефон'}</span>
                                <br />
                                <span>{beautify(contact.value)}</span>
                            </p>
                        ))}
                    </div>
                    <div className="club-page__info-email">
                        {contacts.filter(item => item.contact_type_id === 2).map(contact => (
                            <p key={contact.id}>
                                <span>{contact.description || 'E-mail'}</span>
                                <br />
                                <a href={`mailto:${contact.value}`}>{contact.value}</a>
                            </p>
                        ))}
                    </div>
                </>
            }
            <div className="club-page__info-site">
                <p>
                    <span>Сайт</span>
                    <br />
                    {site ?
                        <a href={site} target="_blank" rel="noopener noreferrer">{site}</a> :
                        <span>-</span>
                    }

                </p>
            </div>
            {socials && !!socials.length &&
                <div className="club-page__info-socials">
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
            {work_time && !!work_time.length &&
                <div className="club-page__info-work-time">
                    <span>График работы</span>
                    {formatWorkTime(work_time).map((period, i) => (
                        <p key={`work-${i}`}>
                            <span>{period.days.join(', ')}</span>
                            <br />
                            c {timeSecondsCutter(period.time_from)} до {timeSecondsCutter(period.time_to)}
                        </p>
                    ))}
                </div>
            }
            {documents && !!documents.length &&
                <div className="club-page__info-documents">
                    <h4 className="club-page__info-title">Документы</h4>
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
                <div className="club-page__info-bank">
                    <h4 className="club-page__info-title">Реквизиты</h4>
                    <p className="club-page__info-details">
                        <span>ИНН: </span> {inn}
                    </p>
                    <p className="club-page__info-details">
                        <span>КПП: </span> {kpp}
                    </p>
                    <p className="club-page__info-details">
                        <span>ОГРН: </span> {ogrn}
                    </p>
                    <p className="club-page__info-details">
                        <span>Банк: </span> {bank_name}
                    </p>
                    <p className="club-page__info-details">
                        <span>БИК: </span> {bic}
                    </p>
                    <p className="club-page__info-details">
                        <span>Расчетный счет: </span> {rs_number}
                    </p>
                </div>
            }
        </Card>
    );
};

export default React.memo(ClubInfo);
