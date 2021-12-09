import React, { useEffect, useState } from 'react';
import { Map, ObjectManager, YMaps } from 'react-yandex-maps';
import StickyBox from 'react-sticky-box';
import { Request } from 'utils/request';
import CitiesFilter from '../Filters/CitiesFilter';
import CopyrightInfo from '../CopyrightInfo';
import Aside from '../../components/Layouts/Aside';

import './style.scss'

const ClubsMap = ({ fullScreen }) => {
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [targetCity, setTargetCity] = useState([1121]);
    const [targetCoords, setTargetCoords] = useState([55.76, 37.64]);

    const getYandexCities = async () => {
        await Request({
            url: '/api/club/club_yandex_maps'
        }, result => {
            setData(JSON.stringify(result));
        });
    }
    const getCities = async () => {
        await Request({
            url: '/api/Club/cards_cities'
        }, data => {
            setCities(data);
        });
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getCities();
            await getYandexCities();
            setLoading(false);
        })();
        console.log('cities', cities);
    }, []);


    // useEffect(()=> {
    //     const lastCity = targetCity[targetCity.length - 1];
    //     (async () => {
    //         await Request({
    //             url: `/api/club/get_yandex_maps_coordinates?CityId=${lastCity}`
    //         }, data => {
    //             // setCities(data);
    //         }, error => {
    //             console.log(error.response);
    //             if (error.response) alert(`Ошибка: ${error.response.status}`);
    //         });
    //         console.log(targetCity);
    //     })();
    // },[targetCity, setTargetCity])
    console.log('targetCoords', targetCoords);

    return (
        <>
            <Aside className={'organizations-page__left'}>
                <StickyBox offsetTop={60}>
                    <div className='organizations-page__filters'>
                        <CitiesFilter
                            loading={loading}
                            cities={cities}
                            city_ids={targetCity}
                            // setTargetCiti={setTargetCiti}
                            onChange={setTargetCity}
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
        </>
    );
};

export default React.memo(ClubsMap);