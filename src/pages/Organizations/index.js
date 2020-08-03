import React from "react";
import {compose} from "redux";
import ClickGuard from "../../components/ClickGuard";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import OrganizationsFilter from "./components/Filters/Organizations";
import OrganizationsList from "./components/List";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import {connectShowFilters} from "../../components/Layouts/connectors";
import "./index.scss";


const Organizations = ({isOpenFilters, setShowFilters}) => (
    <Layout withFilters>
        <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})} />
        <Container className="content organizations-page">
            <Filters/>
            <div className="organizations-page__content">
                <OrganizationsFilter/>
                <OrganizationsList/>
            </div>
        </Container>
    </Layout>
);

const withReducer = injectReducer({key: 'organizationsFilters', reducer: reducer});

export default compose(withReducer, connectShowFilters)(React.memo(Organizations));