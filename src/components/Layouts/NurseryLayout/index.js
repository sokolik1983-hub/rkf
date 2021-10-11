import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import StickyBox from "react-sticky-box";
import Loading from "components/Loading";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Aside from "components/Layouts/Aside";
import UserMenu from "components/Layouts/UserMenu";
import UserHeader from "components/redesign/UserHeader";
import UserPhotoGallery from "components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "components/CopyrightInfo";
import { Request } from "utils/request";
import { endpointGetNurseryInfo, kennelNav } from "./config";
import { connectAuthVisible } from "pages/Login/connectors";
import useIsMobile from "utils/useIsMobile";
import { BANNER_TYPES } from "appConfig";
import Banner from "components/Banner";
import BreedsList from "components/BreedsList";
import "./index.scss";


const getAddressString = addressObj => {
    let address = '';
    if (addressObj.postcode) address += `${addressObj.postcode}, `;
    if (addressObj.city_name) address += `${addressObj.city_name}, `;
    if (addressObj.street_type_name && addressObj.street_name) address += `${addressObj.street_type_name} ${addressObj.street_name}, `;
    if (addressObj.house_type_name && addressObj.house_name) address += `${addressObj.house_type_name} ${addressObj.house_name}, `;
    if (addressObj.flat_type_name && addressObj.flat_name) address += `${addressObj.flat_type_name} ${addressObj.flat_name}`;
    return address;
};


const NurseryLayout = ({ history, match, profile_id, is_active_profile, isAuthenticated, children }) => {
    const [nursery, setNursery] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const alias = match.params.route;
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        (() => getNurserynfo())();
    }, []);

    const getNurserynfo = async () => {
        Request({
            url: endpointGetNurseryInfo + alias
        }, data => {
            if (data.user_type !== 4) {
                history.replace(`/club/${alias}`);
            } else {
                const legal_address = data.legal_address ? getAddressString(data.legal_address) : '';
                const address = data.fact_address ? getAddressString(data.fact_address) : legal_address;
                const city_name = data.fact_address ? data.fact_address.city_name : data.legal_address ? data.legal_address.city_name : '';

                setNursery({ ...data, legal_address, address, city: { name: city_name } });
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        })
    };

    return loading ?
        <Loading /> :
        error ?
            error.status === 422 ? <Redirect to="/kennel/activation" /> : <Redirect to="404" /> :
            <Layout setNotificationsLength={setNotificationsLength} withFilters>
                <div className="redesign">
                    <Container className="content nursery-page">
                        <div className="nursery-page__content-wrap">
                            <div className="nursery-page__content">
                                {
                                    React.cloneElement(children, {
                                        isMobile,
                                        userInfo: nursery,
                                        getUserInfo: getNurserynfo,
                                        canEdit,
                                        alias,
                                        id: profile_id,
                                        setNeedRequest,
                                        needRequest,
                                        setUserInfo: setNursery
                                    })
                                }
                            </div>
                            <Aside className="nursery-page__info">
                                <StickyBox offsetTop={60}>
                                    <div className="nursery-page__info-inner">
                                        {!isMobile &&
                                            <UserHeader
                                                canEdit={canEdit}
                                                user="nursery"
                                                logo={nursery.logo_link}
                                                name={nursery.name || 'Имя отсутствует'}
                                                alias={alias}
                                                profileId={nursery.id}
                                                federationName={nursery.federation_name}
                                                federationAlias={nursery.federation_alias}
                                                active_rkf_user={nursery.active_rkf_user}
                                                active_member={nursery.active_member}
                                            />
                                        }
                                        {!isMobile && <UserMenu userNav={canEdit
                                            ? kennelNav(alias) // Show NewsFeed menu item to current user only
                                            : kennelNav(alias).filter(i => i.id !== 2)}
                                                   notificationsLength={notificationsLength}
                                        />}
                                        {!isMobile &&
                                            <>
                                                {nursery.breeds && !!nursery.breeds.length &&
                                                    <BreedsList breeds={nursery.breeds} />
                                                }
                                                <Banner type={BANNER_TYPES.kennelPageUnderPhotos} />
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

export default React.memo(connectAuthVisible(NurseryLayout));