import React from 'react'
import {clubInfoFormConfig} from "apps/ClubInfo/config";
import {FormFormikEnhanced} from "components/Form";
import RenderFields from './RenderFields'

export function ClubInfoForm(isUpdate) {
    const onSuccess = data => console.log(data);
    const transformValues=values=>({...values, club_id:12})
    return (
        <FormFormikEnhanced
            isUpdate
            onSuccess={onSuccess}
            {...clubInfoFormConfig}
            transformValues={transformValues}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export function UpdateClubInfoForm({initialValues}) {
    const onSuccess = data => console.log(data)
    return (
        <FormFormikEnhanced
            isUpade={true}
            formInitials={initialValues}
            onSuccess={onSuccess}
            {...clubInfoFormConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}