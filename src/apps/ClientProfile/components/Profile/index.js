import React, {useEffect} from "react"
import {CompanyContactsForm, CompanySocialForm} from '../Form'
import {connectProfile} from 'apps/ClientProfile/connectors'
import Card from 'components/Card'
import ClubInfo from 'apps/ClubInfo'
import ClientProfileAvatar from '../Avatar'
import ClientClubContacts from 'apps/ClubContacts'
import ClientClubDocuments from 'apps/ClubDocuments'
import LegalInfo from 'apps/ClubLegalInfo'
import BankInfo from 'apps/ClubBankInfo'

function ClientProfile(props) {
    const {
        legal_information_id,
        bank_data_id,
    } = props;
    return (
        <>
            <h2>Профиль</h2>
            <Card lg>
                <h3>Данные клуба</h3>
                <ClubInfo/>
            </Card>
            <Card lg>
                <LegalInfo/>
            </Card>
            <Card lg>
                <BankInfo/>
            </Card>
            <Card lg>
                <h3>Контакты</h3>
                <ClientClubContacts/>
            </Card>
            <Card lg>
                <h3>Ссылки на документы</h3>
                <ClientClubDocuments/>
            </Card>
            <Card lg>
                <h3>Социальные сети</h3>
                <CompanySocialForm/>
            </Card>
        </>
    );

}


export default connectProfile(ClientProfile);