import React from 'react'
import Card from "components/Card";
import Tabs, {TabContent} from "components/Tabs";
import ClubLegalInfo from 'apps/ClubLegalInfo'
import ClubInfo from "apps/ClubInfo";
import ClubContacts from 'apps/ClubContacts'
import ClubDocuments from 'apps/ClubDocuments'
import ClubSocial from 'apps/ClubSocial'
import './styles.scss'

function ClubEditPage() {
    return (
        <div className="ClubEditPage">
            <h2>Редкатирование клуба</h2>
            <Tabs className="ClubEditPage__tabs">
                <TabContent label="Общая информация">
                    <Card lg>
                        <ClubInfo/>
                    </Card>
                </TabContent>
                <TabContent label="Юр. Информация">
                    <Card lg>
                        <ClubLegalInfo/>
                    </Card>
                </TabContent>
                <TabContent label="Банковская информация">
                    <Card lg>
                        <h3>Банковская информация</h3>
                        <ClubLegalInfo/>
                    </Card>
                </TabContent>
                <TabContent label="Контакты">
                    <Card lg>
                        <h3>Контакты</h3>
                        <ClubContacts/>
                    </Card>
                </TabContent>
                <TabContent label="Ссылки на документы">
                    <Card lg>
                        <h3>Ссылки на документы</h3>
                        <ClubDocuments/>
                    </Card>
                </TabContent>
                <TabContent label="Социальные сети">
                    <Card lg>
                        <h3>Социальные сети</h3>
                        <ClubSocial/>
                    </Card>
                </TabContent>

            </Tabs>
        </div>
    )
};

export default ClubEditPage