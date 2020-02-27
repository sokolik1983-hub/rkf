import React from 'react'
import { clubLegalInfoFormConfig } from "../../config";
import { Form } from "components/Form";
import RenderFields from './RenderFields'
import { connectLegalInfoForm } from "../../connectors";

import { usePushMessage } from 'apps/Messages/hooks'

export function UpdateLegalInfoForm(props) {
    const { clubLegalInfo, updateLegalInfoSuccess, bindSubmitForm } = props;
    usePushMessage();

    if(clubLegalInfo && clubLegalInfo.registration_number) delete clubLegalInfo.registration_number;

    const onSuccess = data => {
        updateLegalInfoSuccess(data);
        // push(defaultSuccessMessage);
    };

    return (
        clubLegalInfo && <Form
            onSuccess={onSuccess}
            {...clubLegalInfoFormConfig}
            initialValues={clubLegalInfo}
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields />
        </Form>
    )
}

export default connectLegalInfoForm(UpdateLegalInfoForm)