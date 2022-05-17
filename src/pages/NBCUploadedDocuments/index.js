import React from "react";
import {NavLink, useParams} from "react-router-dom";
import Container from "../../components/Layouts/Container";
import NBCLayout from "../../components/Layouts/NBCLayout";

import "./styles.scss"
import {connectAuthVisible} from "../Login/connectors";


const Content = () => {
    return (
        <p>1111111111111111111111111111</p>
    )
}


const NBCUploadedDocuments = (props) => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default React.memo(NBCUploadedDocuments);