import React, {useState} from "react";
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
import {Redirect} from "react-router-dom";
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

const Content = () => {
    const [nursery, setNursery] = useState({
        "id": 3433,
        "club_alias": "8a07aafe5d9541f0a2f9478e5ae5a795",
        "owner_name": "test test test",
        "owner_position": "Контактное лицо",
        "headliner_link": "/media/YzBmODk0ZTYtYzljOC00MzE2LTk0NjQtNDQwZTdjZjc0OWRiX0NsdWJIZWFkZXI.JPG",
        "logo_link": "/media/YzBmODk0ZTYtYzljOC00MzE2LTk0NjQtNDQwZTdjZjc0OWRiX0NsdWJIZWFkZXI.JPG",
        "shortcut_route_name": "8a07aafe5d9541f0a2f9478e5ae5a795",
        "name": "Питомник Ильича11111111111",
        "short_name": "Питомник Ильича",
        "site": "",
        "description": "Наш питомник отличается культурой питания! Собачки нашего клуба - самые воспитанные, они не едят с пола и тем более из мусорного ведра!   ",
        "address": null,
        "city": null,
        "legal_address": "323223, Красноярский край, Посёлок Абан, бульвар 23, корпус 32, комната 32",
        "legal_city": {
            "id": 3,
            "name": "Абан",
            "name_eng": null
        },
        "inn": "",
        "kpp": "",
        "ogrn": "",
        "bank_name": null,
        "rs_number": null,
        "bic": null,
        "bank_comment": null,
        "work_time_from": null,
        "work_time_to": null,
        "work_time": [
            {
                "id": 62,
                "week_day_id": 1,
                "time_from": "05:00:00",
                "time_to": "18:00:00"
            }
        ],
        "contacts": [
            {
                "id": 22056,
                "value": "+7(999)999-99-99",
                "description": "Из заявки на регистрацию питомника.",
                "is_main": false,
                "contact_type_id": 1
            }
        ],
        "documents": [],
        "title": "Питомник Ильича",
        "content": "Наш питомник отличается культурой питания! Собачки нашего клуба - самые воспитанные, они не едят с пола и тем более из мусорного ведра!   ",
        "picture_link": null,
        "create_date": "2022-04-20T15:36:08.9264+03:00",
        "geo_lat": "",
        "geo_lon": "",
        "organization_status_id": 1,
        "organization_status_name": "Действующая",
        "federation_name": "РФЛС",
        "federation_alias": "rfls",
        "is_active": true,
        "user_type": 4,
        "counters": {
            "publications_count": 43,
            "photos_count": 14,
            "videos_count": 2,
            "exhibitions_count": 0,
            "documents_count": 8
        },
        "active_rkf_user": false,
        "active_member": false,
        "subscribed": false,
        "member": false
    });
    const [needRequest, setNeedRequest] = useState(true);
    const canEdit = true;
    const alias = 'd8b5bdd1b7b94dcf908c092f1b6ea4c1';
    const isAuthenticated = true;
    const getNurseryInfo = () => {
        console.log('ya funktsia zaprosa infi na server!!')
    }
    const isMobile = useIsMobile(1080);

    return (
        <Layout>
            <div className="redesign">
                <Container className="content nursery-page">
                    <div className="nursery-page__content-wrap">
                        <div className="nursery-page__content">
                            <UserBanner
                                link={nursery.headliner_link}
                                canEdit={canEdit}
                                updateInfo={getNurseryInfo}
                            />
                            {isMobile &&
                                <>
                                    <UserHeader
                                        user="nursery"
                                        logo={nursery.logo_link}
                                        name={nursery.name || 'Имя отсутствует'}
                                        alias={alias}
                                        profileId={nursery.id}
                                        federationName={nursery.federation_name}
                                        federationAlias={nursery.federation_alias}
                                        active_rkf_user={nursery.active_rkf_user}
                                        active_member={nursery.active_member}
                                        canEdit={canEdit}
                                        subscribed={nursery.subscribed}
                                        // onSubscriptionUpdate={onSubscriptionUpdate}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    {nursery.breeds && !!nursery.breeds.length &&
                                        <BreedsList breeds={nursery.breeds} />
                                    }
                                </>
                            }
                            {/*<UserDescription description={nursery.description} />*/}
                            <UserContacts {...nursery} profileAlias={`/kennel/${alias}`} />
                            {isMobile &&
                                <>
                                    <UserPhotoGallery
                                        alias={alias}
                                        pageLink={`/kennel/${alias}/gallery`}
                                        canEdit={canEdit}
                                    />
                                    <UserVideoGallery
                                        alias={alias}
                                        pageLink={`/kennel/${alias}/video`}
                                        canEdit={canEdit}
                                    />
                                </>
                            }
                            {canEdit &&
                                <AddArticle
                                    id={nursery.id}
                                    logo={nursery.logo_link}
                                    setNeedRequest={setNeedRequest}
                                    profileInfo={nursery}
                                    setProfileInfo={setNursery}
                                />
                            }
                            <UserNews
                                canEdit={canEdit}
                                alias={alias}
                                needRequest={needRequest}
                                setNeedRequest={setNeedRequest}
                                profileInfo={nursery}
                                setProfileInfo={setNursery}
                            />
                        </div>
                        <Aside className="nursery-page__info">
                            <StickyBox offsetTop={60}>
                                <div className="nursery-page__info-inner">
                                    {!isMobile &&
                                        <UserHeader
                                            user="nursery"
                                            logo={nursery.logo_link}
                                            name={nursery.name || 'Имя отсутствует'}
                                            alias={alias}
                                            profileId={nursery.id}
                                            federationName={nursery.federation_name}
                                            federationAlias={nursery.federation_alias}
                                            active_rkf_user={nursery.active_rkf_user}
                                            active_member={nursery.active_member}
                                            canEdit={canEdit}
                                            subscribed={nursery.subscribed}
                                            // onSubscriptionUpdate={onSubscriptionUpdate}
                                            isAuthenticated={isAuthenticated}
                                        />
                                    }
                                    {!isMobile && <UserMenu userNav={canEdit
                                        ? kennelNav(alias) // Show NewsFeed menu item to current user only
                                        : kennelNav(alias).filter(i => i.id !== 2)}
                                                            // notificationsLength={notificationsLength}
                                    />}
                                    {!isMobile &&
                                        <>
                                            <Banner type={BANNER_TYPES.kennelPageUnderPhotos} />
                                            {nursery.breeds && !!nursery.breeds.length &&
                                                <BreedsList breeds={nursery.breeds} />
                                            }
                                            <UserPhotoGallery
                                                alias={alias}
                                                pageLink={`/nbc/${alias}/gallery`}
                                                canEdit={canEdit}
                                            />
                                            <UserVideoGallery
                                                alias={alias}
                                                pageLink={`/nbc/${alias}/video`}
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
}


const NBCPage = (props) => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default React.memo(NBCPage);