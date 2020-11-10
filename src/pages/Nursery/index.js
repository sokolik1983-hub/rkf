import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import StickyBox from "react-sticky-box";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import MenuComponent from "../../components/MenuComponent";
import ClubUserHeader from "components/redesign/UserHeader";
import UserDescription from "components/redesign/UserDescription";
import UserContacts from "components/redesign/UserContacts";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import useIsMobile from "../../utils/useIsMobile";
import { BANNER_TYPES } from "../../appConfig";
import Banner from "../../components/Banner";
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


const NurseryPage = ({ history, match, profile_id, is_active_profile, isAuthenticated, user }) => {
    const [nursery, setNursery] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const alias = match.params.id;
    const isMobile = useIsMobile();

    useEffect(() => {
        (() => Request({
            url: endpointGetNurseryInfo + alias
        }, data => {
            if (data.user_type !== 4) {
                history.replace(`/${alias}`);
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
        }))();
        return () => setNeedRequest(true);
    }, [alias]);

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
                                    <div style={nursery.headliner_link && { backgroundImage: `url(${nursery.headliner_link}`, backgroundColor: '#fff' }} />
                                </Card>
                                {isMobile &&
                                    <>
                                        <ClubUserHeader
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
                                    </>
                                }
                                <UserDescription description={nursery.description} />
                                <UserContacts {...nursery} />
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
                                        profileInfo = {nursery}
                                        setProfileInfo = {setNursery}
                                    />
                                }
                                <UserNews
                                    canEdit={canEdit}
                                    alias={alias}
                                    needRequest={needRequest}
                                    setNeedRequest={setNeedRequest}
                                    profileInfo = {nursery}
                                    setProfileInfo = {setNursery}
                                />
                            </div>
                            <Aside className="nursery-page__info">
                                <StickyBox offsetTop={65}>
                                    <div className="nursery-page__info-inner">
                                        {!isMobile &&
                                            <>
                                                <ClubUserHeader
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
                                                <Banner type={BANNER_TYPES.kennelPageUnderPhotos}/>
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
                                                <CopyrightInfo />
                                            </>
                                        }
                                        {isMobile &&
                                            <MenuComponent
                                                alias={alias}
                                                user={user}
                                                profileId={nursery.id}
                                                noCard={true}
                                            />
                                        }
                                    </div>
                                </StickyBox>
                            </Aside>
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(NurseryPage));