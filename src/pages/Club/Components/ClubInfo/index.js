import React, { Fragment, useEffect, useState } from "react";
import Card from "../../../../components/Card";
import {formatWorkTime} from "../../../../utils";
import { timeSecondsCutter } from "../../../../utils/datetime";
import { Request } from "../../../../utils/request";
import { endpointGetSocials } from "../../config";
import './index.scss';


const ClubInfo = ({id, legal_city, city, legal_address, address, owner_position, owner_name, contacts, work_time, documents, site}) => {
    const [socials, setSocials] = useState(null);

    useEffect(() => {
        (() => Request({
            url: endpointGetSocials + id
        }, data => setSocials(data),
            error => console.log(error.response)
        ))();
    }, [id]);

    return (
        <Card className="club-page__info-wrap">
            <h4 className="club-page__info-title">Контакты</h4>
            {legal_city && legal_city.name &&
                <p className="club-page__info-address">
                    <span>Юридический адрес</span><br />
                    <span>{`${legal_city.name}${legal_address ? ', ' + legal_address : ''}`}</span>
                </p>
            }
            {city && city.name &&
                <p className="club-page__info-address">
                    <span>Фактический адрес</span><br />
                    <span>{`${city.name}${address ? ', ' + address : ''}`}</span>
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
                                <span>{contact.description}</span>
                                <br />
                                <span>{contact.value}</span>
                            </p>
                        ))}
                    </div>
                    <div className="club-page__info-email">
                        {contacts.filter(item => item.contact_type_id === 2).map(contact => (
                            <p key={contact.id}>
                                <span>{contact.description}</span>
                                <br />
                                <a href={`mailto:${contact.value}`}>{contact.value}</a>
                            </p>
                        ))}
                    </div>
                </>
            }
            {site && !!contacts.length &&
                <div className="club-page__info-site">
                    <p>
                        <span>Сайт</span>
                        <br />
                        <a href={site} target="_blank" rel="noopener noreferrer">{site}</a>
                    </p>
                </div>
            }
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
                            <br/>
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
        </Card>
    );
};

export default React.memo(ClubInfo);