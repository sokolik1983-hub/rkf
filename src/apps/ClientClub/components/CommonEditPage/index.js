import React from 'react'
import Card from "components/Card";
import ClubLegalInfo from 'apps/ClubLegalInfo'
import ClubBankInfo from 'apps/ClubBankInfo'
import ClubInfo from "apps/ClubInfo";
import ClubContacts from 'apps/ClubContacts'
import ClubDocuments from 'apps/ClubDocuments'
import ClubSocial from 'apps/ClubSocial'
import './styles.scss'
import ClubPublicLink from '../PublicLink'

function ClubEditPage() {
    return (
        <div className="ClubEditPage">
            <h2>Личный кабинет</h2>
            <Card style={{margin: '24px 0'}}>
                <ClubPublicLink/>
            </Card>
            <Card style={{margin: '24px 0'}}>
                <ClubInfo/>
            </Card>
            <Card style={{margin: '24px 0'}}>
                <ClubLegalInfo/>
            </Card>
            <Card style={{margin: '24px 0'}}>
                <ClubBankInfo/>
            </Card>
            <Card style={{margin: '24px 0'}}>
                <h3>Контакты</h3>
                <ClubContacts/>
            </Card>
            <Card style={{margin: '24px 0'}}>
                <h3>Ссылки на документы</h3>
                <ClubDocuments/>
            </Card>
            <Card style={{margin: '24px 0'}}>
                <h3>Социальные сети</h3>
                <ClubSocial/>
            </Card>

        </div>
    )
};

export default ClubEditPage