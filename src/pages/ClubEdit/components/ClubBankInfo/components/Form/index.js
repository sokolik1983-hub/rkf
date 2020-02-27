import React from 'react'
import { clubBankInfoFormConfig } from "../../config";
import { Form } from "components/Form";
import RenderFields from './RenderFields'
import { connectBankInfoForm } from "../../connectors";
import { usePushMessage } from 'apps/Messages/hooks'


export function UpdateBankInfoForm(props) {
    const { clubBankInfo, updateBankInfoSuccess, bindSubmitForm } = props;
    usePushMessage();
    const onSuccess = data => {
        updateBankInfoSuccess(data);
        // push(defaultSuccessMessage)
    };

    return (
        clubBankInfo &&
        <Form
            onSuccess={onSuccess}
            {...clubBankInfoFormConfig}
            initialValues={clubBankInfo}
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields />
        </Form>
    )
}

export default connectBankInfoForm(UpdateBankInfoForm)