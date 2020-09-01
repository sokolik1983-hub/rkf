import React, {useEffect, useState} from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import ClickGuard from "../../components/ClickGuard";
import Filters from "./components/Filters";
import SearchList from "./components/List";
import {connectShowFilters} from "../../components/Layouts/connectors";
import {buildSearchUrl, getFiltersFromUrl} from "./utils";
import {defaultFilters} from "./config";
import {Request} from "../../utils/request";
import "./index.scss";


const SearchPage = ({history, isOpenFilters, setShowFilters}) => {
    const [filtersValue, setFiltersValue] = useState({...getFiltersFromUrl()});
    const [searchResult, setSearchResult] = useState([]);
    const [filters, setFilters] = useState([...defaultFilters]);
    const [needCount, setNeedCount] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [startElement, setStartElement] = useState(1);

    useEffect(() => {
        const unListen = history.listen(() => {
            const newFiltersValue = getFiltersFromUrl();

            console.log(filtersValue.string_filter, newFiltersValue.string_filter, filtersValue.string_filter !== newFiltersValue.string_filter);
            if(filtersValue.string_filter !== newFiltersValue.string_filter) {
                setNeedCount(true);
            }

            setFiltersValue(newFiltersValue);
        });

        return () => unListen();
    }, [filtersValue.string_filter]);

    console.log('needCount outer', needCount);

    const getSearchResults = async startElem => {
        console.log('needCount request', needCount);
        await Request({
            url: buildSearchUrl(filtersValue.string_filter, filtersValue.search_type, startElem, needCount)
        }, data => {
            if(startElem === 1) {
                window.scrollTo(0,0);
            }

            let newFilters = [...filters];

            if(data.counts && data.counts.length) {
                newFilters.map(category => {
                    category.items.map(item => {
                        const count = data.counts.find(i => i.type_id === item.search_type);

                        if(count) item.count = count.count;

                        return item;
                    });

                    return category;
                });
                setNeedCount(false);
            }

            setFilters(newFilters);

            let results = [];

            Object.keys(data).forEach(key => {
                if(data[key] && data[key].length && key !== 'counts') {
                    results = [...results, ...data[key].map(item => ({...item, search_type: key}))];
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
        if(filtersValue.string_filter && filtersValue.search_type) {
            console.log('needCount inner', needCount);
            (() => getSearchResults(1))();
        } else {
            setSearchResult([]);
            setHasMore(false);
        }
        setStartElement(1);
    }, [filtersValue.string_filter, filtersValue.search_type]);

    const getNextExhibitions = () => {
        if (searchResult.length) {
            (() => getSearchResults(startElement + 10))();
            setStartElement(startElement + 10);
        }
    };

    return (
        <Layout withFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
            <div className="search-page__wrap">
                <Container className="search-page content">
                    <Filters filtersValue={filtersValue} filters={filters}/>
                    <div className="search-page__content">
                        <SearchList
                            searchResult={searchResult}
                            hasMore={hasMore}
                            getNextExhibitions={getNextExhibitions}
                        />
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default connectShowFilters(React.memo(SearchPage));