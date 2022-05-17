import React from "react";
import NBCLayout from "../../components/Layouts/NBCLayout";
import Content from "./Content"

import "./styles.scss"

const NBCEdit = (props) => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default NBCEdit;