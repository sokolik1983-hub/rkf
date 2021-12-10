import React, { useEffect, useState } from 'react';
import { Map, ObjectManager, YMaps } from 'react-yandex-maps';
import StickyBox from 'react-sticky-box';
import { Request } from 'utils/request';
import CitiesFilter from '../Filters/CitiesFilter';
import RegionsFilter from '../Filters/RegionsFilter';
import CopyrightInfo from '../CopyrightInfo';
import Aside from '../../components/Layouts/Aside';

import './style.scss';

const ClubsMap = ({ fullScreen }) => {
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [targetCity, setTargetCity] = useState([1121]);
    const [targetRegion, setTargetRegion] = useState([41]);
    const [targetCoords, setTargetCoords] = useState([55.76, 37.64]);

    const getYandexCities = async () => {
        await Request({
            url: '/api/club/club_yandex_maps'
        }, result => {
            setData(JSON.stringify(result));
        });
    };
    const getCities = async () => {
        await Request({
            url: '/api/Club/cards_cities'
        }, data => {
            setCities(data);
        });
    };
    const getRegions = async () => {
        await Request({
            url: '/api/Club/regions'
        }, data => {
            setRegions(data.map(r => ({ 'value': r.id, 'label': r.name })));
        });
    };

    useEffect(() => {
        setLoading(true);
        (async () => {
            await getCities();
            await getRegions();
            await getYandexCities();
        })();
        setLoading(false);
    }, []);


    // useEffect(()=> {
    //     const lastCity = targetCity[targetCity.length - 1];
    //     (async () => {
    //         await Request({
    //             url: `/api/club/get_yandex_maps_coordinates?CityId=${lastCity}`
    //         }, data => {
    //             // setTargetCoords(data);
    //         });
    //         console.log(targetCoords);
    //     })();
    // },[targetCity, setTargetCity])


    console.log('targetCoords', targetCoords);
    console.log('targetCity', targetCity);
    console.log('targetRegion', targetRegion);


    const handleChangeCity = (event) => {
        setTargetCity([event[1] ? event[1] : event[0]]);
    };
    const handleChangeRegion = (event) => {
        console.log('рррррррррррррегионы',event);
        setTargetRegion([event[1] ? event[1] : event[0]]);
    };


    return (
        <div>
            <Aside className={'organizations-page__left'}>
                <StickyBox offsetTop={60}>
                    <div className='organizations-page__filters'>
                        <RegionsFilter
                            loading={loading}
                            regions={regions}
                            region_ids={targetRegion}
                            onChange={handleChangeRegion}
                        />
                        <CitiesFilter
                            loading={loading}
                            cities={cities}
                            city_ids={targetCity}
                            onChange={handleChangeCity}
                        />

                        <CopyrightInfo withSocials={true} />
                    </div>
                </StickyBox>
            </Aside>
            {!!data.length && <YMaps>
                <Map defaultState={{ center: targetCoords, zoom: 10 }}
                     width='100%'
                     height={fullScreen ? `100vh` : `100%`}>
                    <ObjectManager
                        options={{
                            clusterize: true,
                            gridSize: 32,
                            clusterDisableClickZoom: true,
                            geoObjectOpenBalloonOnClick: true
                        }}
                        objects={{ preset: 'islands#greenDotIcon' }}
                        clusters={{ preset: 'islands#greenClusterIcons' }}
                        defaultFeatures={data}
                        modules={[
                            'objectManager.addon.objectsBalloon',
                            'objectManager.addon.clustersBalloon',
                            'objectManager.addon.objectsHint'
                        ]}
                    />
                </Map>
            </YMaps>}
        </div>
    );
};

export default React.memo(ClubsMap);