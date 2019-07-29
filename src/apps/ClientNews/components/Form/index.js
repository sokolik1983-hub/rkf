import React from 'react'

import {FormFormikEnhanced} from 'components/Form'
import {newsStoryFormConfig} from 'apps/ClientNews/config'
import RenderFields from './RenderFields'
import {connectNewsForm} from 'apps/ClientNews/connectors'
const {fields} = newsStoryFormConfig;

function NewsStoryCreateForm({addNewsSuccess}) {
    const onCreateSuccess = values => addNewsSuccess(values);
    const transformValues = values => ({...values, profile_id: 12});
    return (
        <FormFormikEnhanced
            isMultipart
            onSuccess={onCreateSuccess}
            transformValues={transformValues}
            {...newsStoryFormConfig}
        >
            <RenderFields fields={fields}/>
        </FormFormikEnhanced>
    )
}

export default connectNewsForm(NewsStoryCreateForm)