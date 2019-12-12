import React from "react";
import {compose} from "redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./Filters";
import ExhibitionsSearch from "./Filters/components/Search";
import ExhibitionsList from "./ExhibitionsList";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import './index.scss';


const Exhibitions = () => (
    <Layout withFilters>
        <Container className="content exhibitions-page">
            <Filters/>
            <div className="exhibitions-page__content">
                <ExhibitionsSearch/>
                <ExhibitionsList/>
            </div>
        </Container>
    </Layout>
);

const withReducer = injectReducer({key: 'filters', reducer: reducer});

export default compose(withReducer)(React.memo(Exhibitions));