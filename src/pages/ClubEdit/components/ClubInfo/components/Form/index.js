import React from 'react';
import { Form } from "components/Form";
import { connectClubInfoForm } from 'apps/ClientClub/connectors';
import { clubInfoFormConfig } from "../../config";
import RenderFields from './RenderFields';
import { usePushMessage } from 'apps/Messages/hooks';
import ls from 'local-storage';

function ClubInfoForm({ clubInfo, clubInfoUpdateSuccess, bindSubmitForm }) {
    usePushMessage();
    const transformValues = values => {
        let newValues = { ...values };

        // if (!newValues.city_id) delete newValues.city_id;
        if (newValues.status_id) delete newValues.status_id;

        newValues.site = values.site || null;

        return { ...newValues }
    };
    const onSuccess = values => {
        clubInfoUpdateSuccess(values);
        ls.set('user_info', { ...ls.get('user_info'), club_name: values.name });
        // push(defaultSuccessMessage)
    };

    return (
        <div style={{ flex: 2 }}>
            <h3>Общая информация</h3>
            <Form
                method={"PUT"}
                action={'/api/Club'}
                validationSchema={clubInfoFormConfig.validationSchema}
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
