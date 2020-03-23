import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import "./index.scss";

const PageNotFound = () => (
    <Layout>
        <Container className="content not-found-page">
            <h1>404</h1>
            <h2>Страница не найдена</h2>
        </Container>
    </Layout>
);

export default React.memo(PageNotFound);