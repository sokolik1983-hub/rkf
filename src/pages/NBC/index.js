import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import UserBanner from "../../components/Layouts/UserBanner";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserDescription from "../../components/Layouts/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import {BANNER_TYPES, DEFAULT_IMG} from "../../appConfig";
import UserLayout from 'components/Layouts/UserLayout';
import NBCLayout from "../../components/Layouts/NBCLayout";
import Loading from "../../components/Loading";
import {Redirect, useParams} from "react-router-dom";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import BreedsList from "../../components/BreedsList";
import Aside from "../../components/Layouts/Aside";
import StickyBox from "react-sticky-box";
import UserMenu from "../../components/Layouts/UserMenu";
import {kennelNav} from "../Nursery/config";
import Banner from "../../components/Banner";
import CopyrightInfo from "../../components/CopyrightInfo";
import useIsMobile from "../../utils/useIsMobile";
import UserHeader from "../../components/UserHeader";
import UserContacts from "../../components/redesign/UserContacts";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import {clubNav} from "../Club/config";
import {Request} from "../../utils/request";
import {endpointGetNBCInfo} from "../../components/Layouts/NBCLayout/config";

const NBCPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [nbcInfo, setNBCInfo] = useState(null);
    const [nbcProfileId, setNBCProfileId] = useState(null);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [needRequest, setNeedRequest] = useState(true);
    const isMobile = useIsMobile(1080);
    const [canEdit, setCanEdit] = useState(false);
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    const { alias } = useParams();

    const getNBCInfo = async () => {
        Request({
            url: endpointGetNBCInfo + '?alias=' + alias
        }, data => {
            setNBCInfo(data);
            setNBCProfileId(data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        });
    }

    useEffect(() => {
        (() => getNBCInfo())();
    }, []);

    const onSubscriptionUpdate = (subscribed) => {
        setNBCInfo({
            ...nbcInfo,
            subscribed: subscribed
        })
    }


    useEffect(() => {
        console.log('nbcInfo', nbcInfo);
        console.log('nbcProfileId', nbcProfileId);
    }, [nbcInfo, nbcProfileId]);

    return (
        loading ?
            <Loading />
            :
        <Layout setNotificationsLength={setNotificationsLength}>
            <div className="redesign">
                <Container className="content club-page">
                    <div className="club-page__content-wrap">
                        <div className="club-page__content">
                            <UserBanner
                                link={'https://s00.yaplakal.com/pics/pics_preview/7/6/8/16697867.jpg'} //сюда добавить, когда будет готово на беке   nbcInfo.headliner_link ||
                                canEdit={canEdit}
                                updateInfo={getNBCInfo}
                            />
                            {isMobile &&
                                <UserHeader
                                    user={alias !== 'rkf-online' ? 'club' : ''}
                                    logo={nbcInfo.logo_link}
                                    name={'Название клуба отсутствует'} //сюда добавить, когда будет готово на беке => nbcInfo.name ||
                                    alias={nbcInfo.alias}
                                    profileId={nbcProfileId}
                                    // federationName={nbcInfo.federation_name}
                                    // federationAlias={nbcInfo.federation_alias}
                                    // active_rkf_user={nbcInfo.active_rkf_user}
                                    // active_member={nbcInfo.active_member}
                                    canEdit={canEdit}
                                    subscribed={nbcInfo.subscribed}
                                    // member={nbcInfo.member}
                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                    isAuthenticated={isAuthenticated}
                                />
                            }
                            {/*<UserDescription description={nbcInfo.description} />*/}
                            <UserContacts {...nbcInfo} profileAlias={alias} />
                            <div className="club-page__exhibitions">
                                <ExhibitionsComponent alias={alias} />
                            </div>
                            {isMobile &&
                                <>
                                    <UserPhotoGallery
                                        alias={nbcInfo.alias}
                                        pageLink={`/nbc/${nbcInfo.alias}/gallery`}
                                        canEdit={canEdit}
                                    />
                                    <UserVideoGallery
                                        alias={nbcInfo.alias}
                                        pageLink={`/nbc/${nbcInfo.alias}/video`}
                                        canEdit={canEdit}
                                    />
                                </>
                            }
                            {canEdit &&
                                <AddArticle
                                    id={nbcProfileId}
                                    logo={nbcInfo.avatar}
                                    setNeedRequest={setNeedRequest}
                                    profileInfo={nbcInfo}
                                    setProfileInfo={setNBCInfo}
                                />
                            }
                            <UserNews
                                canEdit={canEdit}
                                alias={alias}
                                needRequest={needRequest}
                                setNeedRequest={setNeedRequest}
                                profileInfo={nbcInfo}
                                setProfileInfo={setNBCInfo}
                            />
                        </div>
                        <Aside className="club-page__info">
                            <StickyBox offsetTop={60}>
                                <div className="club-page__info-inner">
                                    {!isMobile && nbcInfo &&
                                        <UserHeader
                                            user='nbc'
                                            logo={nbcInfo.avatar || 'https://s00.yaplakal.com/pics/pics_preview/6/4/0/16698046.jpg'}
                                            name={nbcInfo.name || 'Название клуба отсутствует'}
                                            alias={nbcInfo.alias}
                                            profileId={nbcProfileId}
                                            // federationName={clubInfo.federation_name}
                                            // federationAlias={clubInfo.federation_alias}
                                            // active_rkf_user={clubInfo.active_rkf_user}
                                            // active_member={clubInfo.active_member}
                                            canEdit={canEdit}
                                            subscribed={nbcInfo.subscribed}
                                            // member={clubInfo.member}
                                            onSubscriptionUpdate={onSubscriptionUpdate}
                                            isAuthenticated={isAuthenticated}
                                        />
                                    }
                                    {/*{!isMobile && <UserMenu userNav={canEdit*/}
                                    {/*    ? clubNav(clubInfo.club_alias) // Show NewsFeed menu item to current user only*/}
                                    {/*    : clubNav(clubInfo.club_alias).filter(i => i.id !== 2)}*/}
                                    {/*                        notificationsLength={notificationsLength}*/}
                                    {/*/>}*/}
                                    {!isMobile && nbcInfo &&
                                        <>
                                            <Banner type={BANNER_TYPES.clubPageUnderPhotos} />
                                            <UserPhotoGallery
                                                alias={nbcInfo.alias}
                                                pageLink={`/${nbcInfo.alias}/gallery`}
                                                canEdit={canEdit}
                                            />
                                            <UserVideoGallery
                                                alias={nbcInfo.alias}
                                                pageLink={`/${nbcInfo.alias}/video`}
                                                canEdit={canEdit}
                                            />
                                            <CopyrightInfo withSocials={true} />
                                        </>
                                    }
                                </div>
                            </StickyBox>
                        </Aside>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default React.memo(NBCPage);