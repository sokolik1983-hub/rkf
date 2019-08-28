import React from 'react'
import Card from "components/Card";
import ClubLegalInfo from 'apps/ClubLegalInfo'
import ClubBankInfo from 'apps/ClubBankInfo'
import ClubInfo from "apps/ClubInfo";
import ClubContacts from 'apps/ClubContacts'
import ClubDocuments from 'apps/ClubDocuments'
import ClubSocial from 'apps/ClubSocial'
import './styles.scss'


function ClubEditPage() {
    return (
        <div className="ClubEditPage">
            <h2>Личный кабинет</h2>

            <Card>
                <ClubInfo/>
            </Card>
            <Card>
                <ClubLegalInfo/>
            </Card>
            <Card>
                <ClubBankInfo/>
            </Card>
            <Card>
                <h3>Контакты</h3>
                <ClubContacts/>
            </Card>
            <Card>
                <h3>Ссылки на документы</h3>
                <ClubDocuments/>
            </Card>
            <Card>
                <h3>Социальные сети</h3>
                <ClubSocial/>
            </Card>

        </div>
    )
};

export default ClubEditPage