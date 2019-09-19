import React from 'react'
import { useVisibility } from 'shared/hooks'
import NewsStoryCreateForm from 'apps/ClientNews/components/Form'
import Card from 'components/Card'
import Button from 'components/Button'
import OutsideClickHandler from "react-outside-click-handler";
import { connectAuthVisible } from 'apps/Auth/connectors'


function CreateArticleForm({ isAuthenticated }) {
    const { visibility, toggleVisibility, setInvisible } = useVisibility(false);
    return (
        isAuthenticated
            ? <Card style={{ margin: '24px 0' }}>
                <div style={{ textAlign: 'right' }}>
                    {
                        !visibility
                            ? <Button className="btn btn-primary" onClick={toggleVisibility}>Добавить новость</Button>
                            : null
                    }
                </div>
                {
                    visibility ?
                        <OutsideClickHandler onOutsideClick={setInvisible}>
                            <NewsStoryCreateForm hideForm={setInvisible} />
                        </OutsideClickHandler>
                        : null
                }
            </Card>
            : null
    )
}

export default connectAuthVisible(CreateArticleForm);