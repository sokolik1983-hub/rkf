import React from 'react';
import ls from 'local-storage';
import RenderFields from './RenderFields';
import {clubInfoFormConfig} from '../../config';
import {Form} from '../../../../../../components/Form';
import {connectClubInfoForm} from '../../../../connectors';


const ClubInfoForm = ({
        clubInfo,
        clubInfoUpdateSuccess,
        bindSubmitForm,
        isFederation,
}) => {
    const transformValues = values => {
        let newValues = {...values};

        if (newValues.status_id) delete newValues.status_id;

        newValues.site = values.site || null;

        return {...newValues}
    };

    const onSuccess = values => {
        clubInfoUpdateSuccess(values);
        ls.set('user_info', { ...ls.get('user_info'), name: values.name });
    };


    return (
        <div>
            <Form
                method="PUT"
                action="/api/Club"
                validationSchema={clubInfoFormConfig.validationSchema}
                onSuccess={onSuccess}
                initialValues={clubInfo}
                transformValues={transformValues}
                bindSubmitForm={bindSubmitForm}
            >
                <RenderFields
                    isFederation={isFederation}
                />
            </Form>
        </div>
    )
};

export default connectClubInfoForm(React.memo(ClubInfoForm));