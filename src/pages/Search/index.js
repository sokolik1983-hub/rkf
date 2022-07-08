import React, {memo, useEffect, useState} from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import ClickGuard from "../../components/ClickGuard";
import Filters from "./components/Filters";
import SearchList from "./components/List";
import {connectShowFilters} from "../../components/Layouts/connectors";
import {buildSearchUrl, getFiltersFromUrl} from "./utils";
import {defaultFilters} from "./config";
import {Request} from "../../utils/request";
import SearchFilter from "../../components/Filters/SearchFilter/index"
import "./index.scss";


const SearchPage = ({history, isOpenFilters, setShowFilters}) => {
    const [filtersValue, setFiltersValue] = useState({...getFiltersFromUrl()});
    const [searchResult, setSearchResult] = useState([]);
    const [filters, setFilters] = useState([...defaultFilters]);
    const [additionalFilters, setAdditionalFilters] = useState({});
    const [needCount, setNeedCount] = useState(true);
    const [needFilter, setNeedFilter] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [startElement, setStartElement] = useState(1);
    const [searchTabActiveName, setSearchTabActiveName] = useState(null);
    const [isMenuChanges, setIsMenuChanges] = useState(false);

    useEffect(() => {
        if (filtersValue.search_type !== 8) {
            filters.forEach(filter => {
                if (filter.items[0].search_type.toString()[0] === filtersValue.search_type.toString()[0]) setSearchTabActiveName(filter.name);
            });
        } else {
            filters.sort((a, b) => b.count - a.count);
            setSearchTabActiveName(filters[0].name)
        }

        setIsMenuChanges(false);
    }, [filters])

    useEffect(() => {
        setIsMenuChanges(false);
    }, [searchTabActiveName]);

    useEffect(() => {
        const unListen = history.listen(() => {
            const newFiltersValue = getFiltersFromUrl();

            if(filtersValue.string_filter !== newFiltersValue.string_filter) setNeedCount(true);
            if(filtersValue.search_type !== newFiltersValue.search_type) setNeedFilter(true);

            setFiltersValue(newFiltersValue);
        });

        return () => unListen();
    }, [filtersValue.string_filter, filtersValue.search_type]);

    const getSearchResults = async startElem => {
        await Request({
            url: buildSearchUrl(filtersValue, startElem, needCount, needFilter)
        }, data => {
            let newFilters = [...filters];

            if(data.counts && data.counts.length) {
                newFilters.map(category => {
                    let summaryCount = 0;

                    category.items.map(item => {
                        const count = data.counts.find(i => i.type_id === item.search_type);

                        if(count) {
                            item.count = count.count;
                            summaryCount += count.count;
                        }

                        return item;
                    });

                    category.count = summaryCount;

                    return category;
                });
                setNeedCount(true);
            }

            if(data.filter) {
                if(data.filter.federations) {
                    data.filter.federations = data.filter.federations.map(({value, label}) => ({id: value, short_name: label}));
                }

                setAdditionalFilters(data.filter);
                setNeedFilter(false);
            }

            setFilters(newFilters.sort((a, b) => b.count - a.count));

            let results = [];

            Object.keys(data).forEach(key => {
                if(data[key]?.result && data[key]?.result.length && key !== 'counts') {
                    results = [...results, ...data[key].result.map(item => ({...item}))];
                }
            });

            if (results.length) {
                if (results.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setSearchResult(startElem === 1 ? results : [...searchResult, ...results]);
            } else {
                if(startElem === 1) setSearchResult([]);
                setHasMore(false);
            }
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setSearchResult([]);
            setHasMore(false);
        });
    };

    useEffect(() => {
        setSearchResult([]);
        if(filtersValue.string_filter && filtersValue.search_type) {
            (() => getSearchResults(1))();
        } else {
            setSearchResult([]);
            setHasMore(false);
            clearFilterCounts();
        }

        setStartElement(1);
    }, [filtersValue]);

    const getNextResults = () => {
        if (searchResult.length) {
            (() => getSearchResults(startElement + 10))();
            setStartElement(startElement + 10);
        }
    };

    const handleActiveTypeChange = (tabActiveName) => {
        setSearchResult([]);
        setSearchTabActiveName(tabActiveName);
        setIsMenuChanges(true);
    };

    const clearFilterCounts = () => {
        const clearedFilters = filters.map(filter => {
            filter.count = 0;
            filter.items.map(item => {
                item.count = 0;
                return item;
            })
            return filter;
        });

        setFilters(clearedFilters);
    };

    return (
        <Layout layoutWithFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
            <div className="search-page__wrap">
                <Container className="search-page content">
                    <Filters
                        filtersValue={filtersValue}
                        filters={filters}
                        additionalFilters={additionalFilters}
                        isOpenFilters={isOpenFilters}
                    />

                    <div className="search-page__content">
                        <SearchFilter
                            filters={filters}
                            filtersValue={filtersValue}
                            filtersSearchType={filtersValue.search_type}
                            searchTabActiveName={searchTabActiveName}
                            handleActiveTypeChange={handleActiveTypeChange}
                            isMenuChanges={isMenuChanges}
                        />
                        <SearchList
                            filtersSearchType={filtersValue.search_type}
                            searchResult={searchResult}
                            hasMore={hasMore}
                            getNextResults={getNextResults}
                        />
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default connectShowFilters(memo(SearchPage));