import React, {memo} from "react";
import NBCLayout from "../../components/Layouts/NBCLayout";
import Content from "./Content";
import "./index.scss"


const NBCPage = props => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default memo(NBCPage);