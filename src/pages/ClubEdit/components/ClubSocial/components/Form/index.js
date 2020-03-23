import React from "react";
import {FormFormikEnhanced} from "../../../../../../components/Form";
import RenderFields from "./RenderFields";
import {connectSocialFrom} from "../../connectors";
import {clubClubSocialConfig} from "../../config";


const ClubSocialForm = ({club_id, addClubSocialSuccess, initialValues, hideForm, bindSubmitForm}) => {
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