import React from "react";
import ClubsMap from "../../components/ClubsMap";
import Layout from "../../components/Layouts";

const MapPage = ({ location }) => {
    const { hash } = location;
    if (hash === '#iframe') {
        return <ClubsMap />
    } else {
        return <Layout>
            <ClubsMap />
        </Layout>
    };
};

export default React.memo(MapPage);