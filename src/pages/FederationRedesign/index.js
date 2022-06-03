import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import NotConfirmed from '../NotConfirmed';
import Layout from '../../components/Layouts';
import Container from '../../components/Layouts/Container';
import Aside from '../../components/Layouts/Aside';
import Loading from '../../components/Loading';
import CopyrightInfo from '../../components/CopyrightInfo';
import UserPhotoGallery from '../../components/Layouts/UserGallerys/UserPhotoGallery';
import UserVideoGallery from '../../components/Layouts/UserGallerys/UserVideoGallery';
import UserHeader from '../../components/redesign/UserHeader';
import ExhibitionsComponent from '../../components/ExhibitionsComponent';
import UserContacts from '../../components/redesign/UserContacts';
import UserDescription from '../../components/redesign/UserDescription';
import AddArticle from '../../components/UserAddArticle';
import UserNews from '../../components/Layouts/UserNews';
import { Request } from '../../utils/request';
import PhotoComponent from '../../components/PhotoComponent';
import { connectAuthVisible } from '../Login/connectors';
import useIsMobile from '../../utils/useIsMobile';
import UserBanner from '../../components/Layouts/UserBanner';
import MenuComponentNew from "../../components/MenuComponentNew";

import './index.scss';

const FederationPage = ({ profile_id, is_active_profile, isAuthenticated, match }) => {
    const [fedInfo, setFedInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile(1080);
    const alias = match.path.replace('/', '');

    const getFedInfo = () => {
        Request({
            url: `/api/Club/federation_base_info?alias=${alias}`
        }, data => {
            setFedInfo(data);
            setNotActiveProfile(isAuthenticated && !is_active_profile);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        });
    }

    const onSubscriptionUpdate = (subscribed) => {
        setFedInfo({
            ...fedInfo,
            subscribed: subscribed
        })
    }

    useEffect(() => {
        getFedInfo();
    }, []);

    return loading ?
        <Loading /> :
        error ?
            <Redirect to="404" /> :
            notActiveProfile ?
                <NotConfirmed /> :
                <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <UserBanner
                                        link={fedInfo.header_picture_link}
                                        canEdit={canEdit}
                                        updateInfo={getFedInfo}
                                    />
                                    {isMobile && <>
                                        <UserHeader
                                            user={alias !== 'rkf-online' ? 'club' : ''}
                                            logo={fedInfo.logo}
                                            name={fedInfo.short_name || fedInfo.name || 'Название федерации отсутствует'}
                                            alias={alias}
                                            profileId={fedInfo.id}
                                            subscribed={fedInfo.subscribed}
                                            member={fedInfo.member}
                                            onSubscriptionUpdate={onSubscriptionUpdate}
                                            isAuthenticated={isAuthenticated}
                                            canEdit={canEdit}
                                        />
                                        <PhotoComponent
                                            photo={fedInfo.owner_photo}
                                            name={fedInfo.owner_name}
                                            position={fedInfo.owner_position}
                                        />
                                    </>
                                    }
                                    <UserDescription description={fedInfo.description} />
                                    <UserContacts {...fedInfo} profileAlias={alias} />
                                    <div className="club-page__exhibitions">
                                        <ExhibitionsComponent alias={alias} />
                                    </div>
                                    {isMobile &&
                                        <>
                                            <UserPhotoGallery
                                                alias={alias}
                                                pageLink={`/${alias}/gallery`}
                                                canEdit={canEdit}
                                            />
                                            <UserVideoGallery
                                                alias={alias}
                                                pageLink={`/${alias}/video`}
                                                canEdit={canEdit}
                                            />
                                        </>
                                    }
                                    {canEdit &&
                                        <AddArticle
                                            id={fedInfo.id}
                                            logo={fedInfo.logo}
                                            setNeedRequest={setNeedRequest}
                                            profileInfo={fedInfo}
                                            setProfileInfo={setFedInfo}
                                        />
                                    }
                                    <UserNews
                                        canEdit={canEdit}
                                        alias={alias}
                                        needRequest={needRequest}
                                        setNeedRequest={setNeedRequest}
                                        profileInfo={fedInfo}
                                        setProfileInfo={setFedInfo}
                                        isFederation={true}
                                    />
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={60}>
                                        <div className="club-page__info-inner">
                                            {!isMobile && <>
                                                <UserHeader
                                                    user={alias !== 'rkf-online' ? 'club' : ''}
                                                    logo={fedInfo.logo}
                                                    name={fedInfo.short_name || fedInfo.name || 'Название клуба отсутствует'}
                                                    alias={alias}
                                                    profileId={fedInfo.id}
                                                    canEdit={canEdit}
                                                    subscribed={fedInfo.subscribed}
                                                    member={fedInfo.member}
                                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                                    isAuthenticated={isAuthenticated}
                                                />
                                                <PhotoComponent
                                                    photo={fedInfo.owner_photo}
                                                    name={fedInfo.owner_name}
                                                    position={fedInfo.owner_position}
                                                />
                                            </>
                                            }
                                            {!isMobile && <MenuComponentNew />}
                                            {!isMobile &&
                                                <>
                                                    <UserPhotoGallery
                                                        alias={alias}
                                                        pageLink={`/${alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <UserVideoGallery
                                                        alias={alias}
                                                        pageLink={`/${alias}/video`}
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
};

export default React.memo(connectAuthVisible(FederationPage));