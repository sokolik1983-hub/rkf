import React, {memo, useEffect, useState} from "react";
import {Map, ObjectManager, YMaps} from "react-yandex-maps";
import StickyBox from "react-sticky-box";
import Aside from "../../components/Layouts/Aside";
import CitiesFilter from "../Filters/CitiesFilter";
import RegionsFilter from "../Filters/RegionsFilter";
import CopyrightInfo from "../CopyrightInfo";
import useIsMobile from "../../utils/useIsMobile";
import {Request} from "../../utils/request";
import "./style.scss";


const ClubsMap = ({fullScreen}) => {
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [targetCity, setTargetCity] = useState([1121]);
    const [targetZoom, setTargetZoom] = useState(10);
    const [targetRegion, setTargetRegion] = useState([42]);
    const [targetCoords, setTargetCoords] = useState([55.755819, 37.617644]);

    const isMobile = useIsMobile(1080);

    const getClubs = async () => {
        await Request({
            url: '/api/club/club_yandex_maps'
        }, result => {
            result.features.forEach( club => {
                club.properties.balloonContentHeader = `<a style="text-decoration: none" href="/club/${club.alias}">${club.properties.balloonContentHeader}</a>`;
                club.properties.balloonContentBody = `<a style="text-decoration: none; color: #36f; font-size: 16px" href="/club/${club.alias}">${club.properties.clusterCaption}</a><br><div className="inner" style="padding-top: 10px">${club.properties.balloonContentBody}</div>`;
                club.properties.preset = 'islands#pinkCircleIcon'
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
            await getClubs();
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
                    objects={{preset: 'islands#greenDotIcon'}}
                    clusters={{preset: 'islands#greenClusterIcons'}}
                    defaultFeatures={data}
                    modules={[
                        'objectManager.addon.objectsBalloon',
                        'objectManager.addon.clustersBalloon',
                        'objectManager.addon.objectsHint'
                    ]}
                />
            </Map>
            {fullScreen &&
                <Aside className="map-page__right">
                    <StickyBox offsetTop={60}>
                        <div className='map-page__filters'>
                            <RegionsFilter
                                loading={loading}
                                regions={regions}
                                region_ids={targetRegion}
                                onChange={handleChangeRegion}
                                startOpen={!isMobile}
                            />
                            <CitiesFilter
                                loading={loading}
                                cities={cities}
                                city_ids={targetCity}
                                onChange={handleChangeCity}
                                startOpen={!isMobile}
                            />
                            <CopyrightInfo withSocials={true} />
                        </div>
                    </StickyBox>
                </Aside>
            }
        </YMaps>
};

export default memo(ClubsMap);