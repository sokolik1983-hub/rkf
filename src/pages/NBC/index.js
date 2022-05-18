import React from "react";
import NBCLayout from "../../components/Layouts/NBCLayout";
import Content from "./Content";
import Layout from "../../components/Layouts";

import "./index.scss"

const NBCPage = (props) => {
    return (
            <NBCLayout {...props}>
                <Content />
            </NBCLayout>
    )
};

export default React.memo(NBCPage);