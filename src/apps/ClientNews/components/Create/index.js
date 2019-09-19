import React from 'react'
import { useVisibility } from 'shared/hooks'
import NewsStoryCreateForm from 'apps/ClientNews/components/Form'
import Card from 'components/Card'
import Button from 'components/Button'
import { connectAuthVisible } from 'apps/Auth/connectors'


function CreateArticleForm({ isAuthenticated }) {
    const { visibility, toggleVisibility, setInvisible } = useVisibility(false);

    if(!isAuthenticated) return null;

    return (
         <Card style={{ margin: '24px 0' }}>
             {!visibility ?
                 <div style={{ textAlign: 'right' }}>
                     <Button className="btn btn-primary" onClick={toggleVisibility}>Добавить новость</Button>
                 </div> :
                 <NewsStoryCreateForm hideForm={setInvisible} />
             }
        </Card>
    )
}

export default connectAuthVisible(CreateArticleForm);