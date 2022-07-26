import React, {memo} from "react";
import ClubsMap from "../../components/ClubsMap";
import Layout from "../../components/Layouts";
import {connectShowFilters} from "../../components/Layouts/connectors";
import ClickGuard from "../../components/ClickGuard";

const MapPage = ({ location, setShowFilters, isOpenFilters }) => {
    const { hash } = location;
    if (hash === '#iframe') {
        return <ClubsMap fullScreen />
    } else {
        return <Layout layoutWithFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})} />
            <ClubsMap fullScreen />
        </Layout>
    };
};

export default connectShowFilters(memo(MapPage));