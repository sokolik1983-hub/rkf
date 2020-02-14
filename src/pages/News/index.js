import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import Edit from "./components/Edit";
import { DEFAULT_IMG } from "../../appConfig";
import { formatDateTime } from "../../utils/datetime";
import { formatText } from "../../utils";
import { Request } from "../../utils/request";
import { endpointGetNews } from "./config";
import { connectAuthVisible } from "../../apps/Auth/connectors";
import "./index.scss";


const NewsPage = ({ match, history, isAuthenticated, profile_id }) => {
    const [news, setNews] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const id = match.params.id;
    const canEdit = isAuthenticated && news && profile_id === news.profile_id;

    useEffect(() => {
        if (needRequest) {
            (() => Request({ url: `${endpointGetNews}/${id}` },
                data => {
                    setNews(data);
                    setNeedRequest(false);
                    setLoading(false);
                }, error => {
                    console.log(error.response);
                    setIsError(true);
                    setNeedRequest(false);
                    setLoading(false);
                }))();
        }
    }, [id, needRequest]);

    return loading ?
        <Loading /> :
        isError ?
            <Redirect to="/not-found" /> :
            <Layout>
                <Container className="content news-page">
                    <Card className="news">
                        <div className="news__wrap-head">
                            <Link to={`/${news.alias}`} className="news__item-head">
                                <div className="news__avatar" style={{ backgroundImage: `url(${news.logo_link ? news.logo_link : DEFAULT_IMG.clubAvatar})` }} />
                                <div className="news__about">
                                    <h5 className="news__name">{news.club_name}</h5>
                                    <p className="news__date">{formatDateTime(news.create_date)}</p>
                                </div>
                            </Link>
                            <div className="news__buttons">
                                {!isEdit && <button className="back-button" onClick={() => history.goBack()}>Назад</button>}
                                {canEdit && !isEdit &&
                                    <button className="edit-button" onClick={() => setIsEdit(true)}>Редактировать</button>
                                }
                            </div>
                        </div>
                        <div className="news__item-body">
                            {isEdit && canEdit ?
                                <Edit id={news.id}
                                    text={news.content}
                                    img={news.picture_link || ''}
                                    setIsEdit={setIsEdit}
                                    setNeedRequest={setNeedRequest}
                                /> :
                                <>
                                    <p className="news__text" dangerouslySetInnerHTML={{ __html: formatText(news.content) }} />
                                    {news.picture_link && <img src={news.picture_link} alt="" className="news__img" />}
                                </>
                            }
                        </div>
                        <div className="news__buttons">
                            {!isEdit && <button className="back-button" onClick={() => history.goBack()}>Назад</button>}
                            {canEdit && !isEdit &&
                                <button className="edit-button" onClick={() => setIsEdit(true)}>Редактировать</button>
                            }
                        </div>
                    </Card>
                </Container>
            </Layout>
};

export default connectAuthVisible(React.memo(NewsPage));