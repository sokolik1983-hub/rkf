import React from "react";
import { compose } from "redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import NurseriesSearch from "./components/Filters/components/Search";
import NurseriesList from "./components/NurseriesList";
import ClickGuard from "../../components/ClickGuard";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import { connectShowFilters } from "../../components/Layouts/connectors";
import './index.scss';


const Nurseries = ({ isOpenFilters, setShowFilters }) => (
    <Layout withFilters>
        <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
        <Container className="content nurseries-page">
            <Filters />
            <div className="nurseries-page__content">
                <NurseriesSearch />
                <NurseriesList />
            </div>
        </Container>
    </Layout>
);

const withReducer = injectReducer({ key: 'nurseriesFilters', reducer: reducer });

export default compose(withReducer)(connectShowFilters(React.memo(Nurseries)));