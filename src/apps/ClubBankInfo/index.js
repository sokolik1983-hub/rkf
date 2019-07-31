import React, {useEffect} from "react"
import ClientBankInfo from './components/BankInfo'
import {useVisibility} from 'shared/hooks'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";
import {compose} from "redux";
import {connectBankInfo} from './connectors'
import UpdateBankInfoForm from './components/Form'

function ClientBankInfoProxy({legal_information_id, getBankInfo, clubBankInfo}) {
    const {visibility, toggleVisibility, setVisible, setInvisible} = useVisibility(false)

    useEffect(() => {
        if (legal_information_id) {
            getBankInfo(legal_information_id)
        }
    }, [legal_information_id]);

    return (
        <div>
            <button onClick={toggleVisibility}>Редактировать</button>
            {
                visibility ?
                    <UpdateBankInfoForm initialValues={clubBankInfo}/> :
                    <ClientBankInfo {...clubBankInfo}/>
            }
        </div>
    )
}

const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});
export default compose(
    withReducer,
    withSaga,
    connectBankInfo,
)(ClientBankInfoProxy)