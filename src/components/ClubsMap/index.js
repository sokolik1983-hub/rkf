import React, {useEffect, useState} from "react";
import {Map, ObjectManager, YMaps} from "react-yandex-maps";

const ClubsMap = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://tables.rkf.org.ru/GetDogClubs.ashx')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => { console.error(err) });
    }, []);

    return (
        <YMaps>
            <Map defaultState={{ center: [55.76, 37.64], zoom: 10 }} width="100%" height="100%">
                <ObjectManager
                    options={{ clusterize: true, gridSize: 32, clusterDisableClickZoom: true, geoObjectOpenBalloonOnClick: true }}
                    objects={{ preset: 'islands#greenDotIcon'}}
                    clusters={{ preset: 'islands#greenClusterIcons' }}
                    defaultFeatures={data.features}
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