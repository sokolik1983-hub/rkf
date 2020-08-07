import React from "react";
import {compose} from "redux";
import ClickGuard from "../../components/ClickGuard";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import OrganizationsFilter from "./components/Filters/Organizations";
import SearchFilter from "./components/Filters/Search";
import OrganizationsList from "./components/List";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import {connectShowFilters} from "../../components/Layouts/connectors";
import {connectFilters} from "./connectors";
import "./index.scss";


const Organizations = ({organization_type, isOpenFilters, setShowFilters}) => (
    <Layout withFilters>
        <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
        <div className="organizations-page__wrap">
            <Container className="content organizations-page">
                <Filters/>
                <div className="organizations-page__content">
                    <OrganizationsFilter/>
                    {organization_type !== 5 &&
                        <SearchFilter/>
                    }
                    <OrganizationsList/>
                </div>
            </Container>
        </div>
    </Layout>
);

const withReducer = injectReducer({key: 'organizationsFilters', reducer: reducer});

export default compose(withReducer, connectFilters, connectShowFilters)(React.memo(Organizations));