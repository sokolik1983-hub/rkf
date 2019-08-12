import React from "react"
import ClientClubInfo from './components/ClubInfo'
import {useVisibility} from 'shared/hooks'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";
import {compose} from "redux";
import {connectClubInfo} from './connectors'
import {ClubInfoForm, UpdateClubInfoForm} from './components/Form'

function ClientClubInfoProxy({clubInfo}) {
    const {visibility, toggleVisibility} = useVisibility(false)
    return (
        <div>
            <button onClick={toggleVisibility}>Редактировать</button>
            {
                visibility ?
                    <UpdateClubInfoForm initialValues={clubInfo}/> :
                    <ClientClubInfo />
            }
        </div>
    )
}

const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});
export default compose(
    withReducer,
    withSaga,
    connectClubInfo,
)(ClientClubInfoProxy)