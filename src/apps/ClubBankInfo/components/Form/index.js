import React from 'react'
import {clubBankInfoFormConfig} from "apps/ClubBankInfo/config";
import {Form} from "components/Form";
import RenderFields from './RenderFields'
import {connectBankInfoForm} from "apps/ClubBankInfo/connectors";
import {usePushMessage} from 'apps/Messages/hooks'
import {defaultSuccessMessage} from 'shared/messages'


export function UpdateBankInfoForm(props) {
    const {clubBankInfo, updateBankInfoSuccess, bindSubmitForm} = props;
    const {push} = usePushMessage();
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
                <RenderFields/>
            </Form>
    )
}

export default connectBankInfoForm(UpdateBankInfoForm)