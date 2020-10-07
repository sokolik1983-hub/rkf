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


const defaultUserInfo = {
    "profile_id": 8158,
    "alias": "277b0dc9ff7a4fc2bcb14794267e50cb",
    "personal_information": {
        "first_name": "Василий",
        "last_name": "Пупкин",
        "second_name": "Иванович",
        "sex_type": null,
        "birth_date": "01.01.1970 г.",
        "description": "Банальные, но неопровержимые выводы, а также действия представителей оппозиции, вне зависимости от их уровня, должны быть представлены в исключительно положительном свете. Равным образом, повышение уровня гражданского сознания обеспечивает широкому кругу (специалистов) участие в формировании вывода текущих активов. В рамках спецификации современных стандартов, сторонники тоталитаризма в науке описаны максимально подробно."
    },
    "address": {
        "city_id": 1121,
        "city_name": "Москва"
    },
    "logo_link": "/media/YjYwMjQ4ZWMtYWRkOS00MjdjLTk2NmUtNmJhZTk1YmIyMjk1X0F2YXRhcg.gif",
    "headliner_link": "/media/NDNiOGU5NTItMWUyOS00Y2IwLWJhNWItZTdmOWZhMzUzMmExX0NsdWJIZWFkZXI.jpg",
    "emails": [
        {
            "id": 0,
            "value": "jomax78791@wpsavy.com"
        }
    ],
    "phones": [{
        "id": 0,
        "value": "+7 (999) 999-99-99"
    }],
    "web_site": "https://site.com",
    "social_networks": [
        {
            "id": 45,
            "site": "http://elitepet.ru/pages/Zoogostinica.html",
            "description": "rthcvgv xbxv d bbd",
            "social_network_type_id": 1
        },
        {
            "id": 47,
            "site": "http://vk.com",
            "description": "vk.com",
            "social_network_type_id": 1
        },
        {
            "id": 49,
            "site": "fdsf",
            "description": "fdsfds",
            "social_network_type_id": 1
        },
        {
            "id": 50,
            "site": "https://rkf.online/",
            "description": "test",
            "social_network_type_id": 1
        },
        {
            "id": 51,
            "site": "https://rkf.online/",
            "description": "test2",
            "social_network_type_id": 1
        },
        {
            "id": 59,
            "site": "http://dev.uep24.ru/",
            "description": "ereryyr",
            "social_network_type_id": 1
        }
    ],
    "documents": []
};


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
            data = defaultUserInfo;

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
                                        second_name={userInfo.personal_information ? userInfo.personal_information.second_name : ''}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    />
                                    <UserMenu userNav={userNav(alias)}/>
                                </Card>
                                {!isMobile &&
                                    <>
                                        <UserPhotoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/gallery`}
                                        />
                                        <UserVideoGallery
                                            alias={alias}
                                            pageLink={`/user/${alias}/video`}
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
                                    />
                                    <UserVideoGallery
                                        alias={alias}
                                        pageLink={`/user/${alias}/video`}
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