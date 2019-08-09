import React from 'react'

import {FormFormikEnhanced} from 'components/Form'
import {documentsFormConfig} from 'apps/ClientExhibitionDocuments/config'
import RenderFields from './RenderFields'
import {connectExhibitionDocumentsForm} from 'apps/ClientExhibitionDocuments/connectors'
const {fields} = documentsFormConfig;

function PriceCreateForm({addPriceSuccess}) {
    const onCreateSuccess = values => addPriceSuccess(values);
    return (
        <FormFormikEnhanced
            onSuccess={onCreateSuccess}
            {...documentsFormConfig}
        >
            <RenderFields fields={fields}/>
        </FormFormikEnhanced>
    )
}

export default connectExhibitionDocumentsForm(PriceCreateForm)