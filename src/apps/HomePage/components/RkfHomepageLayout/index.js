import React from 'react';
import FooterSmall from 'components/Layout/FooterSmall';
import Container from 'components/Layout/Container';
import HomepageLayout from 'components/Layout/Homepage';
// import HomepageFeaturedExhibitionsList from 'apps/Exhibitions/components/FeaturedHome';
import RkfFeaturedExhibitions from '../RkfFeaturedExhibitions';
import Partners from '../Partners';
import { SponsorsData, PartnersData } from '../Partners/data';
import { RKFInfo } from './config';
import './styles.scss';

const Wrap = ({ children }) => <div className="HomePage__wrap">{children}</div>;
const Content = ({ children }) => (
    <div className="HomePage__content">{children}</div>
);
const Side = ({ children }) => <div className="HomePage__side">{children}</div>;

function RkfHomepageLayout() {
    return (
        <HomepageLayout>
            <Container className="home">
                <div style={{ padding: `0px 48px` }}>
                    {/*<HomepageFeaturedExhibitionsList />*/}
                    <Wrap>
                        <Content>
                            <h2>Предстоящие выставки</h2>
                            <RkfFeaturedExhibitions />
                        </Content>
                        <Side>
                            <div className="NewsList__sidebar">
                                <h3>{RKFInfo.aboutTitle}</h3>
                                <p>{RKFInfo.about}</p>
                                <h3>Контакты</h3>
                                <div className="NewsList__contacts">
                                    {RKFInfo.contacts.map((item, index) => {
                                        return (
                                            item.link
                                                ? <span className={`NewsList__contacts--${item.class}`} key={index}>
                                                    {item.text}{' '}
                                                    <a className="link" href={item.link}>{item.linkTitle}</a>
                                                </span>
                                                : <span className={`NewsList__contacts--${item.class}`} key={index}>
                                                    {item.text}
                                                </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </Side>
                    </Wrap>
                    <Partners title="Наши спонсоры" items={SponsorsData} />
                    <Partners title="Наши партнеры" items={PartnersData} />
                </div>
            </Container>
            <FooterSmall />
        </HomepageLayout>
    );
}
export default React.memo(RkfHomepageLayout);
