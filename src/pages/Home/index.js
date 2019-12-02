import React, {useEffect, useState} from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import NewsList from "../../components/News";
import {Request} from "../../utils/request";
import {endpointGetNews, RKFInfo, partnersImg} from "./config";
import './index.scss';


const HomePage = () => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] =  useState(true);
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
                    <Loading/> :
                    <>
                        <Aside className="home-page__left">
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
                        </Aside>
                        <NewsList
                            news={news}
                            pagesCount={pagesCount}
                            currentPage={page}
                            setPage={setPage}
                        />
                        <Aside className="home-page__right">
                            <h3>Наши партнёры</h3>
                            <ul className="home-page__partners">
                                {partnersImg.map((link, i) => (
                                    <li className="home-page__partners-item" key={i}>
                                        <img src={link} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </Aside>
                    </>
                }
            </Container>
        </Layout>
    )
};

export default HomePage;