import React from 'react';
import RenderFields from './RenderFields';
import {clubClubDocumentsConfig} from '../../config';
import {connectDocumentFrom} from '../../connectors';
import {Form} from '../../../../../../components/Form';


const ClubDocumentForm = ({
        club_id,
        addClubDocumentSuccess,
        initialValues,
        hideForm,
        bindSubmitForm,
}) => {
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