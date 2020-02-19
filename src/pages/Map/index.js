import React from "react";
import ClubsMap from "../../components/ClubsMap";
import Layout from "../../components/Layouts";


const MapPage = () => (
    <Layout>
        <ClubsMap/>
    </Layout>
);

export default React.memo(MapPage);