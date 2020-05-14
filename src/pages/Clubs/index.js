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
                    <a className="Disclaimer__support-link" href="https://help.rkf.online/ru/knowledge_base/art/35/cat/3/#/" target="_blank" rel="noopener noreferrer">
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