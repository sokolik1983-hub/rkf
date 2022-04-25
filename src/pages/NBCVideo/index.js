import React from "react";
import Layout from "../../components/Layouts/Container";
import {NavLink, useParams} from "react-router-dom";

import "./styles.scss"

const NBCVideo = () => {

    const {alias} = useParams();

    return (
        <Layout className="pt-150">
                <p>Здесь будет страница с видео!</p>
                <NavLink to={`/nbc/${alias}`}>На страницу профиля</NavLink>
        </Layout>
    )
};

export default NBCVideo;