import React from 'react'
import {clubLegalInfoFormConfig} from "apps/ClubLegalInfo/config";
import {Form} from "components/Form";
import RenderFields from './RenderFields'
import {connectLegalInfoForm} from "apps/ClubLegalInfo/connectors";


export function UpdateLegalInfoForm(props) {
    const {clubLegalInfo, updateLegalInfoSuccess} = props;
    const onSuccess = data => updateLegalInfoSuccess(data);
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