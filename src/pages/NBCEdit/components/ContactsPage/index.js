import React from 'react';
import Contacts from '../Contacts';
import SocialNetworks from '../SocialNetworks';
import Card from '../../../../components/Card';
import {FormField, FormGroup} from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';

const ContactsPage = ({
        formik,
        phones,
        emails,
        social_networks,
        randomKeyGenerator,
}) => {
    return (
        <Card className="nursery-contacts">
            <h3>Контакты</h3>
            <div className="nursery-contacts__address">
            </div>
            <Contacts
                phones={phones}
                emails={emails}
                errors={formik.errors}
                randomKeyGenerator={randomKeyGenerator}
            />
            <SocialNetworks social_networks={social_networks} />
            <SubmitButton>Сохранить</SubmitButton>
            {formik.errors && !!Object.keys(formik.errors).length
                && <div className="nursery-edit__is-valid">Не все необходимые поля заполнены</div>}
        </Card>
    );
};

export default ContactsPage;
