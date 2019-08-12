import React from "react"
import {compose} from 'redux'
import ClientDocumentList from './components/List'
import {useVisibility} from 'shared/hooks'
import {defaultReduxKey} from "./config";
import ClubDocumentsForm from './components/Form'
import Button from 'components/Button'
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";

function ClientClubDocumentsProxy({club_id}) {
    const {visibility, toggleVisibility} = useVisibility(false);

    return (
        <div>
            <ClientDocumentList club_id={club_id}/>
            <Button onClick={toggleVisibility}>
                {visibility ? 'Скрыть форму' : 'Добавить контакт'}
            </Button>
            {
                visibility ?
                    <ClubDocumentsForm club_id={club_id}/>
                    : null
            }

        </div>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
)(ClientClubDocumentsProxy)