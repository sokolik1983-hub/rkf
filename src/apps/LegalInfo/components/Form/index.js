import React from 'react'
import {clubLegalInfoFormConfig} from "apps/LegalInfo/config";
import {FormFormikEnhanced} from "components/Form";
import RenderFields from './RenderFields'

export function LegalInfoForm(isUpdate) {
    const onSuccess = data => console.log(data);
    const transformValues=values=>({...values, club_id:12})
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

export function UpdateLegalInfoForm({initialValues}) {
    const onSuccess = data => console.log(data)
    const transformValues=values=>({...values, registration_date:null})
    return (
        <FormFormikEnhanced
            isUpdate={true}
            formInitials={initialValues}
            onSuccess={onSuccess}
            transformValues={transformValues}
            {...clubLegalInfoFormConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}