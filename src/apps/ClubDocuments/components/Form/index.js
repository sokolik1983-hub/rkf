import React from 'react'
import {connectDocumentFrom} from 'apps/ClubDocuments/connectors'
import {RenderFields} from './RenderFields'
import {clubClubDocumentsConfig} from 'apps/ClubDocuments/config'
import {Form} from "components/Form";

function ClubDocumentForm({club_id, addClubDocumentSuccess, initialValues, hideForm}) {

    const transformValues = values => ({...values, club_id});
    const onSuccess = data => {
        addClubDocumentSuccess(data);
        hideForm()
    }
    return (
        <Form
            action={clubClubDocumentsConfig.formAction}
            onSuccess={onSuccess}
            transformValues={transformValues}
            initialValues={initialValues}
            {...clubClubDocumentsConfig}
        >
            <RenderFields/>
        </Form>
    )
}

export default connectDocumentFrom(ClubDocumentForm)