import React, {memo} from "react";
import Card from "../../../../../components/Card";
import {SubmitButton} from "../../../../../components/Form";
import Contact from "../components/Contact";
// import SocialNetworks from '../SocialNetworks';


const ContactsSection = ({errors}) => {
    // const {}

    return (
        <Card className="nbc-edit__contacts-section">
            <h3>Контакты</h3>
            <Contact
                name="phones"
                title="Телефон"
                className="nbc-edit__contact"
            />
            <Contact
                name="emails"
                title="E-mail"
                className="nbc-edit__contact"
            />
            {/*<SocialNetworks social_networks={social_networks} />*/}
            <SubmitButton>Сохранить</SubmitButton>
            {errors && !!Object.keys(errors).length &&
                <div className="nbc-edit__is-valid">Не все необходимые поля заполнены</div>
            }
        </Card>
    );
};

export default memo(ContactsSection);
