import { useEffect } from 'react';
import { getHeaders } from 'utils/request';
import axios from 'axios';
import { endpointExhibitionsList } from 'apps/Exhibitions/config';

export const useResourceGlobalCity = ({
    globalCity,
    applyFilter,
    changeCitiesFilter,
    filter
}) => {
    useEffect(() => {
        let didCancel = false;

        const axiosConfig = {
            url: `${endpointExhibitionsList}?CityIds=${globalCity}`,
            headers: getHeaders()
        };

        const fetchData = async () => {
            try {
                const response = await axios(axiosConfig);
                const { exhibitions } = response.data.result;
                console.log(exhibitions.length);
                if (exhibitions.length === 0) {
                    const cities = filter.cities.filter(
                        city => city !== globalCity
                    );
                    changeCitiesFilter(cities);
                    applyFilter();
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (!didCancel) {
            fetchData();
        }

        return () => {
            didCancel = true;
        };
    }, []);
};
