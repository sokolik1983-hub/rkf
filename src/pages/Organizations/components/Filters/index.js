import React, {memo, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import Aside from '../../../../components/Layouts/Aside';
import Card from '../../../../components/Card';
import CopyrightInfo from '../../../../components/CopyrightInfo';
import Socials from '../../../../components/Socials';
import Statistics from '../../../../components/Statistics';
import FederationsFilter from '../../../../components/Filters/FederationsFilter';
import FederationChoiceFilter from '../../../../components/Filters/FederationChoiceFilter';
import ActivatedFilter from '../../../../components/Filters/ActivatedFilter';
import BreedsFilter from '../../../../components/Filters/BreedsFilter';
import CitiesFilter from '../../../../components/Filters/CitiesFilter';
import NotActivatedFilter from '../../../../components/Filters/NotActivatedFilter';
import ActiveUserFilter from '../../../../components/Filters/ActiveUserFilter';
import ClubsMap from '../../../../components/ClubsMap';
import {RKFInfo} from '../../../Home/config';
import {setOverflow} from '../../../../utils';
import {Request} from '../../../../utils/request';
import {
    endpointGetClubsCities,
    endpointGetFederations,
    endpointGetKennelBreeds,
    endpointGetKennelsCities,
    endpointGetNKPBreeds,
    endpointGetRegions,
    endpointGetClubRegions,
    endpointGetNurseryRegions,
} from '../../config';
import {getEmptyFilters, setFiltersToUrl} from '../../utils';
import RegionsFilter from '../../../../components/Filters/RegionsFilter';

import './index.scss';


const Filters = ({
    organization_type,
    federation_ids,
    city_ids,
    breed_ids,
    activated,
    not_activated,
    active_member,
    active_rkf_user,
    isOpenFilters,
    filtersValue,
    region_ids,
    scrollRef
}) => {
    const [loading, setLoading] = useState(true);
    const [federations, setFederations] = useState([]);
    const [cities, setCities] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [regions, setRegions] = useState([]);
    const [currentCityIds, setCurrentCityIds] = useState([]);
    const [isUserFiltered, setIsUserFiltered] = useState(false);

    useEffect(() => {
        scrollFunc();
    }, [city_ids])

    const getBreeds = async () => {
        await Request({
            url: organization_type === 4 ? endpointGetKennelBreeds : endpointGetNKPBreeds
        }, data => {

            setBreeds(data.map(item => ({value: item.id, label: item.name})));
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    const getCities = async () => {
        organization_type !== 7 &&
            await Request({
                url: organization_type === 3 ? endpointGetClubsCities : endpointGetKennelsCities
            }, data => {
                setCities(data);
            }, error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
            });
    };

    const getFederations = async () => {
        await Request({
            url: endpointGetFederations
        }, data => {
            setFederations(data.sort((a, b) => a.id - b.id));
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    const getRegions = async () => {
        await Request({
            url: organization_type === 3 ? endpointGetClubRegions : (organization_type === 4 ? endpointGetNurseryRegions : endpointGetRegions)
        }, data => {
            setRegions(data.sort((a, b) => a.id - b.id));
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

            if (organization_type === 3 || organization_type === 4) {
                await getFederations();
                await getRegions();
                await getCities();
            }

            if (organization_type === 4 || organization_type === 7) {
                await getBreeds();
            }

            setLoading(false);
        })();
        scrollFunc();
    }, [organization_type]);

    useEffect(() => {
        organization_type !== 7 &&
        (() => Request({
            url: `${endpointGetClubsCities}?${region_ids.map(reg => `regionIds=${reg}`).join('&')}`
        }, data => {
            setCities(data);

            isUserFiltered && goToLink(cities, currentCityIds);
        },error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();

    }, [region_ids]);

    const scrollFunc = () => {
        if (!!scrollRef && window.scrollY > scrollRef.current.getBoundingClientRect().top + window.scrollY) window.scrollTo(0, scrollRef.current.getBoundingClientRect().top + window.scrollY)
    }

    const handleChangeRegions = filter => {
        setIsUserFiltered(true);
        setFiltersToUrl({region_ids: filter});
        scrollFunc();
    };

    const handleChangeCities = filter => {
        setCurrentCityIds(filter);
        setFiltersToUrl({city_ids: filter});
        scrollFunc();
    };

    const goToLink = (cities, currentCityIds) => {
        if(filtersValue.region_ids.length === 0) {
            setFiltersToUrl({city_ids: []});
        } else {
            const newArr = [];
            cities.map(item => item.value).forEach(item => {
                currentCityIds.forEach(elem => {
                        if(item === elem) {
                            newArr.push(item);
                        }
                    })
                });
            setCurrentCityIds(newArr)
            setFiltersToUrl({ city_ids: newArr});
        }
        setIsUserFiltered(false);
        scrollFunc();
    };

    return (
        <Aside className={`organizations-page__left${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={60}>
                <div className="organizations-page__filters">
                    {organization_type === 5 &&
                        <>
                            <Card className="organizations-page__about">
                                <h3>{RKFInfo.aboutTitle}</h3>
                                <p>{RKFInfo.about}</p>
                            </Card>
                            <Socials />
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
                            <Card>
                                <button
                                    type="button"
                                    className="link link-broom"
                                    onClick={() => setFiltersToUrl({ ...getEmptyFilters(), organization_type })}
                                >
                                    <svg
                                        className="icon-broom"
                                        width="16" height="16" viewBox="0 0 20 20 " fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.01 2.86102e-08L18.43 1.42L12.71 7.13C13.78
                                         8.67 13.93 10.52 13.03 11.72L6.71 5.4C7.91 4.5 9.76 4.65
                                          11.3 5.72L17.01 2.86102e-08ZM3.58 14.85C1.57 12.84 0.34 10.44
                                           -9.53674e-08 8.2L4.88 6.11L12.32 13.55L10.23 18.43C7.99 18.09
                                            5.59 16.86 3.58 14.85Z" fill="#72839c" />
                                    </svg>
                                    Сбросить все параметры
                                </button>
                            </Card>
                            {(organization_type === 3 || organization_type === 4) &&
                                <>
                                    <FederationsFilter
                                        loading={loading}
                                        federations={federations}
                                        federation_ids={federation_ids}
                                        onChange={filter => {
                                            setFiltersToUrl({federation_ids: filter});
                                            scrollFunc();
                                        }}
                                    />
                                    <Card className="organizations-page__other">
                                        <div className="organizations-page__other-info-wrap">
                                            <h5 className="organizations-page__other-title">Статус</h5>
                                            <a className="organizations-page__other-info" href="https://help.rkf.online/ru/knowledge_base/art/271/cat/1/" title="Подробнее о статусах кинологических организаций" target="_blank" rel="noopener noreferrer">
                                                <svg className="organizations-page__other-svg" fill="#72839c" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 7H11V5H9V7ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM9 15H11V9H9V15Z" />
                                                </svg>
                                            </a>
                                        </div>
                                        <ActiveUserFilter
                                            active_rkf_user={active_rkf_user}
                                            onChange={filter => {
                                                setFiltersToUrl({not_activated: false, active_rkf_user: filter});
                                                scrollFunc();
                                            }}
                                        />
                                        <FederationChoiceFilter
                                            active_member={active_member}
                                            onChange={filter => {
                                                setFiltersToUrl({not_activated: false, active_member: filter});
                                                scrollFunc();
                                            }}
                                        />
                                        <ActivatedFilter
                                            activated={activated}
                                            label={`Активированные ${organization_type === 3 ? 'клубы' : 'питомники'}`}
                                            onChange={filter => {
                                                setFiltersToUrl({not_activated: false, activated: filter});
                                                scrollFunc();
                                            }}
                                        />
                                        <NotActivatedFilter
                                            not_activated={not_activated}
                                            label={`Неактивированные ${organization_type === 3 ? 'клубы' : 'питомники'}`}
                                            onChange={filter => {
                                                setFiltersToUrl(filter ?
                                                    {
                                                        ...getEmptyFilters(),
                                                        organization_type,
                                                        active_rkf_user: false,
                                                        activated: false,
                                                        not_activated: filter
                                                    } :
                                                    {not_activated: filter}
                                                );
                                                scrollFunc();
                                            }}
                                        />
                                    </Card>
                                </>
                            }
                            {(organization_type === 4 || organization_type === 7) &&
                                <BreedsFilter
                                    loading={loading}
                                    breeds={breeds}
                                    breed_ids={breed_ids}
                                    onChange={filter => setFiltersToUrl({breed_ids: filter})}
                                />
                            }
                            {(organization_type === 3 || organization_type === 4) &&
                                    <RegionsFilter
                                        regions={regions}
                                        region_ids={filtersValue.region_ids}
                                        onChange={filter => handleChangeRegions(filter)}
                                    />
                            }
                            {(organization_type === 3 || organization_type === 4) &&
                                <CitiesFilter
                                    loading={loading}
                                    cities={cities}
                                    city_ids={city_ids}
                                    onChange={filter => handleChangeCities(filter)}
                                />
                            }
                        </>
                    }
                    <CopyrightInfo withSocials={true} />
                </div>
            </StickyBox>
        </Aside>
    )
};

export default memo(Filters);