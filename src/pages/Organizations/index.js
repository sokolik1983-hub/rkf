import React, {useEffect, useState} from "react";
import ClickGuard from "../../components/ClickGuard";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import OrganizationsFilter from "./components/Filters/Organizations";
import SearchFilter from "./components/Filters/Search";
import OrganizationsList from "./components/List";
import {getFiltersFromUrl} from "./utils";
import {connectShowFilters} from "../../components/Layouts/connectors";
import "./index.scss";


const Organizations = ({history, isOpenFilters, setShowFilters}) => {
    const [filtersValue, setFiltersValue] = useState({...getFiltersFromUrl()});

    useEffect(() => {
        const unListen = history.listen(() => {
            if(history.location.pathname === '/organizations') {
                setFiltersValue(getFiltersFromUrl());
            }
        });

        return () => unListen();
    }, []);

    return (
        <Layout withFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            <div className="organizations-page__wrap">
                <Container className="content organizations-page">
                    <Filters {...filtersValue}/>
                    <div className="organizations-page__content">
                        <OrganizationsFilter organization_type={filtersValue.organization_type}/>
                        {filtersValue.organization_type !== 5 &&
                            <SearchFilter string_filter={filtersValue.string_filter}/>
                        }
                        <OrganizationsList {...filtersValue}/>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default connectShowFilters(React.memo(Organizations));