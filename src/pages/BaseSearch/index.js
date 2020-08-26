import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from '../Club/components/CheckStatus';

import "./style.scss";


const BaseSearch = () => {

    return (
        <Layout>
            <Container className="content">
                <CheckStatus />
            </Container>
        </Layout>
    )
};

export default React.memo(BaseSearch);