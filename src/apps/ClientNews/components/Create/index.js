import React from 'react'
import {useVisibility} from 'shared/hooks'
import NewsStoryCreateForm from 'apps/ClientNews/components/Form'

export default function CreateNewsStory() {
    const {visibility, toggleVisibility} = useVisibility(false);
    return (
        <>
            <button onClick={toggleVisibility}>{visibility ? 'Скрыть форму':'Добавить новость'}</button>
            {visibility ?
                <div className="CreateNewsStory">
                    <NewsStoryCreateForm/>
                </div>
                : null
            }
        </>
    )
}