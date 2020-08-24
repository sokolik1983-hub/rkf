import React, {useEffect, useState} from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import ClickGuard from "../../components/ClickGuard";
import Filters from "./components/Filters";
import SearchList from "./components/List";
import {connectShowFilters} from "../../components/Layouts/connectors";
import {getFiltersFromUrl} from "./utils";
import "./index.scss";


const SearchPage = ({history, isOpenFilters, setShowFilters}) => {
    const [filtersValue, setFiltersValue] = useState({...getFiltersFromUrl()});

    useEffect(() => {
        const unListen = history.listen(() => {
            setFiltersValue(getFiltersFromUrl());
        });

        return () => unListen();
    }, []);

    return (
        <Layout withFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
            <div className="search-page__wrap">
                <Container className="search-page content">
                    <Filters filtersValue={filtersValue}/>
                    <div className="search-page__content">
                        <SearchList {...filtersValue}/>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default connectShowFilters(React.memo(SearchPage));