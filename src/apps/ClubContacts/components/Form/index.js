import React from 'react'
import {connectContactFrom} from 'apps/ClubContacts/connectors'
import {RenderFields} from './RenderFields'
import {clubClubContactsConfig} from 'apps/ClubContacts/config'
import {FormFormikEnhanced} from "components/Form";

function ClubContactForm({club_id, addClubContactSuccess, initialValues, hideForm}) {
    const transformValues = values => ({...values, club_id});
    const onSuccess = data => {
        addClubContactSuccess(data);
        hideForm()
    }
    return (
        <FormFormikEnhanced
            onSuccess={onSuccess}
            transformValues={transformValues}
            initialValues={initialValues}
            {...clubClubContactsConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export default connectContactFrom(ClubContactForm)