import React from 'react'
import { Form } from "components/Form";
import { connectClubInfoForm } from 'apps/ClientClub/connectors'
import RenderFields from './RenderFields'
import { usePushMessage } from 'apps/Messages/hooks'

function ClubInfoForm({ clubInfo, clubInfoUpdateSuccess, bindSubmitForm }) {
    usePushMessage();
    const transformValues = values => {
        let newValues = { ...values };

        if (!newValues.city_id) delete newValues.city_id;
        if (newValues.status_id) delete newValues.status_id;

        return { ...newValues }
    };
    const onSuccess = values => {
        clubInfoUpdateSuccess(values);
        // push(defaultSuccessMessage)
    };

    return (
        <div style={{ flex: 2 }}>
            <h3>Общая информация</h3>
            <Form
                method={"PUT"}
                action={'/api/Club'}
                onSuccess={onSuccess}
                initialValues={clubInfo}
                transformValues={transformValues}
                bindSubmitForm={bindSubmitForm}
            >
                <RenderFields />
            </Form>
        </div>
    )
}

export default connectClubInfoForm(ClubInfoForm)
