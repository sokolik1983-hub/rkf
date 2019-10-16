import React, { useContext } from 'react';
import { Form } from 'components/Form';
import { exhibitionDocumentFormConfig } from 'apps/ClientExhibitionDocuments/config';
import { connectDocumentFrom } from 'apps/ClientExhibitionDocuments/connectors';
import { ExhibitionIdContext } from 'apps/ClientExhibitionDocuments/context';
import { RenderFields } from './RenderFields';

function ExhibitionDocumentForm({
    addExhibitionDocumentSuccess,
    initialValues,
    hideForm
}) {
    const { exhibitionId } = useContext(ExhibitionIdContext);
    const transformValues = values => ({
        ...values,
        exhibition_id: exhibitionId
    });

    const onSuccess = data => {
        addExhibitionDocumentSuccess(data);
        hideForm();
    };

    if(!initialValues) {
        initialValues = {name: '', url: ''}
    }

    return (
        <Form
            onSuccess={onSuccess}
            transformValues={transformValues}
            initialValues={initialValues}
            {...exhibitionDocumentFormConfig}
        >
            <RenderFields />
        </Form>
    );
}

export default connectDocumentFrom(ExhibitionDocumentForm);
