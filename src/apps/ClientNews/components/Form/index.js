import React from 'react'

import {FormFormikEnhanced} from 'components/Form'
import {newsStoryFormConfig} from 'apps/ClientNews/config'
import RenderFields from './RenderFields'
import {connectNewsForm} from 'apps/ClientNews/connectors'
const {fields} = newsStoryFormConfig;

function NewsStoryCreateForm({addNewsSuccess}) {
    const onCreateSuccess = values => addNewsSuccess(values);
    return (
        <FormFormikEnhanced
            isMultipart
            onSuccess={onCreateSuccess}
            {...newsStoryFormConfig}
        >
            <RenderFields fields={fields}/>
        </FormFormikEnhanced>
    )
}

export default connectNewsForm(NewsStoryCreateForm)