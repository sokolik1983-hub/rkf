import React, {useContext} from 'react';
import Button from '../../../../../../components/Button';
import {Form} from '../../../../../../components/Form';
import RenderFields from './RenderFields';
import {connectContactFrom} from '../../connectors';
import {clubClubContactsConfig} from '../../config';
import {ContactTypeContext} from '../../context';


const ClubContactForm = ({club_id, addClubContactSuccess, hideForm, bindSubmitForm}) => {
    const { contactType } = useContext(ContactTypeContext);

    const transformValues = values => ({...values, club_id});

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
            <RenderFields isMaskedTel={contactType.type === 'phone'} />
            <Button className="delete-mini" onClick={hideForm}>
                Удалить
            </Button>
        </Form>
    )
};

export default connectContactFrom(ClubContactForm);