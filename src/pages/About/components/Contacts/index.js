import React from "react";
import Card from "../../../../components/Card";
import {formatWorkTime} from "../../../../utils";
import {timeSecondsCutter} from "../../../../utils/datetime";
import "./index.scss";


const Contacts = ({contacts, work_time}) => (
    <Card className="about-page__contacts contacts">
        <h4 className="contacts__title">Контакты</h4>
        {contacts && !!contacts.filter(item => item.contact_type_id === 1).length &&
            <div className="contacts__block _phone">
                {contacts.filter(item => item.contact_type_id === 1).map(item =>
                    <p key={item.id}>
                        <span className="contacts__block-title">{(item.description || "Телефон") + ':'}</span>
                        <span className="contacts__block-info">{item.value}</span>
                    </p>
                )}
            </div>
        }
        {contacts && !!contacts.filter(item => item.contact_type_id === 2).length &&
            <div className="contacts__block _email">
                {contacts.filter(item => item.contact_type_id === 2).map(item =>
                    <p key={item.id}>
                        <span className="contacts__block-title">{(item.description || "Email") + ':'}</span>
                        <a href={`mailto:${item.value}`} className="contacts__block-link">{item.value}</a>
                    </p>
                )}
            </div>
        }
        {work_time && !!work_time.length &&
            <div className="contacts__block _work">
                <h5 className="contacts__block-title">Часы работы</h5>
                {formatWorkTime(work_time).map((period, i) =>
                    <p key={`work-${i}`} className="contacts__block-info">
                        <span>{period.days.join(', ')}</span>
                        <br/>
                        c {timeSecondsCutter(period.time_from)} до {timeSecondsCutter(period.time_to)}
                    </p>
                )}
            </div>
        }
    </Card>
);

export default React.memo(Contacts);