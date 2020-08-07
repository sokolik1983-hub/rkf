import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "pages/Club/components/ClubUserNews";
import Card from "components/Card";
import ClubUserHeader from "components/redesign/UserHeader";
import UserDescription from "components/redesign/UserDescription";
import UserContacts from "components/redesign/UserContacts";
import UserGallery from "components/redesign/UserGallery";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import UserMenu from "./components/UserMenu";
import StickyBox from "react-sticky-box";
import useWindowSize from "../../utils/useWindowSize";
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

const NurseryPage = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [nursery, setNursery] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const windowSize = useWindowSize();
    const galleryRef = useRef(null);
    const galleryHolderRef = useRef(null);
    const mobileGalleryHolderRef = useRef(null);
    const alias = match.params.id;

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
            error.status === 422 ? <Redirect to="/kennel/activation" /> : <Redirect to="404" /> :
            <Layout>
                <div className="redesign">
                    <Container className="content nursery-page">
                        <div className="nursery-page__content-wrap">
                            <div className="nursery-page__content">
                                <Card className="nursery-page__content-banner">
                                    <div style={nursery.headliner_link && { backgroundImage: `url(${nursery.headliner_link}`, backgroundColor: '#fff' }} />
                                </Card>
                                <div className="nursery-page__mobile-only">
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
                                </div>
                                <UserDescription description={nursery.description} />
                                <UserContacts {...nursery} />
                                <div ref={mobileGalleryHolderRef} />
                                {canEdit &&
                                    <AddArticle
                                        id={nursery.id}
                                        logo={nursery.logo_link}
                                        setNeedRequest={setNeedRequest}
                                    />
                                }
                                <UserNews
                                    user="nursery"
                                    canEdit={canEdit}
                                    alias={alias}
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
                                        <div ref={galleryHolderRef}>
                                            <div ref={galleryRef}><UserGallery alias={nursery.club_alias} isKennel={true} /></div>
                                        </div>
                                        <div className="nursery-page__mobile-only">
                                            <UserMenu alias={alias} />
                                        </div>
                                        <div className="nursery-page__copy-wrap">
                                            <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                            <p>Политика обработки персональных данных</p>
                                        </div>
                                    </div>
                                </StickyBox>
                            </Aside>
                        </div>
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(NurseryPage));