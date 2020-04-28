import React from "react";
import { compose } from "redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ClubsSearch from "./components/Filters/components/Search";
import ClubsList from "./components/ClubsList";
import Disclaimer from "components/Disclaimer";
import ClickGuard from "../../components/ClickGuard";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import { connectShowFilters } from "../../components/Layouts/connectors";
import './index.scss';

const Clubs = ({ isOpenFilters, setShowFilters }) => (
    <Layout withFilters>
        <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
        <Container className="content clubs-page">
            <Filters />
            <div className="clubs-page__content">
                <Disclaimer>
                    <a className="Disclaimer__support-link" href="http://support.rkf.online/%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8e-%d1%80%d0%b5%d0%b5%d1%81%d1%82%d1%80%d0%b0/" target="_blank" rel="noopener noreferrer">
                        Инструкция по реестру клубов
                    </a>
                </Disclaimer>
                <ClubsSearch />
                <ClubsList />
            </div>
        </Container>
    </Layout>
);

const withReducer = injectReducer({ key: 'clubsFilters', reducer: reducer });

export default compose(withReducer)(connectShowFilters(React.memo(Clubs)));