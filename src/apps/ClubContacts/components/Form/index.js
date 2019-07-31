import React from 'react'
import {clubClubContactsClubContactsFormConfig} from "apps/ClubContacts/config";
import {FormFormikEnhanced} from "components/Form";
import RenderFields from './RenderFields'
import {connectClubContactsForm} from  "apps/ClubContacts/connectors";

export function ClubContactsForm(isUpdate) {
    const onSuccess = data => console.log(data);
    const transformValues=values=>({...values, clubClubContacts_id:12})
    return (
        <FormFormikEnhanced
            isUpdate
            onSuccess={onSuccess}
            {...clubClubContactsClubContactsFormConfig}
            transformValues={transformValues}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export function UpdateClubContactsForm({initialValues, updateClubContactsSuccess}) {
    const onSuccess = data => updateClubContactsSuccess(data);
    return (
        <FormFormikEnhanced
            isUpdate={true}
            formInitials={initialValues}
            onSuccess={onSuccess}
            {...clubClubContactsClubContactsFormConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export default connectClubContactsForm(UpdateClubContactsForm)