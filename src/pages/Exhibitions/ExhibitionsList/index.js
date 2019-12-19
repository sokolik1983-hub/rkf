import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import List from "../../../components/List";
import { buildUrl } from "../utils";
import { Request } from "../../../utils/request";
import { connectFilters } from "../connectors";
import { endpointGetExhibitions } from "../config";
import { endpointExhibitionsList } from 'apps/Exhibitions/config';

const ExhibitionsList = ({ CityIds, ClubIds, DateFrom, DateTo, ExhibitionName, PageNumber, setFiltersSuccess, RankIds }) => {
    const [exhibitions, setExhibitions] = useState(null);
    const [pagesCount, setPagesCount] = useState(1);
    const [url, setUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const getExhibitions = async (url) => {
        setLoading(true);
        await Request({
            url: url
        }, data => {
            const modifiedExhibitions = data.exhibitions.map(exhibition => {
                exhibition.title = exhibition.city;
                exhibition.create_date = new Date(exhibition.dates[0].year, exhibition.dates[0].month - 1, exhibition.dates[0].day);
                exhibition.content = exhibition.exhibition_name;
                exhibition.url = `/exhibitions/${exhibition.id}`;
                return exhibition;
            });
            setExhibitions(modifiedExhibitions);
            setPagesCount(data.page_count);
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        });
    };

    useEffect(() => {
        setUrl(`${buildUrl({ CityIds, ClubIds, DateFrom, DateTo, ExhibitionName, PageNumber, RankIds })}`);
    }, [CityIds, ClubIds, DateFrom, DateTo, PageNumber, RankIds]);

    useEffect(() => {
        if (ExhibitionName) {
            setPrevUrl(url);
            setUrl(`${endpointGetExhibitions}?ExhibitionName=${ExhibitionName}`);
        } else {
            if (prevUrl) {
                setUrl(`${endpointExhibitionsList}?DateFrom=${DateFrom}${DateTo ? '&DateTo=' + DateTo : ''}`);
            }
        }
    }, [ExhibitionName]);

    useEffect(() => {
        if (url) {
            (() => getExhibitions(url))();
        }
    }, [url]);

    return loading ?
        <Loading /> :
        <List
            list={exhibitions}
            listNotFound="Выставок не найдено"
            listClass="exhibitions-list"
            isFullDate={false}
            pagesCount={pagesCount}
            currentPage={PageNumber}
            setPage={(page) => setFiltersSuccess({ PageNumber: page })}
        />
};

export default connectFilters(React.memo(ExhibitionsList));