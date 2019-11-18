import React from 'react'
import Card from 'components/Card'
import FooterSmall from 'components/Layout/FooterSmall'
import Container from 'components/Layout/Container'
import PublicLayout from 'components/Layout'
import ClubHeader from '../ClubHeader'
import FeaturedExhibitions from 'apps/Exhibitions/components/Featured'
import NewsListPublic from 'apps/ClientNews/components/ListPublic'
import ClubAddress from '../ClubAddress'
import ClubOwnerName from '../ClubOwnerName'
import ClubDescription from '../Description'
import ClubContacts from '../ClubContacts'
import ClubDocuments from '../ClubDocuments'
import ClubWorkingHours from '../ClubWorkingHours';
import ArticleCreateFormPublic from 'apps/ClientNews/components/Create'
import './styles.scss'

const Wrap = ({ children }) => <div className="HomePage__wrap">{children}</div>
const Content = ({ children }) => (
    <div className="HomePage__content">{children}</div>
)
const Side = ({ children }) => <div className="HomePage__side">{children}</div>

function HomePageLayout() {
    return (
        <PublicLayout>
            <Container className="home">
                <div style={{ padding: `0px 48px` }}>
                    <ClubHeader />
                    <Card>
                        <h4 className="text-upper">Выставки</h4>
                        <FeaturedExhibitions />
                    </Card>
                    <Wrap>
                        <Content>
                            <ClubDescription />
                            <ArticleCreateFormPublic />
                            <Card style={{ margin: '24px 0' }}>
                                <NewsListPublic />
                            </Card>
                        </Content>
                        <Side>
                            <Card>
                                <h4 className="text-upper">Контакты</h4>
                                <ClubAddress />
                                <ClubOwnerName />
                                <ClubContacts />
                                <ClubWorkingHours />
                                <h4 className="text-upper" style={{ marginTop: '30px' }}>Документы</h4>
                                <ClubDocuments />
                            </Card>
                        </Side>
                    </Wrap>
                </div>
            </Container>
            <FooterSmall />
        </PublicLayout>
    )
}
export default React.memo(HomePageLayout)