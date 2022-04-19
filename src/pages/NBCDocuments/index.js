import React from "react";
import {NavLink, useParams} from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Layout from "../../components/Layouts";

import "./styles.scss"

const NBCDocuments = () => {

    const {id} = useParams();

    return (
        <Layout >
            <Container className="pt-150">
                <p>Здесь будет страница документов</p>
                <NavLink to={`/nbc/${id}`}>На страницу профиля</NavLink>
            </Container>
        </Layout>
    );
};

export default NBCDocuments;