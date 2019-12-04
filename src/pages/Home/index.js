import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import NewsList from "../../components/News";
import { Request } from "../../utils/request";
import Card from "components/Card";
import { endpointGetNews, RKFInfo, partners, exhibitions } from "./config";
import './index.scss';


const HomePage = () => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    const getNews = async (page) => {
        setLoading(true);
        await Request({
            url: `${endpointGetNews}?page=${page}`
        }, data => {
            setNews(data.articles);
            setPagesCount(Math.ceil(data.articles_count / 10));
            setLoading(false);
        }, error => {
            setLoading(false);
            console.log(error.response);
            alert(`Ошибка: ${error.response.status}`);
        });
    };

    useEffect(() => {
        (() => getNews(page))();
    }, [page]);

    return (
        <Layout>
            <Container className="content home-page">
                {loading ?
                    <Loading /> :
                    <>
                        <Aside className="home-page__left">
                            <Card>
                                <h3>{RKFInfo.aboutTitle}</h3>
                                <p>{RKFInfo.about}</p>
                                <div className="home-page__contacts">
                                    <h3>Контакты</h3>
                                    {RKFInfo.contacts.map((item, index) => (
                                        item.link ?
                                            <p className={`home-page__contacts-${item.class}`} key={index}>
                                                {item.text}&nbsp;
                                            <a className="link" href={item.link}>{item.linkTitle}</a>
                                            </p> :
                                            <p className={`home-page__contacts-${item.class}`} key={index}>
                                                {item.text}
                                            </p>
                                    ))}
                                </div>
                            </Card>
                        </Aside>
                        <NewsList
                            news={news}
                            pagesCount={pagesCount}
                            currentPage={page}
                            setPage={setPage}
                        />
                        <Aside className="home-page__right">
                            <Card style={{ marginBottom: '24px' }}>
                                <h3>{exhibitions.title}</h3>
                                <ul style={{ listStyle: 'none' }}>
                                    {exhibitions.items.map(({ name, url }) => <li>
                                        <a href={url} title={name} target="_blank" rel="noopener noreferrer">{name}</a>
                                    </li>)}
                                </ul>
                            </Card>
                            <Card>
                                <h3>Наши партнёры</h3>
                                <ul className="home-page__partners">
                                    {partners.map(({ url, title, img }, i) => (
                                        <li className="home-page__partners-item" key={i}>
                                            <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
                                                <img src={img} alt="" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Aside>
                    </>
                }
            </Container>
        </Layout>
    )
};

export default HomePage;