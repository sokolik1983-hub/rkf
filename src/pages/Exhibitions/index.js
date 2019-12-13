import React from "react";
import { compose } from "redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./Filters";
import ExhibitionsSearch from "./Filters/components/Search";
import ExhibitionsList from "./ExhibitionsList";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import { connectShowFilters } from "../../components/Layouts/connectors";
import ClickGuard from 'components/ClickGuard';
import './index.scss';


const Exhibitions = ({ isOpenFilters, setShowFilters }) => {
    
    const handleClick = () => setShowFilters({ isOpenFilters: false });

    return <Layout withFilters>
        <ClickGuard value={isOpenFilters} callback={handleClick} />
        <Container className="content exhibitions-page">
            <Filters />
            <div className="exhibitions-page__content">
                <ExhibitionsSearch />
                <ExhibitionsList />
            </div>
        </Container>
    </Layout>
};

const withReducer = injectReducer({ key: 'filters', reducer: reducer });

export default compose(withReducer)(connectShowFilters(React.memo(Exhibitions)));