import React, { useContext } from 'react';
import Button from 'components/Button';
import { Form, SubmitButton } from 'components/Form';
import { connectContactFrom } from 'apps/ClubContacts/connectors';
import { RenderFields } from './RenderFields';
import { clubClubContactsConfig } from 'apps/ClubContacts/config';
import { HTTP } from 'appConfig';
import { ContactTypeContext } from 'apps/ClubContacts/context';

function ClubContactForm({
    club_id,
    addClubContactSuccess,
    initialValues,
    hideForm
}) {
    const { contactType } = useContext(ContactTypeContext);

    const transformValues = values => ({ ...values, club_id });
    const onSuccess = data => {
        addClubContactSuccess(data);
        hideForm();
    };
    return (
        <Form
            action={clubClubContactsConfig.action}
            method={HTTP.post}
            onSuccess={onSuccess}
            transformValues={transformValues}
            initialValues={{
                ...clubClubContactsConfig.formInitials,
                contact_type_id: parseInt(contactType.value, 10)
            }}
            validationSchema={contactType.validationSchema}
        >
            <RenderFields />
            <div>
                <SubmitButton className="btn-green">Сохранить</SubmitButton>
                <Button className="btn-transparent" onClick={hideForm}>
                    Отменить
                </Button>
            </div>
        </Form>
    );
}

export default connectContactFrom(ClubContactForm);
