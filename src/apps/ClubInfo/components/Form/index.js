import React from 'react'
import {Form} from "components/Form";
import {connectClubInfoForm} from 'apps/ClientClub/connectors'
import RenderFields from './RenderFields'
import {usePushMessage} from 'apps/Messages/hooks'
import {defaultSuccessMessage} from 'shared/messages'

function ClubInfoForm({clubInfo, clubInfoUpdateSuccess}) {
    const {push} = usePushMessage();
    const transformValues = values => ({...values});
    const onSuccess = values => {
        clubInfoUpdateSuccess(values);
        push(defaultSuccessMessage)
    };

    return (
        <div style={{flex:2}}>
            <h3>Общая информация</h3>
            <Form
                method={"PUT"}
                action={'/api/Club'}
                onSuccess={onSuccess}
                initialValues={clubInfo}
                transformValues={transformValues}
            >
                <RenderFields/>
            </Form>
        </div>
    )
}

export default connectClubInfoForm(ClubInfoForm)
