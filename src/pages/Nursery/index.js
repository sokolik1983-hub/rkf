import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "pages/Club/components/ClubUserNews";
import { Gallery } from "components/Gallery";
import Card from "components/Card";
import UserHeader from "components/redesign/UserHeader";
import UserDescription from "components/redesign/UserDescription";
import UserContacts from "components/redesign/UserContacts";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import UserMenu from "./components/UserMenu";
import StickyBox from "react-sticky-box";
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
    const [images, setImages] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        getImages()
    }, []);

    const getImages = () => {
        Request({
            url: `/api/photogallery/gallery?alias=${alias}&elem_count=12`,
            method: 'GET'
        }, data => {
            if (data.photos.length) {
                const twelveItemsArray = Array.apply(null, Array(12)).map((x, i) => i);
                const { photos } = data;
                const imagesArray = twelveItemsArray.map(p => {
                    if (photos[p]) {
                        return {
                            id: photos[p].id,
                            src: photos[p].link,
                            thumbnail: photos[p].small_photo.link,
                            thumbnailWidth: 88,
                            thumbnailHeight: 88,
                            caption: photos[p].caption
                        }
                    } else {
                        return {
                            id: p,
                            src: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnail: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnailWidth: 88,
                            thumbnailHeight: 88
                        }
                    }
                });
                setImages(imagesArray);
            }
        },
            error => {
                //handleError(error);
            });
    }

    const squareStyle = () => {
        return {
            height: '89px',
            width: '89px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    }

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
                                    <div style={nursery.headliner_link && { backgroundImage: `url(${nursery.headliner_link}` }} />
                                </Card>
                                <div className="nursery-page__mobile-only">
                                    <UserHeader
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
                                <div className="nursery-page__mobile-only">
                                    <Card className="nursery-page__gallery-wrap">
                                        <div className="nursery-page__gallery-header">
                                            <h4 className="nursery-page__gallery-title">Фотогалерея</h4>
                                            <Link to={`/kennel/${alias}/gallery`}>Смотреть все</Link>
                                        </div>
                                        <Gallery
                                            items={images}
                                            backdropClosesModal={true}
                                            enableImageSelection={false}
                                            withLoading={false}
                                            rowHeight={89}
                                            thumbnailStyle={squareStyle}
                                        />
                                    </Card>
                                </div>
                                {canEdit &&
                                    <AddArticle
                                        id={nursery.id}
                                        logo={nursery.logo_link}
                                        setPage={setPage}
                                        setNeedRequest={setNeedRequest}
                                    />
                                }
                                <UserNews
                                    user="nursery"
                                    canEdit={canEdit}
                                    alias={alias}
                                    page={page}
                                    setPage={setPage}
                                    needRequest={needRequest}
                                    setNeedRequest={setNeedRequest}
                                />
                            </div>
                            <Aside className="nursery-page__info">
                            <StickyBox offsetTop={75}>
                                <div className="nursery-page__info-inner">
                                    <UserHeader
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
                                    <Card className="nursery-page__gallery-wrap">
                                        <div className="nursery-page__gallery-header">
                                            <h4 className="nursery-page__gallery-title">Фотогалерея</h4>
                                            <Link to={`/kennel/${alias}/gallery`}>Смотреть все</Link>
                                        </div>
                                        <Gallery
                                            items={images}
                                            backdropClosesModal={true}
                                            enableImageSelection={false}
                                            withLoading={false}
                                            rowHeight={88}
                                            thumbnailStyle={squareStyle}
                                        />
                                    </Card>
                                    <div className="nursery-page__mobile-only">
                                        <UserMenu alias={alias}/>
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