import React from "react";
import {compose} from "redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import ClickGuard from "../../components/ClickGuard";
import Filters from "./components/Filters";
import SearchList from "./components/List";
import {connectShowFilters} from "../../components/Layouts/connectors";
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import "./index.scss";


const SearchPage = ({history, isOpenFilters, setShowFilters}) => (
    <Layout withFilters>
        <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
        <div className="search-page__wrap">
            <Container className="search-page content">
                <Filters/>
                <div className="search-page__content">
                    <SearchList history={history}/>
                </div>
            </Container>
        </div>
    </Layout>
);

const withReducer = injectReducer({key: 'globalSearchFilters', reducer: reducer});

export default compose(withReducer, connectShowFilters)(React.memo(SearchPage));