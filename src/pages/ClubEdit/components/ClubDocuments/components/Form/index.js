import React from 'react'
import {connectDocumentFrom} from '../../connectors'
import {RenderFields} from './RenderFields'
import {clubClubDocumentsConfig} from '../../config'
import {Form} from "components/Form";

function ClubDocumentForm({club_id, addClubDocumentSuccess, initialValues, hideForm, bindSubmitForm}) {

    const transformValues = values => ({...values, club_id});
    const onSuccess = data => {
        addClubDocumentSuccess(data);
        hideForm()
    }

    if(!initialValues) {
        initialValues = {name: '', url: ''}
    }

    return (
        <Form
            action={clubClubDocumentsConfig.formAction}
            onSuccess={onSuccess}
            transformValues={transformValues}
            initialValues={initialValues}
            {...clubClubDocumentsConfig}
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields/>
        </Form>
    )
}

export default connectDocumentFrom(ClubDocumentForm)