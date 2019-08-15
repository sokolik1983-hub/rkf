import React from 'react'
import {Form} from "components/Form";
import {connectClubInfoForm} from 'apps/ClientClub/connectors'
import RenderFields from './RenderFields'


function ClubInfoForm({clubInfo, clubInfoUpdateSuccess}) {
    const transformValues = values => ({...values});
    const onSuccess = values => clubInfoUpdateSuccess(values);
    return (
        <div>
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
