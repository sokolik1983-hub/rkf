import React from 'react'
import {connectContactFrom} from 'apps/ClubContacts/connectors'
import {RenderFields} from './RenderFields'
import {clubClubContactsConfig} from 'apps/ClubContacts/config'
import {FormFormikEnhanced} from "components/Form";

function ClubContactForm({club_id, addClubContactSuccess}) {
    const transformValues = values => ({...values, club_id});
    const onSuccess = data => addClubContactSuccess(data);
    return (
        <FormFormikEnhanced
            onSuccess={onSuccess}
            transformValues={transformValues}
            {...clubClubContactsConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export default connectContactFrom(ClubContactForm)