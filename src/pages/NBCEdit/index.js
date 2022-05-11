import React, {useEffect, useState} from "react";
import {NavLink, Redirect, useParams} from "react-router-dom";
import Container from "../../components/Layouts/Container";
import NBCLayout from "../../components/Layouts/NBCLayout";
import AuthOrLogin from "../Login/components/AuthOrLogin";

import "./styles.scss"

const Content = () => {

    const {alias} = useParams();

    console.log('alias', alias)

    return (
        <AuthOrLogin>
            <Container>
                <p>Здесь будет страница редактирования профиля НКП</p>
                <NavLink to={`/nbc/${alias}`}>На страницу профиля</NavLink>
            </Container>
        </AuthOrLogin>
    );
};

const NBCEdit = (props) => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default NBCEdit;