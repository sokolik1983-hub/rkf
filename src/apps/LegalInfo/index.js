import React, {useEffect} from "react"
import ClientLegalInfo from './components/LegalInfo'
import {useVisibility} from 'shared/hooks'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";
import {compose} from "redux";
import {connectLegalInfo} from './connectors'
import UpdateLegalInfoForm from './components/Form'

function ClientLegalInfoProxy({legal_information_id, getLegalInfo, clubLegalInfoLegalInfo}) {
    const {visibility, toggleVisibility, setVisible, setInvisible} = useVisibility(false)

    useEffect(() => {
        if (legal_information_id) {
            getLegalInfo(legal_information_id)
        }
    }, [legal_information_id]);

    return (
        <div>
            <button onClick={toggleVisibility}>Редактировать</button>
            {
                visibility ?
                    <UpdateLegalInfoForm initialValues={clubLegalInfoLegalInfo}/> :
                    <ClientLegalInfo {...clubLegalInfoLegalInfo}/>
            }
        </div>
    )
}

const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});
export default compose(
    withReducer,
    withSaga,
    connectLegalInfo,
)(ClientLegalInfoProxy)