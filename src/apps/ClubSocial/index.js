import React from "react"
import {compose} from 'redux'
import ClientSocialList from './components/List'
import {useVisibility} from 'shared/hooks'
import {defaultReduxKey} from "./config";
import ClubSocialForm from './components/Form'
import Button from 'components/Button'
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";

function ClientClubSocialProxy({bindSubmitForm}) {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);

    if(!visibility) {
        bindSubmitForm.submit(null, {});
    }

    return (
        <div>
            <ClientSocialList/>
            {
                visibility ?
                    <ClubSocialForm hideForm={setInvisible} bindSubmitForm={bindSubmitForm}/>
                    : null
            }
            <Button onClick={toggleVisibility}>
                {visibility ? 'Скрыть форму' : 'Добавить'}
            </Button>
        </div>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
)(ClientClubSocialProxy)