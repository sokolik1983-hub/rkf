import React, { Fragment, useState, useRef } from "react";
import { Collapse } from "react-collapse";
import {getPhoneString} from "../../../utils/getPhoneString";
import Card from "../../../components/Card"
import Counter from "../../../components/CounterComponent";

import "./index.scss";

const UserContacts = ({
                          alias,
                          bank_comment,
                          emails,
                          phones,
                          social_networks,
                          web_site,
                          name,
                          owner_name,
                          owner_position,
                          city_name,
                          counters,
                          breeds,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const CollapseRef = useRef(null);

    const handleClick = e => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    if (isHidden && CollapseRef && CollapseRef.current) {
        CollapseRef.current.content.offsetHeight > 130 && setIsHidden(false);
    };

    const mainEmail = emails && emails.filter(item => item.contact_type_id === 2)[0];
    const mainPhone = phones && phones.filter(item => item.contact_type_id === 1)[0];

    return (
        <Card className={`user-contacts__info-wrap ${!isHidden ? "collapse" : ""}`}>
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
                            <span>{mainEmail.description || 'E-mail'}:&nbsp;</span>
                            <a href={`mailto:${mainEmail.value}`}>{mainEmail.value}</a>
                        </p>
                    </div>
                    : <div className="user-contacts__info-email"><p><span>E-mail:&nbsp;</span>Не указан</p></div>
                }
                {mainPhone || phones
                    ? <div className="user-contacts__info-phone">
                        <p>
                            <span>{'Телефон'}:&nbsp;</span>
                            <span>{getPhoneString(mainPhone, phones)}</span>
                        </p>
                    </div>
                    : <div className="user-contacts__info-phone"><p><span>Телефон:&nbsp;</span><span>Не указан</span></p></div>
                }
                {name &&
                    <p className="user-contacts__info-name">
                        <span>Полное наименование</span>:&nbsp;
                        <span>{name}</span>
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
                        {web_site ?
                            <a href={web_site} target="_blank" rel="noopener noreferrer">{web_site}</a> :
                            <span>-</span>
                        }
                    </p>
                </div>
                {social_networks && !!social_networks.length &&
                    <div className="user-contacts__info-socials">
                        <span>Соцсети:&nbsp;</span>
                        {social_networks.map(item => (
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
            </Collapse>
            {!isHidden &&
                <a className={`user-contacts__info-show-more${isOpen ? ' opened' : ''}`} href="/" onClick={handleClick}> </a>
            }
            {!!counters &&
                <Counter
                    counters={counters}
                    profileAlias={alias}
                    breeds={breeds}
                />
            }
        </Card>
    );
};

export default React.memo(UserContacts);