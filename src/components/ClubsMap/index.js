import React, {memo, useEffect, useState} from "react";
import {Map, ObjectManager, YMaps} from "react-yandex-maps";
import StickyBox from "react-sticky-box";
import Aside from "../../components/Layouts/Aside";
import CitiesFilter from "../Filters/CitiesFilter";
import RegionsFilter from "../Filters/RegionsFilter";
import CopyrightInfo from "../CopyrightInfo";
import {Request} from "../../utils/request";
import OrganizationsFilter from "./components/OrganizationsFilter";
import {connectShowFilters} from "../Layouts/connectors";

import "./style.scss";


const ClubsMap = ({fullScreen, isOpenFilters}) => {
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [userTypes, setUserTypes] = useState(0);
    const [loading, setLoading] = useState(true);
    const [targetCity, setTargetCity] = useState([1121]);
    const [targetZoom, setTargetZoom] = useState(10);
    const [targetRegion, setTargetRegion] = useState([42]);
    const [targetCoords, setTargetCoords] = useState([55.755819, 37.617644]);

    const getOrganizations = async () => {
        await Request({
            url: `/api/club/club_yandex_maps?user_type=${userTypes}`
        }, result => {
            const getLink = (userType, alias) => `/${userType === 4 ? 'kennel' : 'club'}/${alias}`;

            result.features.forEach(org => {
                org.properties.balloonContentHeader = `<a style="text-decoration: none" href="${getLink(org.user_type, org.alias)}">${org.properties.balloonContentHeader}</a>`;
                org.properties.balloonContentBody = `<a style="text-decoration: none; color: #36f; font-size: 16px" href="${getLink(org.user_type, org.alias)}">${org.properties.clusterCaption}</a><br><div class="inner" style="padding-top: 10px">${org.properties.balloonContentBody}</div>`;
            });

            setData(JSON.stringify(result));
        });
    };

    const getRegions = async () => {
        await Request({
            url: '/api/Club/regions'
        }, data => {
            setRegions(data.map(region => ({ 'value': region.id, 'label': region.name })));
        });
    };

    useEffect(() => {
        (async () => {
            await getOrganizations();

            setLoading(false);
        })();
    }, [userTypes]);

    useEffect(() => {
        (async () => {
            await getRegions();

            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await Request({
                url: `/api/club/get_yandex_maps_coordinates?RegionId=${targetRegion[0]}`
            }, data => {
                setTargetCoords([data.geo_lat, data.geo_lon]);
                setTargetZoom(8);
            });

            await Request({
                url: `/api/club/yandex_maps_filter?regionId=${targetRegion[0]}`
            }, data => {
                setCities(data);
            });
        })();
    }, [targetRegion]);

    useEffect(() => {
        (() => Request({
            url: `/api/club/get_yandex_maps_coordinates?CityId=${targetCity[0]}`
        }, data => {
            setTargetCoords([data.geo_lat, data.geo_lon]);
            setTargetZoom(11);
        }))();
    }, [targetCity]);

    const handleChangeCity = async citiesIds => {
        setTargetCity(citiesIds.length ? [citiesIds[1] || citiesIds[0]] : [0]);
    };

    const handleChangeRegion = regionsIds => {
        setTargetRegion(regionsIds.length ? [regionsIds[1] || regionsIds[0]] : [42]);
    };

    const handleChangeOrganization = userType => {
        setUserTypes(userType);
    };

    return !!data.length &&
        <YMaps>
            <Map
                defaultState={{center: [55.76, 37.62], zoom: 10}}
                width='100%'
                height={fullScreen ? `100vh` : `100%`}
                state={{center: targetCoords, zoom: targetZoom}}
            >
                <ObjectManager
                    options={{
                        clusterize: true,
                        gridSize: 32,
                        clusterDisableClickZoom: true,
                        geoObjectOpenBalloonOnClick: true
                    }}
                    clusters={{preset: 'islands#greenClusterIcons'}}
                    defaultFeatures={data}
                    features={data}
                    modules={[
                        'objectManager.addon.objectsBalloon',
                        'objectManager.addon.clustersBalloon',
                        'objectManager.addon.objectsHint'
                    ]}
                />
            </Map>
            {fullScreen &&
                <Aside className={`map-page__right${isOpenFilters ? ' _open' : ''}`}>
                    <StickyBox offsetTop={60}>
                        <div className='map-page__filters'>
                            <RegionsFilter
                                loading={loading}
                                regions={regions}
                                region_ids={targetRegion}
                                onChange={handleChangeRegion}
                                startOpen
                            />
                            <CitiesFilter
                                loading={loading}
                                cities={cities}
                                city_ids={targetCity}
                                onChange={handleChangeCity}
                                startOpen
                            />
                            <OrganizationsFilter
                                startOpen
                                onChange={handleChangeOrganization}
                            />
                            <CopyrightInfo withSocials={true} />
                        </div>
                    </StickyBox>
                </Aside>
            }
        </YMaps>
};

export default connectShowFilters(memo(ClubsMap));