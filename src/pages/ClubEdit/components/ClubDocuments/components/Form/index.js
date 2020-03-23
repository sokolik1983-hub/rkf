import React from "react";
import {Form} from "../../../../../../components/Form";
import RenderFields from "./RenderFields";
import {connectDocumentFrom} from "../../connectors";
import {clubClubDocumentsConfig} from "../../config";


const ClubDocumentForm = ({club_id, addClubDocumentSuccess, initialValues, hideForm, bindSubmitForm}) => {
    const transformValues = values => ({...values, club_id});

    const onSuccess = data => {
        addClubDocumentSuccess(data);
        hideForm();
    };

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
};

export default connectDocumentFrom(React.memo(ClubDocumentForm));