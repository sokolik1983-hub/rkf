import React from 'react'
import Card from 'components/Card'
import FooterSmall from 'components/Layout/FooterSmall'
import Container from 'components/Layout/Container'
import PublicLayout from 'components/Layout'
import ClubHeader from '../ClubHeader'
import FeaturedExhibitionsList from '../FeaturedExhibitions'
import News from '../News'
import ClubAddress from '../ClubAddress'
import Partners from '../Partners'
import { SponsorsData, PartnersData } from '../Partners/data'
import ClubDescription from '../Description'
import ClubContacts from '../ClubContacts'
import ClubDocuments from '../ClubDocuments'
import './styles.scss'

const Wrap = ({ children }) => <div className="HomePage__wrap">{children}</div>;
const Content = ({ children }) => <div className="HomePage__content">{children}</div>;
const Side = ({ children }) => <div className="HomePage__side">{children}</div>;

function HomePageLayout() {
    return (
        <PublicLayout>
            <Container className="home">
                <div style={{ padding: `0px 48px` }}>
                    <ClubHeader />
                    <FeaturedExhibitionsList />
                    <Wrap>
                        <Content>
                            <ClubDescription />
                            <News />
                        </Content>
                        <Side>
                            <Card>
                                <h4 className="text-upper">Контакты</h4>
                                <ClubAddress />
                                <ClubContacts />
                                <h4 className="text-upper">Документы</h4>
                                <ClubDocuments />
                            </Card>
                        </Side>
                    </Wrap>
                    <Partners title="Наши спонсоры" items={SponsorsData} />
                    <Partners title="Наши партнеры" items={PartnersData} />
                    <FooterSmall />
                    {/*<BigSlider slides={demoSlides}/>*/}
                    {/*<WeekExhibitions/>*/}
                    {/*<About/>*/}
                    {/*<News/>*/}
                    {/* <Partners/> */}
                    {/*<RegisterBlock/>*/}
                    {/*<SocialGallery/>*/}
                    {/*<SpecialOffersSubscription/>*/}
                </div>
            </Container>
        </PublicLayout>
    )

}
;

export default React.memo(HomePageLayout);