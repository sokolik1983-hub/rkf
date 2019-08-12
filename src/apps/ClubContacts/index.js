import React from "react"
import {compose} from 'redux'
import ClientContactList from './components/List'
import {useVisibility} from 'shared/hooks'
import {defaultReduxKey} from "./config";
import ClubContactsForm from './components/Form'
import Button from 'components/Button'
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";

function ClientClubContactsProxy() {
    const {visibility, toggleVisibility} = useVisibility(false);

    return (
        <div>
            <ClientContactList/>
            <Button onClick={toggleVisibility}>
                {visibility ? 'Скрыть форму' : 'Добавить контакт'}
            </Button>
            {
                visibility ?
                    <ClubContactsForm/>
                    : null
            }

        </div>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
)(ClientClubContactsProxy)