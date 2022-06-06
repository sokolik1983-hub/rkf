import React from "react";
import { connectAuthVisible } from "../Login/connectors";
import NBCLayout from "../../components/Layouts/NBCLayout";
import Content from "./Content";

import "./index.scss";

const NBCGallery = (props) => {
    return (
        <NBCLayout {...props}>
            <Content />
        </NBCLayout>
    )
};

export default connectAuthVisible(React.memo(NBCGallery));