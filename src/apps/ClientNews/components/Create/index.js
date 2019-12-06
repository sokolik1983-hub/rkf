import React from 'react'
import NewsStoryCreateForm from 'apps/ClientNews/components/Form'
import Card from 'components/Card'
import { connectClubArticleForm } from 'apps/Auth/connectors'


function CreateArticleForm({ isAuthenticated, profile_id, clubId }) {
    if (!isAuthenticated || profile_id !== clubId) return null;

    return (
        <Card style={{ marginBottom: '24px' }}>
            <NewsStoryCreateForm />
        </Card>
    )
}

export default connectClubArticleForm(CreateArticleForm);