import React from "react"
import {compose} from 'redux'
import ClientDocumentList from './components/List'
import {useVisibility} from 'shared/hooks'
import {defaultReduxKey} from "./config";
import ClubDocumentsForm from './components/Form'
import Button from 'components/Button'
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";

function ClientClubDocumentsProxy({bindSubmitForm}) {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);

    if(!visibility && bindSubmitForm) {
        bindSubmitForm.submit(null, {});
    }

    return (
        <div>
            <ClientDocumentList/>
            {
                visibility ?
                    <ClubDocumentsForm hideForm={setInvisible} bindSubmitForm={bindSubmitForm}/>
                    : null
            }
            <Button onClick={toggleVisibility}>
                {visibility ? 'Скрыть форму' : 'Добавить документ'}
            </Button>
        </div>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
)(ClientClubDocumentsProxy)