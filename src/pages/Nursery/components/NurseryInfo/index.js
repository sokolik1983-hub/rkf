import React, {Fragment} from "react";
import Card from "../../../../components/Card";
import {formatWorkTime} from "../../../../utils";
import {timeSecondsCutter} from "../../../../utils/datetime";
import {beautify} from "../../../../utils/phone";
import "./index.scss";

const getAddressString = addressObj => {
    let address = '';
    if(addressObj.postcode) address += `${addressObj.postcode}, `;
    if(addressObj.city_name) address += `${addressObj.city_name}, `;
    if(addressObj.street_type_name && addressObj.street_name) address += `${addressObj.street_type_name} ${addressObj.street_name}, `;
    if(addressObj.house_type_name && addressObj.house_name) address += `${addressObj.house_type_name} ${addressObj.house_name}, `;
    if(addressObj.flat_type_name && addressObj.flat_name) address += `${addressObj.flat_type_name} ${addressObj.flat_name}`;
    return address;
};


const NurseryInfo = ({
                      name,
                      legal_address,
                      fact_address,
                      owner_position,
                      owner_name,
                      contacts,
                      socials,
                      work_time,
                      documents,
                      site
                  }) => {
    const legalAddress = legal_address ? getAddressString(legal_address) : '';
    const factAddress = fact_address ? getAddressString(fact_address) : legalAddress;

    return (
        <Card className="nursery-page__info-wrap">
            <h4 className="nursery-page__info-title">Контакты</h4>
            {name &&
                <p className="nursery-page__info-name">
                    <span>Полное наименование</span><br />
                    <span>{name}</span>
                </p>
            }
            {legalAddress &&
                <p className="nursery-page__info-address">
                    <span>Юридический адрес</span><br />
                    <span>{legalAddress}</span>
                </p>
            }
            {factAddress &&
                <p className="nursery-page__info-address">
                    <span>Фактический адрес</span><br />
                    <span>{factAddress}</span>
                </p>
            }
            {owner_name &&
                <p className="nursery-page__info-owner">
                    <span>{owner_position || 'Руководитель'}</span><br />
                    <span>{owner_name}</span>
                </p>
            }
            {contacts && !!contacts.length &&
                <>
                    <div className="nursery-page__info-phone">
                        {contacts.filter(item => item.contact_type_id === 1).map(contact => (
                            contact.value && <p key={contact.id}>
                                <span title={contact.description || 'Телефон'}>{contact.description || 'Телефон'}</span>
                                <br />
                                <span>{beautify(contact.value)}</span>
                            </p>
                        ))}
                    </div>
                    <div className="nursery-page__info-email">
                        {contacts.filter(item => item.contact_type_id === 2).map(contact => (
                            <p key={contact.id}>
                                <span title={contact.description || 'E-mail'}>{contact.description || 'E-mail'}</span>
                                <br />
                                <a href={`mailto:${contact.value}`}>{contact.value}</a>
                            </p>
                        ))}
                    </div>
                </>
            }
            <div className="nursery-page__info-site">
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
                <div className="nursery-page__info-socials">
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
                <div className="nursery-page__info-work-time">
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
                <div className="nursery-page__info-documents">
                    <h4 className="nursery-page__info-title">Документы</h4>
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

export default React.memo(NurseryInfo);