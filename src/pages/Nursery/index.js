import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import UserHeader from "../../components/UserHeader";
import UserDescription from "../../components/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/UserNews";
import UserMenu from "./components/UserMenu";
import { Gallery } from "components/Gallery";
import Card from "components/Card";
import NurseryInfo from "./components/NurseryInfo";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { DEFAULT_IMG } from "appConfig";
import "./index.scss";

const NurseryPage = ({ match, profile_id, is_active_profile, isAuthenticated }) => {
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
            setNursery(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            setLoading(false);
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
            url: `/api/photogallery/gallery?alias=${alias}&elem_count=10`,
            method: 'GET'
        }, data => {
            setImages(data.photos.map(p => {
                return {
                    id: p.id,
                    src: p.link,
                    thumbnail: p.small_photo.link,
                    thumbnailWidth: p.small_photo.width,
                    thumbnailHeight: p.small_photo.height,
                    caption: p.caption
                }
            }));
        },
            error => {
                //handleError(error);
            });
    }

    return loading ?
        <Loading /> :
        error ?
            error.status === 422 ? <Redirect to="/nursery/activation" /> : <Redirect to="404" /> :
            <Layout>
                <Container className="content nursery-page">
                    <UserHeader
                        user="nursery"
                        logo={nursery.logo_link}
                        banner={nursery.headliner_link}
                        name={nursery.name || 'Имя отсутствует'}
                        federationName={nursery.federation_name}
                        federationAlias={nursery.federation_alias}
                        canEdit={canEdit}
                        editLink={`/nursery/${alias}/edit`}
                    />
                    <Card className="nursery-page__gallery-wrap">
                        <h4 className="nursery-page__gallery-title">
                            <Link className="nursery-page__gallery-edit" to={`/nursery/${alias}/gallery`}>Фотогалерея</Link>
                        </h4>
                        {
                            images
                                ? <Gallery
                                    items={images}
                                    backdropClosesModal={true}
                                    enableImageSelection={false}
                                    maxRows={1}
                                    withLoading={false}
                                />
                                : <img className="nursery-page__gallery-placeholder" alt="" src={DEFAULT_IMG.clubAvatar} />
                        }
                    </Card>
                    <div className="nursery-page__content-wrap">
                        <div className="nursery-page__content">
                            <UserDescription description={nursery.description} />
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
                            <UserMenu
                                alias={alias}
                                name={nursery.name || 'Имя отсутствует'}
                            />
                            <NurseryInfo
                                {...nursery}
                            />
                        </Aside>
                    </div>
                </Container>
            </Layout>
};

export default React.memo(connectAuthVisible(NurseryPage));