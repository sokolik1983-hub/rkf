import React, {Fragment} from 'react'
import {useVisibility} from 'shared/hooks'
import NewsStoryCreateForm from 'apps/ClientNews/components/Form'
import Button from 'components/Button'
import OutsideClickHandler from "react-outside-click-handler";


export default function CreateArticleForm() {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);
    return (
        <Fragment>
            <div style={{textAlign: 'right'}}>
                {!visibility ?
                    <Button className="btn btn-primary"
                            onClick={toggleVisibility}>
                        Добавить новость
                    </Button>
                    : null
                }
            </div>
            {
                visibility ?
                    <OutsideClickHandler onOutsideClick={setInvisible}>
                        <NewsStoryCreateForm hideForm={setInvisible}/>
                    </OutsideClickHandler>
                    : null
            }
        </Fragment>
    )
}