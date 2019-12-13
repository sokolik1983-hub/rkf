import React, { useContext } from 'react'
import { Form } from 'components/Form'
import { newsArticleFormConfig } from 'apps/ClientNews/config'
import RenderFields from './RenderFields'
import { connectArticleForm } from 'apps/ClientNews/connectors'
import { ClubRouteContext } from 'apps/HomePage/context'
import './styles.scss';

const { fields } = newsArticleFormConfig;

function ArticleCreateFormPublic({ addArticleSuccess }) {
    const { clubCommon } = useContext(ClubRouteContext);
    const onSuccess = values => {
        addArticleSuccess({ ...values, logo_link: clubCommon.logo_link });
    };
    const transformValues = values => {
        return { ...values, club_id: clubCommon.id };
    };
    return (
        <Form
            isMultipart
            onSuccess={onSuccess}
            transformValues={transformValues}
            resetForm="true"
            {...newsArticleFormConfig}
            className="ArticleCreateForm"
        >
            <RenderFields fields={fields} />
        </Form>
    )
}

export default connectArticleForm(ArticleCreateFormPublic)