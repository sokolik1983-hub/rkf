import React from 'react'
import {useVisibility} from 'shared/hooks'
import NewsStoryCreateForm from 'apps/ClientNews/components/Form'

export default function CreateNewsStory() {
    const {visibility, toggleVisibility} = useVisibility(true);
    return (
        <>
            <button onClick={toggleVisibility}>toggleVisibility</button>
            {visibility ?
                <div className="CreateNewsStory">
                    <NewsStoryCreateForm/>
                </div>
                : null
            }
        </>
    )
}