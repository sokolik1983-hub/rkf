import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";

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

            console.log('data', data);

            let results = [];

            Object.keys(data).forEach(key => {
                if(data[key] && data[key].length) {
                    results = [...results, ...data[key].map(item => ({...item, search_type: key}))];
                }
            });

            console.log('results', results);

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
            {/*<InfiniteScroll
                dataLength={searchResult.length}
                next={getNextOrganizations}
                hasMore={hasMore}
                loader={<Loading centered={false} />}
                endMessage={
                    <div className="organizations-page__list-content">
                        <h3>{!org.length ? 'Организаций не найдено' : 'Организаций больше нет'}</h3>
                        <img src={DEFAULT_IMG.noNews} alt={!org.length ? 'Организаций не найдено' : 'Организаций больше нет'} />
                    </div>
                }
            >
                <ul className="organizations-page__list organization-list">
                    {org.map(item => (
                        <li className="organization-list__item" key={item.id}>
                            <ListItem
                                {...item}
                            />
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>*/}
        </div>
    )
};

export default connectFilters(React.memo(SearchList));