import React from 'react'
import {clubLegalInfoFormConfig} from "apps/ClubLegalInfo/config";
import {Form} from "components/Form";
import RenderFields from './RenderFields'
import {connectLegalInfoForm} from "apps/ClubLegalInfo/connectors";

import {usePushMessage} from 'apps/Messages/hooks'

import {defaultSuccessMessage} from 'shared/messages'

export function UpdateLegalInfoForm(props) {
    const {clubLegalInfo, updateLegalInfoSuccess} = props;
    const {push} = usePushMessage();
    const onSuccess = data => {
        updateLegalInfoSuccess(data);
        push(defaultSuccessMessage);
    };
    return (
        <Form

            onSuccess={onSuccess}
            {...clubLegalInfoFormConfig}
            initialValues={clubLegalInfo}
        >
            <RenderFields/>
        </Form>
    )
}

export default connectLegalInfoForm(UpdateLegalInfoForm)