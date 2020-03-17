import React, {Fragment} from "react";
import Card from "../Card";
import {formatPhone, formatWorkTime} from "../../utils";
import {timeSecondsCutter} from "../../utils/datetime";
import "./index.scss";


const ContactsComponent = ({full_name, legal_address, address, owner_position, owner_name, contacts, site, work_time, ogrn, regdate}) => (
    <Card className="contacts-component">
        <h4 className="contacts-component__title">Контакты</h4>
        {full_name &&
            <div className="contacts-component__block _name">
                <h5 className="contacts-component__block-title">Полное наименование</h5>
                <p className="contacts-component__block-info">{full_name}</p>
            </div>
        }
        {legal_address &&
            <div className="contacts-component__block _address">
                <h5 className="contacts-component__block-title">Юридический адрес</h5>
                <p className="contacts-component__block-info">{legal_address}</p>
            </div>
        }
        {address &&
            <div className="contacts-component__block _address">
                <h5 className="contacts-component__block-title">Фактический адрес</h5>
                <p className="contacts-component__block-info">{address}</p>
            </div>
        }
        {owner_name &&
            <div className="contacts-component__block _person">
                <h5 className="contacts-component__block-title">{owner_position || 'Руководитель'}</h5>
                <p className="contacts-component__block-info">{owner_name}</p>
            </div>
        }
        {contacts && !!contacts.length && !!contacts.filter(item => item.contact_type_id === 1).length &&
            <div className="contacts-component__block _phone">
                {contacts.filter(item => item.contact_type_id === 1).map(item =>
                    <Fragment key={item.id}>
                        <h5 className="contacts-component__block-title">{item.description || "Телефон"}</h5>
                        <p className="contacts-component__block-info">{formatPhone(item.value)}</p>
                    </Fragment>
                )}
            </div>
        }
        {contacts && !!contacts.length && !!contacts.filter(item => item.contact_type_id === 2).length &&
            <div className="contacts-component__block _email">
                {contacts.filter(item => item.contact_type_id === 2).map(item =>
                    <Fragment key={item.id}>
                        <h5 className="contacts-component__block-title">{item.description || "Email"}</h5>
                        <a href={`mailto:${item.value}`} className="contacts-component__block-link">{item.value}</a>
                    </Fragment>
                )}
            </div>
        }
        <div className="contacts-component__block _site">
            <h5 className="contacts-component__block-title">Сайт</h5>
            <p className="contacts-component__block-info">
                {site ?
                    <a href={site} target="_blank" rel="noopener noreferrer">{site}</a> :
                    <span>-</span>
                }
            </p>
        </div>
        {work_time && !!work_time.length &&
            <div className="contacts-component__block _work">
                <h5 className="contacts-component__block-title">График работы</h5>
                {formatWorkTime(work_time).map((period, i) =>
                    <p key={`work-${i}`} className="contacts-component__block-info">
                        <span>{period.days.join(', ')}</span>
                        <br/>
                        c {timeSecondsCutter(period.time_from)} до {timeSecondsCutter(period.time_to)}
                    </p>
                )}
            </div>
        }
        {ogrn && !!ogrn.length &&
            <div className="contacts-component__block _ogrn">
                <h5 className="contacts-component__block-title">ОГРН</h5>
                <p className="contacts-component__block-info">{ogrn}</p>
            </div>
        }
        {regdate && !!regdate.length &&
            <div className="contacts-component__block _regdate">
                <h5 className="contacts-component__block-title">Дата регистрации</h5>
                <p className="contacts-component__block-info">{(new Date(regdate)).toLocaleDateString("ru-RU")}</p>
            </div>
        }
    </Card>
);

export default React.memo(ContactsComponent);
