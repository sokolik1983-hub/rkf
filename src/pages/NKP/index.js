import React, {memo, useCallback, useEffect, useState} from "react";
import {Route, Switch, useParams} from "react-router-dom";
import StickyBox from "react-sticky-box";
import Loading from "../../components/Loading";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import UserHeader from "../../components/redesign/UserHeader";
import UserBanner from "../../components/Layouts/UserBanner";
import PhotoComponent from "../../components/PhotoComponent";
import MenuComponentNew from "../../components/MenuComponentNew";
import Banner from "../../components/Banner";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import NKPMain from "./pages/Main";
import NKPEdit from "./pages/Edit";
import VideoGalleryPage from "./pages/VideoGallery";
import {BANNER_TYPES} from "../../appConfig";
import {Request} from "../../utils/request";
import useIsMobile from "../../utils/useIsMobile";
import {connectAuthUserInfo} from "../Login/connectors";
import "./index.scss";
import ImageGalleryPage from "./pages/ImageGallery";


const NKP = ({history, user_info, updateUserInfo}) => {
    const [loading, setLoading] = useState(true);
    const [NBCInfo, setNBCInfo] = useState(null);
    const {alias: pageAlias} = useParams();
    const {alias: userAlias} = user_info || {};
    const isMyPage = pageAlias === userAlias;
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        getNBCInfo();
    }, [pageAlias]);

    const getNBCInfo = useCallback(async () => {
        setLoading(true);

        await Request({
            url: `/api/nationalbreedclub/full?alias=${pageAlias}`
        }, data => {
            if(data) {
                setNBCInfo(data);
                //добавить проверку на тип пользователя (если алиас вдруг от клуба или питомника), редиректить если это так
                //записать в Редакс (чтобы потом использовать эту инфу в меню)

                //обновление картинок в Редаксе и localstorage
                //добавить ещё alias
                if(isMyPage) {
                    const {logo_link, headliner_link} = user_info;

                    if(data.logo_link !== logo_link) {
                        updateUserInfo({...user_info, logo_link: data.logo_link});
                    }

                    if(data.headliner_link !== headliner_link) {
                        updateUserInfo({...user_info, headliner_link: data.headliner_link});
                    }
                }
            }
        }, error => {
            console.log(error.response);
        });

        setLoading(false);
    },[pageAlias]);

    const updateSubscription = useCallback(isSubscribed => {//здесь нельзя обновлять стэйт!
        setNBCInfo(prev => ({
            ...prev,
            subscribed: isSubscribed
        }));
        //записать в Редакс
    }, []);

    return loading ?
        <Loading/> :
        <Container className="content nbc-page">
            {NBCInfo &&
                <div className="nbc-page__content-wrap">
                    {!isMobile &&
                        <Aside className="nbc-page__info">
                            <StickyBox offsetTop={60}>
                                <div className="nbc-page__info-inner">
                                    <UserHeader
                                        user="nbc"
                                        logo={NBCInfo.logo_link}
                                        name={NBCInfo.name || 'Название НКП отсутствует'}
                                        alias={NBCInfo.alias}
                                        profileId={NBCInfo.profile_id}
                                        canEdit={isMyPage}
                                        subscribed={NBCInfo.subscribed}
                                        onSubscriptionUpdate={updateSubscription}
                                    />
                                    <PhotoComponent
                                        photo={NBCInfo.owner_photo}
                                        name={NBCInfo.owner_name}
                                        position={NBCInfo.owner_position}
                                        canEdit={isMyPage}
                                    />
                                    <MenuComponentNew />
                                    <Banner type={BANNER_TYPES.clubPageUnderPhotos} />
                                    <UserPhotoGallery
                                        alias={NBCInfo.alias}
                                        pageLink={`/nbc/${NBCInfo.alias}/gallery`}
                                        canEdit={isMyPage}
                                    />
                                    <UserVideoGallery
                                        alias={NBCInfo.alias}
                                        pageLink={`/nbc/${NBCInfo.alias}/video`}
                                        canEdit={isMyPage}
                                    />
                                    <CopyrightInfo withSocials={true} />
                                </div>
                            </StickyBox>
                        </Aside>
                    }
                    <div className="nbc-page__content">
                        {!history.location.pathname.split('/').includes('edit') &&
                            <UserBanner
                                link={NBCInfo?.headliner_link}
                                canEdit={isMyPage}
                            />
                        }
                        {isMobile &&
                            <UserHeader
                                user="nbc"
                                logo={NBCInfo.logo_link}
                                name={NBCInfo.name || 'Название НКП отсутствует'}
                                alias={NBCInfo.alias}
                                profileId={NBCInfo.profile_id}
                                canEdit={isMyPage}
                                subscribed={NBCInfo.subscribed}
                                onSubscriptionUpdate={updateSubscription}
                            />
                        }
                        <Switch>
                            {isMyPage &&
                                <Route
                                    exact={true}
                                    path="/nbc/:alias/gallery/:album?/edit"
                                    component={() =>
                                        <ImageGalleryPage
                                            canEdit={true}
                                            isEditPage={true}
                                        />
                                    }
                                />
                            }
                            <Route
                                exact={true}
                                path="/nbc/:alias/gallery/:album?"
                                component={() =>
                                    <ImageGalleryPage
                                        canEdit={isMyPage}
                                        isEditPage={false}
                                    />
                                }
                            />
                            <Route
                                exact={true}
                                path="/nbc/:alias/video"
                                component={() =>
                                    <VideoGalleryPage
                                        canEdit={isMyPage}
                                    />
                                }
                            />
                            {isMyPage &&
                                <Route
                                    exact={true}
                                    path="/nbc/:alias/edit"
                                    component={() =>
                                        <NKPEdit isMobile={isMobile}/>
                                    }
                                />
                            }
                            <Route
                                component={() =>
                                    <NKPMain
                                        NBCInfo={NBCInfo}
                                        canEdit={isMyPage}
                                        isMobile={isMobile}
                                    />
                                }
                            />
                        </Switch>
                    </div>
                </div>
            }
        </Container>
};

export default memo(connectAuthUserInfo(NKP));