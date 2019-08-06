import React from 'react'
import {useVisibility} from "shared/hooks";
import List from '../List'
import Button from 'components/Button'
import ExhibitionDocumentsCreateForm from '../Form'

function ClientExhibitionDocumentsListCreate() {
    const {visibility, toggleVisibility} = useVisibility(false);
    return (<div>
        <List/>
        {visibility ? <ExhibitionDocumentsCreateForm/> : null}
        <Button onClick={toggleVisibility}>{visibility ? 'Скрыть' : 'Добавить'}</Button>
    </div>)
}

export default ClientExhibitionDocumentsListCreate

