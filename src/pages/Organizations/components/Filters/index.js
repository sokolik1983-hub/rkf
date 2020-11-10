import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import Aside from "../../../../components/Layouts/Aside";
import Card from "../../../../components/Card";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import Statistics from "../../../../components/Statistics";
import FederationsFilter from "../../../../components/Filters/FederationsFilter";
import FederationChoiceFilter from "../../../../components/Filters/FederationChoiceFilter";
import ActivatedFilter from "../../../../components/Filters/ActivatedFilter";
import BreedsFilter from "../../../../components/Filters/BreedsFilter";
import CitiesFilter from "../../../../components/Filters/CitiesFilter";
import ClubsMap from "../../../../components/ClubsMap";
import {setOverflow} from "../../../../utils";
import {getEmptyFilters, setFiltersToUrl} from "../../utils";
import {RKFInfo} from "../../../Home/config";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import {Request} from "../../../../utils/request";
import {
    endpointGetClubsCities,
    endpointGetFederations,
    endpointGetKennelBreeds,
    endpointGetKennelsCities,
    endpointGetNKPBreeds
} from "../../config";
import "./index.scss";
import NotActivatedFilter from "../../../../components/Filters/NotActivatedFilter";
import ActiveUserFilter from "../../../../components/Filters/ActiveUserFilter";


const Filters = ({organization_type,
                  federation_ids,
                  city_ids,
                  breed_ids,
                  activated,
                  not_activated,
                  active_member,
                  active_rkf_user,
                  isOpenFilters}) => {
    const [loading, setLoading] = useState(true);
    const [federations, setFederations] = useState([]);
    const [cities, setCities] = useState([]);
    const [breeds, setBreeds] = useState([]);

    const getBreeds = async () => {
        await Request({
            url: organization_type === 4 ? endpointGetKennelBreeds : endpointGetNKPBreeds
        }, data => {
            setBreeds(data.map(item => ({value: item.id, label: item.name})));
        }, error => {
            console.log(error.response);
            if(error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    const getCities = async () => {
        await Request({
            url: organization_type === 3 ? endpointGetClubsCities : endpointGetKennelsCities
        }, data => {
            setCities(data);
        }, error => {
            console.log(error.response);
            if(error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    const getFederations = async () => {
        await Request({
            url: endpointGetFederations
        }, data => {
            setFederations(data.sort((a,b) => a.id - b.id));
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            if(organization_type === 3 || organization_type === 4) await getFederations();
            if(organization_type === 4 || organization_type === 7) await getBreeds();
            if(organization_type === 3 || organization_type === 4) await getCities();
            setLoading(false);
            window.scrollTo(0,0);
        })();
    }, [organization_type]);

    return (
        <Aside className={`organizations-page__left${isOpenFilters ? ' _open' : ''}`}>
            {loading ?
                <Loading centered={false}/> :
                <StickyBox offsetTop={66}>
                    <div className="organizations-page__filters">
                        {organization_type === 5 &&
                            <>
                                <Card className="organizations-page__about">
                                    <h3>{RKFInfo.aboutTitle}</h3>
                                    <p>{RKFInfo.about}</p>
                                </Card>
                                <Card className="organizations-page__socials">
                                    <h3>РКФ в соцсетях</h3>
                                    <ul className="organizations-page__socials-list">
                                        <li>
                                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/">
                                                <img src="/static/icons/social/facebook.svg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed">
                                                <img src="/static/icons/social/vk.svg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig">
                                                <img src="/static/icons/social/youtube.svg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/">
                                                <img src="/static/icons/social/instagram.svg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial">
                                                <img src="/static/icons/social/telegram.svg" alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                </Card>
                                <Statistics />
                                <Card className="organizations-page__map-wrap">
                                    <h3><Link className="organizations-page__map-title" to="/clubs-map">Карта авторизованных клубов</Link></h3>
                                    <div className="organizations-page__map">
                                        <ClubsMap />
                                    </div>
                                </Card>
                            </>
                        }
                        {organization_type !== 5 &&
                            <>
                                {(organization_type === 3 || organization_type === 4) &&
                                    <>
                                        <FederationsFilter
                                            federations={federations}
                                            federation_ids={federation_ids}
                                            onChange={filter => setFiltersToUrl({federation_ids: filter})}
                                        />
                                        <Card className="organizations-page__other-filters">
                                            <ActiveUserFilter
                                                active_rkf_user={active_rkf_user}
                                                onChange={filter => setFiltersToUrl({not_activated: false, active_rkf_user: filter})}
                                            />
                                            <FederationChoiceFilter
                                                active_member={active_member}
                                                onChange={filter => setFiltersToUrl({not_activated: false, active_member: filter})}
                                            />
                                            <ActivatedFilter
                                                activated={activated}
                                                label={`Активированные ${organization_type === 3 ? 'клубы' : 'питомники'}`}
                                                onChange={filter => setFiltersToUrl({not_activated: false, activated: filter})}
                                            />
                                            <NotActivatedFilter
                                                not_activated={not_activated}
                                                label={`Неактивированные ${organization_type === 3 ? 'клубы' : 'питомники'}`}
                                                onChange={filter => setFiltersToUrl(filter ?
                                                    {...getEmptyFilters(),
                                                        organization_type,
                                                        active_rkf_user: false,
                                                        activated: false,
                                                        not_activated: filter
                                                    } :
                                                    {not_activated: filter}
                                                )}
                                            />
                                        </Card>
                                    </>
                                }
                                {(organization_type === 4 || organization_type === 7) &&
                                    <BreedsFilter
                                        breeds={breeds}
                                        breed_ids={breed_ids}
                                        onChange={filter => setFiltersToUrl({breed_ids: filter})}
                                    />
                                }
                                {(organization_type === 3 || organization_type === 4) &&
                                    <CitiesFilter
                                        cities={cities}
                                        city_ids={city_ids}
                                        onChange={filter => setFiltersToUrl({city_ids: filter})}
                                    />
                                }
                                <Card>
                                    <button
                                        type="button"
                                        className="link"
                                        onClick={() => setFiltersToUrl({...getEmptyFilters(), organization_type})}
                                    >
                                        Сбросить все параметры
                                    </button>
                                </Card>
                            </>
                        }
                        <CopyrightInfo/>
                    </div>
                </StickyBox>
            }
        </Aside>
    )
};

export default connectShowFilters(React.memo(Filters));