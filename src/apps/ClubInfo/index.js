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

function ClientClubInfoProxy({clubId, getClubInfo, clubInfo}) {
    const {visibility, toggleVisibility, setVisible, setInvisible} = useVisibility(false)
    if (clubInfo === null) {
        getClubInfo(clubId)
    }
    return (
        <div>
            <button onClick={toggleVisibility}>Редактировать</button>
            {
                visibility ?
                    <UpdateClubInfoForm initialValues={clubInfo}/> :
                    <ClientClubInfo {...clubInfo}/>
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