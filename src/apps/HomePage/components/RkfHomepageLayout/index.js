import React from 'react';
import { Link } from 'react-router-dom'
import FooterSmall from 'components/Layout/FooterSmall';
import Container from 'components/Layout/Container';
import HomepageLayout from 'components/Layout/Homepage';
import HomepageFeaturedExhibitionsList from 'apps/Exhibitions/components/FeaturedHome';
import RkfFeaturedExhibitions from '../RkfFeaturedExhibitions';
import Partners from '../Partners';
import { SponsorsData, PartnersData } from '../Partners/data';
import './styles.scss';

const Wrap = ({ children }) => <div className="HomePage__wrap">{children}</div>;
const Content = ({ children }) => (
    <div className="HomePage__content">{children}</div>
);
const Side = ({ children }) => <div className="HomePage__side">{children}</div>;

const Contacts = [
    {
        class: 'pin',
        text: 'Адрес: Москва, Гостиничная, 9'
    },
    {
        class: 'phone',
        text: 'Телефон: +7 (499) 753-22-33'
    },
    {
        class: 'email',
        text: 'E-mail: ',
        link: 'mailto:rkf@rkf.org.ru',
        linkTitle: 'rkf@rkf.org.ru'
    },
    {
        class: 'web',
        text: 'Сайт: ',
        link: 'https://rkf.com.ru',
        linkTitle: 'rkf.com.ru'
    }
];

function RkfHomepageLayout() {
    return (
        <HomepageLayout>
            <Container className="home">
                <div style={{ padding: `0px 48px` }}>
                    <HomepageFeaturedExhibitionsList />
                    <Wrap>
                        <Content>
                            <h2>Предстоящие выставки</h2>
                            <RkfFeaturedExhibitions />
                            <Link className="NewsList__button" to="/exhibitions">
                                Смотреть все выставки
                            </Link>
                        </Content>
                        <Side>
                            <div className="NewsList__sidebar">
                                <h3>Об РКФ</h3>
                                <p>
                                    Российская кинологическая федерация (РКФ)
                                    является некоммерческим, добровольным,
                                    самоуправляемым, основанным на членстве
                                    союзом общественных объединений, созданным
                                    по инициативе общественных объединений,
                                    объединившихся на основе общности их
                                    интересов для достижения целей, определенных
                                    Уставом РКФ.
                                </p>
                                <h3>Контакты</h3>
                                <div className="NewsList__contacts">
                                    {Contacts.map((item, index) => {
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
