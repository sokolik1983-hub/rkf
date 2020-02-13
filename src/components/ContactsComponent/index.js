import React, {Fragment} from "react";
import Card from "../Card";
import {formatWorkTime} from "../../utils";
import {timeSecondsCutter} from "../../utils/datetime";
import "./index.scss";


const ContactsComponent = ({address, owner_name, contacts, work_time}) => (
    <Card className="contacts-component">
        <h4 className="contacts-component__title">Контакты</h4>
        {address &&
            <div className="contacts-component__block _address">
                <h5 className="contacts-component__block-title">Адрес</h5>
                <p className="contacts-component__block-info">{address}</p>
            </div>
        }
        {owner_name &&
            <div className="contacts-component__block _person">
                <h5 className="contacts-component__block-title">Руководитель клуба</h5>
                <p className="contacts-component__block-info">{owner_name}</p>
            </div>
        }
        {contacts && !!contacts.length && !!contacts.filter(item => item.contact_type_id === 1).length &&
            <div className="contacts-component__block _phone">
                {contacts.filter(item => item.contact_type_id === 1).map(item =>
                    <Fragment key={item.id}>
                        <h5 className="contacts-component__block-title">{item.description || "Телефон"}</h5>
                        <p className="contacts-component__block-info">{item.value}</p>
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
        {work_time && !!work_time.length &&
            <div className="contacts-component__block _work">
                <h5 className="contacts-component__block-title">Часы работы </h5>
                {formatWorkTime(work_time).map((period, i) =>
                    <p key={`work-${i}`} className="contacts-component__block-info">
                        <span>{period.days.join(', ')}</span>
                        <br/>
                        c {timeSecondsCutter(period.time_from)} до {timeSecondsCutter(period.time_to)}
                    </p>
                )}
            </div>
        }
    </Card>
);

export default React.memo(ContactsComponent);