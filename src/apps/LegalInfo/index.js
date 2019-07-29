import React, {useEffect} from "react"
import ClientLegalInfo from './components/LegalInfo'
import {useVisibility} from 'shared/hooks'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";
import {compose} from "redux";
import {connectLegalInfo} from './connectors'
import {UpdateLegalInfoForm} from './components/Form'

function ClientLegalInfoProxy({legal_information_id, getLegalInfo, clubLegalInfo}) {
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
                    <UpdateLegalInfoForm initialValues={clubLegalInfo}/> :
                    <ClientLegalInfo {...clubLegalInfo}/>
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