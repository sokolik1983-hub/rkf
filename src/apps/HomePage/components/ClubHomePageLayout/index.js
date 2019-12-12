import React from 'react'
import Card from 'components/Card'
import FooterSmall from 'components/Layout/FooterSmall'
import Container from 'components/Layout/Container'
import PublicLayout from 'components/Layout'
import ClubHeader from '../ClubHeader'
import FeaturedExhibitions from 'apps/Exhibitions/components/Featured'
import NewsListPublic from 'apps/ClientNews/components/ListPublic'
import ClubAddress from '../ClubAddress'
import ClubSocial from '../ClubSocial'
import ClubOwnerName from '../ClubOwnerName'
import ClubDescription from '../Description'
import ClubContacts from '../ClubContacts'
import ClubDocuments from '../ClubDocuments'
import ClubWorkingHours from '../ClubWorkingHours';
import ArticleCreateFormPublic from 'apps/ClientNews/components/Create'
import './styles.scss'


function HomePageLayout() {
    return (
        <PublicLayout>
            <Container className="home">
                <div style={{ padding: `0px 48px` }}>
                    <ClubHeader />
                    <FeaturedExhibitions />
                    <div className="HomePage__wrap">
                        <div className="HomePage__content">
                            <ClubDescription />
                            <ArticleCreateFormPublic />
                            <NewsListPublic />
                        </div>
                        <div className="HomePage__side">
                            <Card style={{ padding: '18px' }}>
                                <h4 className="text-upper">Контакты</h4>
                                <ClubAddress />
                                <ClubOwnerName />
                                <ClubContacts />
                                <ClubSocial />
                                <ClubWorkingHours />
                                <ClubDocuments />
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
            <FooterSmall />
        </PublicLayout>
    )
}
export default React.memo(HomePageLayout)
