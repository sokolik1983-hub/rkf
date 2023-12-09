import React from 'react';
import RenderFields from './RenderFields';
import {clubClubSocialConfig} from '../../config';
import {connectSocialFrom} from '../../connectors';
import {FormFormikEnhanced} from '../../../../../../components/Form';


const ClubSocialForm = ({
        club_id,
        addClubSocialSuccess,
        initialValues,
        hideForm,
        bindSubmitForm,
}) => {
    const transformValues = values => ({...values, club_id, social_network_type_id: 1});
    
    const onSuccess = data => {
        addClubSocialSuccess(data);
        hideForm();
    };

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
};

export default connectSocialFrom(React.memo(ClubSocialForm));