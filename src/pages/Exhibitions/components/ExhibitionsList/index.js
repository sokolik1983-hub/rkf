import React, { useEffect, useState } from "react";
import Placeholder from "./Placeholder";
import Paginator from "components/Paginator";
import { buildUrl } from "pages/Exhibitions/utils";
import { Request } from "utils/request";
import { endpointGetExhibitions } from "pages/Exhibitions/config";
import { connectFilters } from "pages/Exhibitions/connectors";
import ListItem from "./ListItem";
import './index.scss';

const ExhibitionsList = ({ CityIds, ClubIds, DateFrom, DateTo, ExhibitionName, PageNumber, setFiltersSuccess, RankIds, BreedIds }) => {
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
        setUrl(`${buildUrl({ CityIds, ClubIds, DateFrom, DateTo, ExhibitionName, PageNumber, RankIds, BreedIds })}`);
    }, [CityIds, ClubIds, DateFrom, DateTo, PageNumber, RankIds, BreedIds]);

    useEffect(() => {
        if (ExhibitionName) {
            setPrevUrl(url);
            setUrl(`${endpointGetExhibitions}?ExhibitionName=${ExhibitionName}`);
        } else {
            if (prevUrl) {
                setUrl(prevUrl);
                // setUrl(`${endpointGetExhibitions}?DateFrom=${DateFrom}${DateTo ? '&DateTo=' + DateTo : ''}`);
            }
        }
    }, [ExhibitionName]);

    useEffect(() => {
        if (url) {
            (() => getExhibitions(url))();
        }
    }, [url]);

    return <div className="ExhibitionsList">
        {
            loading
                ? <Placeholder />
                : (exhibitions && !!exhibitions.length) &&
                <ul className="ExhibitionsList__content">
                    {exhibitions && !!exhibitions.length && exhibitions.map(item => (
                        <li className="ExhibitionsList__item" key={item.id}>
                            {
                                <ListItem
                                    id={item.id}
                                    title={item.content}
                                    city={item.city}
                                    dates={item.dates}
                                    photo={item.picture_link}
                                    url={item.url}
                                    club_name={item.club_name}
                                    club_alias={item.club_alias}
                                    club_logo={item.club_logo}
                                    federation_name={item.federation_name}
                                    federation_link={item.federation_link}
                                    ranks={item.rank_ids}
                                />
                            }
                        </li>
                    ))}
                </ul>}
        {(!exhibitions || !exhibitions.length) && !loading && <h2 className="ExhibitionsList__title">Выставок не найдено</h2>}
        {
            pagesCount > 1 &&
            <Paginator
                pagesCount={pagesCount}
                currentPage={PageNumber}
                setPage={(page) => setFiltersSuccess({ PageNumber: page })}
            />
        }
    </div>
};

export default connectFilters(React.memo(ExhibitionsList));