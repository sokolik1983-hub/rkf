import React from 'react'
import {clubBankInfoFormConfig} from "apps/ClubBankInfo/config";
import {Form} from "components/Form";
import RenderFields from './RenderFields'
import {connectBankInfoForm} from "apps/ClubBankInfo/connectors";


export function UpdateBankInfoForm(props) {
    const {clubBankInfo, updateBankInfoSuccess} = props;
    const onSuccess = data => updateBankInfoSuccess(data);
    return (
        <Form

            onSuccess={onSuccess}
            {...clubBankInfoFormConfig}
            initialValues={clubBankInfo}
        >
            <RenderFields/>
        </Form>
    )
}

export default connectBankInfoForm(UpdateBankInfoForm)