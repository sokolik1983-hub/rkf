import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "pages/Club/components/ClubUserNews";
import { Gallery } from "components/Gallery";
import Card from "components/Card";
import UserHeader from "components/redesign/UserHeader";
import UserDescription from "components/redesign/UserDescription";
import UserContacts from "components/redesign/UserContacts";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";

const NurseryPage = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [nursery, setNursery] = useState(null);
    const [images, setImages] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const alias = match.params.id;

    useEffect(() => {
        (() => Request({
            url: endpointGetNurseryInfo + alias
        }, data => {
            if (data.user_type !== 4) {
                history.replace(`/${alias}`);
            } else {
                setNursery(data);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
        return () => setNeedRequest(true);
    }, [alias]);

    useEffect(() => {
        getImages()
    }, []);

    const getImages = () => {
        Request({
            url: `/api/photogallery/gallery?alias=${alias}&elem_count=12`,
            method: 'GET'
        }, data => {
            setImages(data.photos.map(p => {
                return {
                    id: p.id,
                    src: p.link,
                    thumbnail: p.small_photo.link,
                    thumbnailWidth: 88,
                    thumbnailHeight: p.small_photo.height,
                    caption: p.caption
                }
            }));
        },
            error => {
                //handleError(error);
            });
    }

    const squareStyle = () => {
        return {
            height: '88px',
            width: '88px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    }

    return loading ?
        <Loading /> :
        error ?
            error.status === 422 ? <Redirect to="/kennel/activation" /> : <Redirect to="404" /> :
            <Layout>
                <div className="redesign">
                    <Container className="content nursery-page">

                        <div className="nursery-page__content-wrap">
                            <div className="nursery-page__content">
                                <Card className="nursery-page__content-banner">
                                    <div style={nursery.headliner_link && { backgroundImage: `url(${nursery.headliner_link}` }} />
                                </Card>
                                <UserDescription description={nursery.description} />
                                <UserContacts {...nursery} />
                                {canEdit &&
                                    <AddArticle
                                        id={nursery.id}
                                        logo={nursery.logo_link}
                                        setPage={setPage}
                                        setNeedRequest={setNeedRequest}
                                    />
                                }
                                <UserNews
                                    user="nursery"
                                    canEdit={canEdit}
                                    alias={alias}
                                    page={page}
                                    setPage={setPage}
                                    needRequest={needRequest}
                                    setNeedRequest={setNeedRequest}
                                />
                            </div>
                            <Aside className="nursery-page__info">
                                <div className="nursery-page__info-inner">
                                    <UserHeader
                                        user="nursery"
                                        logo={nursery.logo_link}
                                        name={nursery.name || 'Имя отсутствует'}
                                        alias={alias}
                                        profileId={nursery.id}
                                        federationName={nursery.federation_name}
                                        federationAlias={nursery.federation_alias}
                                    />
                                    {nursery.breeds && !!nursery.breeds.length &&
                                        <Card className="nursery-page__breeds">
                                            <h4>Породы</h4>
                                            <ul className="nursery-page__breeds-list">
                                                {nursery.breeds.map(item =>
                                                    <li className="nursery-page__breeds-item" key={item.id}>{item.name}</li>
                                                )}
                                            </ul>
                                        </Card>
                                    }
                                    <Card className="nursery-page__gallery-wrap">
                                        <div className="nursery-page__gallery-header">
                                            <h4 className="nursery-page__gallery-title">Фотогалерея</h4>
                                            <Link to={`/kennel/${alias}/gallery`}>Смотреть все</Link>
                                        </div>
                                        <Gallery
                                            items={images}
                                            backdropClosesModal={true}
                                            enableImageSelection={false}
                                            withLoading={false}
                                            rowHeight={88}
                                            thumbnailStyle={squareStyle}
                                        />
                                    </Card>
                                </div>
                            </Aside>
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(NurseryPage));