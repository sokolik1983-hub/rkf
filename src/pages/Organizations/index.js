import React, {memo, useEffect, useRef, useState} from "react";
import ClickGuard from "../../components/ClickGuard";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import OrganizationsFilter from "./components/Filters/Organizations";
import OrganizationsList from "./components/List";
import {getFiltersFromUrl} from "./utils";
import {connectShowFilters} from "../../components/Layouts/connectors";
import "./index.scss";


const Organizations = ({history, isOpenFilters, setShowFilters}) => {
    const [filtersValue, setFiltersValue] = useState({...getFiltersFromUrl()});

    const scrollRef = useRef();

    useEffect(() => {
        const unListen = history.listen(() => {
            if(history.location.pathname === '/organizations') {
                setFiltersValue(getFiltersFromUrl());
            }
        });

        return () => unListen();
    }, []);

    return (
        <Layout layoutWithFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            <div className="organizations-page__wrap" ref={scrollRef}>
                <Container className="content organizations-page">
                    <Filters filtersValue={filtersValue} {...filtersValue} isOpenFilters={isOpenFilters} scrollRef={scrollRef}/>
                    <div className="organizations-page__content">
                        <OrganizationsFilter organization_type={filtersValue.organization_type}/>
                        <OrganizationsList {...filtersValue}/>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default connectShowFilters(memo(Organizations));