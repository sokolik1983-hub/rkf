import React from 'react'
import {connectSocialFrom} from 'apps/ClubSocial/connectors'
import {RenderFields} from './RenderFields'
import {clubClubSocialConfig} from 'apps/ClubSocial/config'
import {FormFormikEnhanced} from "components/Form";

function ClubSocialForm({club_id, addClubSocialSuccess, initialValues, hideForm}) {
    const transformValues = values => ({...values, club_id});
    const onSuccess = data => {
        addClubSocialSuccess(data);
        hideForm()
    }
    return (
        <FormFormikEnhanced
            onSuccess={onSuccess}
            transformValues={transformValues}
            initialValues={initialValues}
            {...clubClubSocialConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export default connectSocialFrom(ClubSocialForm)