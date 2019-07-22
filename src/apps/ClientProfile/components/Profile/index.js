import React, {useEffect} from "react"
import {CompanyContactsForm, CompanyInfoForm, CompanySocialForm} from '../Form'
import {connectProfile} from 'apps/ClientProfile/connectors'
import Card from 'components/Card'

function ClientProfile({getProfile}) {
    useEffect(() => getProfile(), [])

    return (
        <>
            <Card lg>
                <h3>Основная информация</h3>
                <CompanyInfoForm/>
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