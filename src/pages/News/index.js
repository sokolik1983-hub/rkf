import React, {useEffect, useState} from "react";
import {Redirect, Link} from 'react-router-dom';
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import {DEFAULT_IMG} from "../../appConfig";
import {formatDateTime} from "../../utils/datetime";
import {formatText} from "../../utils";
import {Request} from "../../utils/request";
import {endpointGetNews} from "./config";
import './index.scss';


const NewsPage = ({match}) => {
    const [news, setNews] = useState(null);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const id = match.params.id;

    useEffect(() => {
        (() => Request({url: `${endpointGetNews}/${id}`},
        data => {
            setNews(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setIsError(true);
            setLoading(false);
        }))();
    }, [id]);

    return loading ?
        <Loading/> :
        isError ?
            <Redirect to="/not-found" /> :
            <Layout>
                <Container className="content news-page">
                    <Card className="news">
                        <div className="news__wrap-head">
                            <Link to={`/${news.alias}`} className="news__item-head">
                                <div className="news__avatar" style={{backgroundImage: `url(${news.logo_link ? news.logo_link : DEFAULT_IMG.clubAvatar})`}} />
                                <div className="news__about">
                                    <h5 className="news__name">{news.club_name}</h5>
                                    <p className="news__date">{formatDateTime(news.create_date)}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="news__item-body">
                            <p className="news__text" dangerouslySetInnerHTML={{ __html: formatText(news.content) }} />
                            {news.picture_link && <img src={news.picture_link} alt="" className="news__img" />}
                        </div>
                    </Card>
                </Container>
            </Layout>
};

export default React.memo(NewsPage);