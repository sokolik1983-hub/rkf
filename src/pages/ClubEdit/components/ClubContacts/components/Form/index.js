import React, { useContext } from 'react';
import Button from 'components/Button';
import { Form, SubmitButton } from 'components/Form';
import { connectContactFrom } from '../../connectors';
import { RenderFields } from './RenderFields';
import { clubClubContactsConfig } from '../../config';
import { ContactTypeContext } from '../../context';

function ClubContactForm({
    club_id,
    addClubContactSuccess,
    initialValues,
    hideForm,
    bindSubmitForm
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
            method="POST"
            onSuccess={onSuccess}
            transformValues={transformValues}
            initialValues={{
                ...clubClubContactsConfig.formInitials,
                contact_type_id: parseInt(contactType.value, 10)
            }}
            validationSchema={contactType.validationSchema}
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields isMaskedTel={contactType.type === 'phone' ? true : false} />
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
