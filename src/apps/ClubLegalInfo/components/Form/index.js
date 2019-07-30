import React from 'react'
import {clubLegalInfoFormConfig} from "apps/ClubLegalInfo/config";
import {FormFormikEnhanced} from "components/Form";
import RenderFields from './RenderFields'
import {connectLegalInfoForm} from  "apps/ClubLegalInfo/connectors";

export function LegalInfoForm(isUpdate) {
    const onSuccess = data => console.log(data);
    const transformValues=values=>({...values, clubLegalInfo_id:12})
    return (
        <FormFormikEnhanced
            isUpdate
            onSuccess={onSuccess}
            {...clubLegalInfoFormConfig}
            transformValues={transformValues}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export function UpdateLegalInfoForm({initialValues, updateLegalInfoSuccess}) {
    const onSuccess = data => updateLegalInfoSuccess(data);
    return (
        <FormFormikEnhanced
            isUpdate={true}
            formInitials={initialValues}
            onSuccess={onSuccess}
            {...clubLegalInfoFormConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export default connectLegalInfoForm(UpdateLegalInfoForm)