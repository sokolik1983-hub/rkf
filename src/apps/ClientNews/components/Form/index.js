import React from 'react'

import {FormFormikEnhanced} from 'components/Form'
import {newsStoryFormConfig} from 'apps/ClientNews/config'
import RenderFields from './RenderFields'

const {fields} = newsStoryFormConfig;

export default function NewsStoryCreateForm({addNewsSuccess}) {
    const onCreateSuccess = values => addNewsSuccess(values);
    return (
        <FormFormikEnhanced
            onSuccess={onCreateSuccess}
            {...newsStoryFormConfig}
        >
            <RenderFields fields={fields}/>
        </FormFormikEnhanced>
    )
}