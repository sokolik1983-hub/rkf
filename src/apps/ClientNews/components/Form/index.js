import React, {useContext} from 'react'
import {Form} from 'components/Form'
import {newsArticleFormConfig} from 'apps/ClientNews/config'
import RenderFields from './RenderFields'
import {connectArticleForm} from 'apps/ClientNews/connectors'
import {ClubRouteContext} from 'apps/HomePage/context'

const {fields} = newsArticleFormConfig;

function ArticleCreateFormPublic({addArticleSuccess, hideForm}) {
    const {clubCommon} = useContext(ClubRouteContext);
    const onSuccess = values => {
        addArticleSuccess(values);
        if (hideForm !== undefined) {
            hideForm()
        }
    };
    const transformValues = values => ({...values, club_id: clubCommon.id});
    return (
        <Form
            isMultipart
            onSuccess={onSuccess}
            transformValues={transformValues}
            {...newsArticleFormConfig}
        >
            <RenderFields fields={fields}/>
        </Form>
    )
}

export default connectArticleForm(ArticleCreateFormPublic)