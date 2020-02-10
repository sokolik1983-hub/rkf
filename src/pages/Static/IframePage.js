import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import './styles.scss';

const IframePage = ({ src }) => {
    return <Layout>
        <Container className="content iframe-page">
            <iframe title="iframe" src={src} />
        </Container>
    </Layout>
};

export default React.memo(IframePage);