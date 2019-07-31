import React, {useEffect} from "react"
import {CompanyContactsForm, CompanySocialForm} from '../Form'
import {connectProfile} from 'apps/ClientProfile/connectors'
import Card from 'components/Card'
import ClubInfo from 'apps/ClubInfo'
import LegalInfo from 'apps/ClubLegalInfo'
import BankInfo from 'apps/ClubBankInfo'

function ClientProfile(props) {
    const {
        getProfile,
        legal_information_id,
        bank_data_id,
    } = props;
    useEffect(() => {
        getProfile()
    }, []);

    return (
        <>
            <h2>Профиль</h2>
            <Card lg>
                <h3>ClubInfo</h3>
                {/*<ClubInfo clubId={12}/>*/}
            </Card>
            <Card lg>
                <h3>LegalInfo</h3>
                <LegalInfo legal_information_id={legal_information_id}/>
            </Card>
            <Card lg>
                <h3>BankInfo</h3>
                <BankInfo bank_data_id={bank_data_id}/>
            </Card>
            <Card lg>
                <h3>Контакты</h3>
                <CompanyContactsForm/>
            </Card>
            <Card lg>
                <h3>Социальные сети</h3>
                <CompanySocialForm/>
            </Card>
        </>
    );

}


export default connectProfile(ClientProfile);