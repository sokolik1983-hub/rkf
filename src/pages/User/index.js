import React, {useEffect, useState} from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import {Redirect} from "react-router-dom";
import Container from "../../components/Layouts/Container";
import UserBanner from "../../components/Layouts/UserBanner";
import UserInfo from "../../components/Layouts/UserInfo";
import UserMenu from "../../components/Layouts/UserMenu";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserDescription from "../../components/Layouts/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import Card from "../../components/Card";
import CopyrightInfo from "../../components/CopyrightInfo";
import {Request} from "../../utils/request";
import {connectAuthVisible} from "../Login/connectors";
import {endpointGetUserInfo, userNav} from "./config";
import {DEFAULT_IMG} from "../../appConfig";
import useIsMobile from "../../utils/useIsMobile";
import "./index.scss";


const UserPage = ({match, profile_id, is_active_profile, isAuthenticated}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const alias = match.params.id;
    const isMobile = useIsMobile();

    useEffect(() => {
        (() => Request({
            url: endpointGetUserInfo + alias
        }, data => {
            data.email = data.emails.length ? data.emails[0].value : '';
            data.phone = data.phones.length ? data.phones[0].value : '';

            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [alias]);

    return loading ?
        <Loading/> :
        error ?
            <Redirect to="/404" /> :
            <Layout>
                <div className="user-page">
                    <Container className="user-page__content content">
                        <aside className="user-page__left">
                            <StickyBox offsetTop={66}>
                                {isMobile &&
                                    <UserBanner link={userInfo.headliner_link}/>
                                }
                                <Card>
                                    <UserInfo
                                        logo_link={userInfo.logo_link}
                                        share_link={`https://rkf.online/user/${alias}`}
                                        first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    />
                                    <UserMenu userNav={userNav(alias)}/>
                                </Card>
                                {!isMobile &&
                                    <>
                                        <UserPhotoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/gallery`}
                                            canEdit={canEdit}
                                        />
                                        <UserVideoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/video`}
                                            canEdit={canEdit}
                                        />
                                        <CopyrightInfo/>
                                    </>
                                }
                            </StickyBox>
                        </aside>
                        <div className="user-page__right">
                            {!isMobile &&
                                <UserBanner link={userInfo.headliner_link}/>
                            }
                            <UserDescription
                                city_name={userInfo.address.city_name}
                                birthday_date={userInfo.personal_information.birth_date}
                                email={userInfo.email}
                                phone={userInfo.phone}
                                site={userInfo.web_site}
                                socials={userInfo.social_networks}
                                description={userInfo.personal_information.description}
                            />
                            {isMobile &&
                                <>
                                    <UserPhotoGallery
                                        alias={alias}
                                        pageLink={`/user/${alias}/gallery`}
                                        canEdit={canEdit}
                                    />
                                    <UserVideoGallery
                                        alias={alias}
                                        pageLink={`/user/${alias}/video`}
                                        canEdit={canEdit}
                                    />
                                </>
                            }
                            {canEdit &&
                                <AddArticle
                                    id={userInfo.profile_id}
                                    logo={userInfo.logo_link || DEFAULT_IMG.userAvatar}
                                    setNeedRequest={setNeedRequest}
                                />
                            }
                            <UserNews
                                canEdit={canEdit}
                                alias={alias}
                                needRequest={needRequest}
                                setNeedRequest={setNeedRequest}
                            />
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(UserPage));