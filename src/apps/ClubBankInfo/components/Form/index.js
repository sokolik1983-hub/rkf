import React from 'react'
import {clubBankInfoFormConfig} from "apps/ClubBankInfo/config";
import {FormFormikEnhanced} from "components/Form";
import RenderFields from './RenderFields'
import {connectBankInfoForm} from  "apps/ClubBankInfo/connectors";

export function BankInfoForm(isUpdate) {
    const onSuccess = data => console.log(data);
    const transformValues=values=>({...values, clubBankInfo_id:12})
    return (
        <FormFormikEnhanced
            isUpdate
            onSuccess={onSuccess}
            {...clubBankInfoFormConfig}
            transformValues={transformValues}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export function UpdateBankInfoForm({initialValues, updateBankInfoSuccess}) {
    const onSuccess = data => updateBankInfoSuccess(data);
    return (
        <FormFormikEnhanced
            isUpdate={true}
            formInitials={initialValues}
            onSuccess={onSuccess}
            {...clubBankInfoFormConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export default connectBankInfoForm(UpdateBankInfoForm)