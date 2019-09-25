import React from 'react'
import NewsStoryCreateForm from 'apps/ClientNews/components/Form'
import Card from 'components/Card'
import { connectAuthVisible } from 'apps/Auth/connectors'


function CreateArticleForm({ isAuthenticated }) {

    if(!isAuthenticated) return null;

    return (
         <Card style={{ margin: '24px 0' }}>
            <NewsStoryCreateForm />
        </Card>
    )
}

export default connectAuthVisible(CreateArticleForm);