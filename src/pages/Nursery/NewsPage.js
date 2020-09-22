import React, { useEffect, useState, useRef } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import AddArticle from "../../components/UserAddArticle";
import ClubUserNews from "../Club/components/ClubUserNews";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import ClubUserHeader from "../../components/redesign/UserHeader";
import UserGallery from "components/redesign/UserGallery";
import UserVideoGallery from "components/redesign/UserGallery/UserVideoGallery";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { VideoModal } from "components/Modal";
import StickyBox from "react-sticky-box";
import MenuComponent from "../../components/MenuComponent";
import useWindowSize from "../../utils/useWindowSize";
import "./index.scss";


const NewsPage = ({ history, match, profile_id, is_active_profile, isAuthenticated, user }) => {
    const [nursery, setNurseryInfo] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [needRequest, setNeedRequest] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const windowSize = useWindowSize();
    const galleryRef = useRef(null);
    const galleryHolderRef = useRef(null);
    const mobileGalleryHolderRef = useRef(null);

    const alias = match.params.route;

    useEffect(() => {
        (() => Request({
            url: endpointGetNurseryInfo + alias
        }, data => {
            if (data.user_type !== 4) {
                history.replace(`/kennel/${match.params.route}/news`);
            } else {
                setNurseryInfo(data);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [match]);

    useEffect(() => appendUserGallery(), [[], windowSize.width]);

    const appendUserGallery = () => {
        if (windowSize.width <= 990) {
            const el = mobileGalleryHolderRef.current;
            el && !el.childElementCount && el.appendChild(galleryRef.current)
        } else {
            const el = galleryHolderRef.current
            el && !el.childElementCount && el.appendChild(galleryRef.current)
        }
    };

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
            <Layout>
                <div className="redesign">
                    <Container className="content nursery-page">
                        <div className="nursery-page__content-wrap">
                            <div className="nursery-page__content">
                                <Card className="nursery-page__content-banner">
                                    <div style={nursery.headliner_link && { backgroundImage: `url(${nursery.headliner_link}` }} />
                                </Card>
                                <div className="nursery-page__mobile-only">
                                    <ClubUserHeader
                                        user="nursery"
                                        logo={nursery.logo_link}
                                        name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
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
                                </div>
                                <div ref={mobileGalleryHolderRef} />
                                {canEdit &&
                                    <AddArticle
                                        id={nursery.id}
                                        logo={nursery.logo_link}
                                        setNeedRequest={setNeedRequest}
                                    />
                                }
                                <ClubUserNews
                                    user="club"
                                    canEdit={canEdit}
                                    alias={match.params.route}
                                    needRequest={needRequest}
                                    setNeedRequest={setNeedRequest}
                                />
                            </div>
                            <Aside className="nursery-page__info">
                                <StickyBox offsetTop={65}>
                                    <div className="nursery-page__info-inner">
                                        <ClubUserHeader
                                            user="nursery"
                                            logo={nursery.logo_link}
                                            name={nursery.short_name || nursery.name || 'Название питомника отсутствует'}
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
                                        <div ref={galleryHolderRef}>
                                            <div ref={galleryRef}>
                                                <UserGallery alias={alias} isKennel={true} />
                                                <UserVideoGallery alias={alias} setShowModal={setShowModal} isKennel={true} /></div>

                                        </div>
                                        <div className="nursery-page__mobile-only">
                                            <MenuComponent 
                                                alias={alias}
                                                user={user}
                                                profileId={nursery.id}
                                                noCard={true}
                                            />
                                        </div>
                                        <div className="nursery-page__copy-wrap">
                                            <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                            <p>Политика обработки персональных данных</p>
                                        </div>
                                    </div>
                                </StickyBox>
                            </Aside>
                        </div>
                        {showModal &&
                            <VideoModal showModal={showModal} handleClose={() => setShowModal(false)} className="VideoGallery__modal">
                                <div dangerouslySetInnerHTML={{ __html: showModal.item.iframe }} />
                            </VideoModal>}
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(NewsPage));