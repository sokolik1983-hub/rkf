import React, { useEffect, useState } from "react";
import { Map, ObjectManager, YMaps } from "react-yandex-maps";
import { Request } from 'utils/request';

const ClubsMap = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        Request({
            url: '/api/club/club_yandex_maps'
        }, result => { setData(JSON.stringify(result)) })
    }, []);

    return (
        !!data.length && <YMaps>
            <Map defaultState={{ center: [55.76, 37.64], zoom: 10 }} width="100%" height="100%">
                <ObjectManager
                    options={{ clusterize: true, gridSize: 32, clusterDisableClickZoom: true, geoObjectOpenBalloonOnClick: true }}
                    objects={{ preset: 'islands#greenDotIcon' }}
                    clusters={{ preset: 'islands#greenClusterIcons' }}
                    defaultFeatures={data}
                    modules={[
                        'objectManager.addon.objectsBalloon',
                        'objectManager.addon.clustersBalloon',
                        'objectManager.addon.objectsHint',
                    ]}
                />
            </Map>
        </YMaps>
    )
};

export default React.memo(ClubsMap);