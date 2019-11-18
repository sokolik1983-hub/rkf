import React from 'react'
import { clubLegalInfoFormConfig } from "apps/ClubLegalInfo/config";
import { Form } from "components/Form";
import RenderFields from './RenderFields'
import { connectLegalInfoForm } from "apps/ClubLegalInfo/connectors";

import { usePushMessage } from 'apps/Messages/hooks'

export function UpdateLegalInfoForm(props) {
    const { clubLegalInfo, updateLegalInfoSuccess, bindSubmitForm } = props;
    usePushMessage();
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