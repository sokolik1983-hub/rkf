import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardOrganization from "../../../../components/CardOrganization";

import {DEFAULT_IMG} from "../../../../appConfig";
import {connectFilters} from "../../connectors";
import {Request} from "../../../../utils/request";
import {buildSearchUrl} from "../../utils";
import "./index.scss";


const SearchList = ({string_filter, search_type, start_element, setFilters}) => {
    const [searchResult, setSearchResult] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const getSearchResults = async () => {
        await Request({
            url: buildSearchUrl(string_filter, search_type, start_element),
        }, data => {
            if(start_element === 1) {
                window.scrollTo(0,0);
            }

            let results = [];

            Object.keys(data).forEach(key => {
                if(data[key] && data[key].length) {
                    results = [...results, ...data[key].map(item => ({...item, search_type: key}))];
                }
            });

            if (results.length) {
                if (results.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setSearchResult(start_element === 1 ? results : [...searchResult, ...results]);
            } else {
                if(start_element === 1) setSearchResult([]);
                setHasMore(false);
            }
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    useEffect(() => {
        (() => getSearchResults())();
    }, [string_filter, search_type, start_element]);

    const getNextOrganizations = () => {
        setFilters({start_element: searchResult.length ? start_element + 10 : 1})
    };

    return (
        <div className="search-list">
            <InfiniteScroll
                dataLength={searchResult.length}
                next={getNextOrganizations}
                hasMore={hasMore}
                loader={<Loading centered={false} />}
                endMessage={
                    <div className="search-list__default-content">
                        <h3>{!searchResult.length ? 'Организаций не найдено' : 'Организаций больше нет'}</h3>
                        <img src={DEFAULT_IMG.noNews} alt={!searchResult.length ? 'Организаций не найдено' : 'Организаций больше нет'} />
                    </div>
                }
            >
                <ul className="search-list__content">
                    {searchResult.map(item => (
                        <li className="search-list__item" key={item.id}>
                            {item.search_type === 'organizations' &&
                                <CardOrganization {...item} />
                            }
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    )
};

export default connectFilters(React.memo(SearchList));