import React from 'react';
import Contacts from '../Contacts';
import SocialNetworks from '../SocialNetworks';
import Card from '../../../../components/Card';
import {FormField, FormGroup} from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';

const ContactsPage = ({
        formik,
        city_id,
        socials,
        working,
        contacts,
        postcode,
        flat_name,
        is_public,
        house_name,
        street_name,
        randomKeyGenerator,
}) => {
    return (
        <Card className="nursery__contacts">
            <h3>Контакты</h3>
            <div className="nursery__contacts__address">
                <FormGroup inline>
                    <FormField {...city_id} className="nursery-activation__select"/>
                    <FormField {...postcode} />
                </FormGroup>
                <FormGroup inline>
                    <FormField {...street_name} />
                    <FormField {...house_name} label="Дом"/>
                    <FormField {...flat_name} label="Пом."/>
                </FormGroup>
            </div>
            <Contacts
                contacts={contacts}
                is_public={is_public}
                errors={formik.errors}
                randomKeyGenerator={randomKeyGenerator}
            />
            <SocialNetworks socials={socials}/>
            <SubmitButton>Сохранить</SubmitButton>
            {formik.errors && !!Object.keys(formik.errors).length
                && <div className="NurseryEdit__is-valid">Не все необходимые поля заполнены</div>}
            {working && <div className="NurseryEdit__is-valid">Идёт загрузка файла...</div>}
        </Card>
    );
};

export default ContactsPage;
