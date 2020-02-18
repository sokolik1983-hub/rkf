import React from "react";
import {compose} from "redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ClubsSearch from "./components/Filters/components/Search";
import ClubsList from "./components/ClubsList";
import ClickGuard from "../../components/ClickGuard";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import {connectShowFilters} from "../../components/Layouts/connectors";
import {mainClub} from "../../appConfig";
import './index.scss';
import MenuComponent from "../../components/MenuComponent";


const Clubs = ({isOpenFilters, setShowFilters}) => (
    <Layout withFilters>
        <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})} />
        <Container className="content clubs-page">
            {/* <aside className="federation-page__left">
                <MenuComponent 
                    alias="clubs" 
                    name={mainClub.name}
                    btnName={mainClub.btnName}
                    btnHref={mainClub.btnHref}
                    items={mainClub.children}>
                </MenuComponent>
            </aside> */}
            <Filters />
            <div className="clubs-page__content">
                <ClubsSearch />
                <ClubsList />
            </div>
        </Container>
    </Layout>
);

const withReducer = injectReducer({ key: 'clubsFilters', reducer: reducer });

export default compose(withReducer)(connectShowFilters(React.memo(Clubs)));