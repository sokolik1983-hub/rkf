import React, {useEffect} from "react"
import ClientClubContacts from './components/ClubContacts'
import {useVisibility} from 'shared/hooks'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";
import {compose} from "redux";
import {connectClubContacts} from './connectors'
import UpdateClubContactsForm from './components/Form'

function ClientClubContactsProxy({legal_information_id, getClubContacts, clubClubContactsClubContacts}) {
    const {visibility, toggleVisibility, setVisible, setInvisible} = useVisibility(false)

    useEffect(() => {
        if (legal_information_id) {
            getClubContacts(legal_information_id)
        }
    }, [legal_information_id]);

    return (
        <div>
            <button onClick={toggleVisibility}>Редактировать</button>
            {
                visibility ?
                    <UpdateClubContactsForm initialValues={clubClubContactsClubContacts}/> :
                    <ClientClubContacts {...clubClubContactsClubContacts}/>
            }
        </div>
    )
}

const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});
export default compose(
    withReducer,
    withSaga,
    connectClubContacts,
)(ClientClubContactsProxy)