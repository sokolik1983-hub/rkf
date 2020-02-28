import React from 'react'
import { connectSocialFrom } from '../../connectors'
import { RenderFields } from './RenderFields'
import { clubClubSocialConfig } from '../../config'
import { FormFormikEnhanced } from "components/Form";

function ClubSocialForm({ club_id, addClubSocialSuccess, initialValues, hideForm, bindSubmitForm }) {
    const transformValues = values => ({ ...values, club_id, social_network_type_id: 1 });
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
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields />
        </FormFormikEnhanced>
    )
}

export default connectSocialFrom(ClubSocialForm)