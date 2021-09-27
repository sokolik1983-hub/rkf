import React from "react";
import Card from "../Card";
import {formatText} from "../../utils";
import "./index.scss";


const AboutComponent = ({description}) => (
    <Card className="about-component">
        <h4>Описание</h4>
        <p dangerouslySetInnerHTML={{__html: formatText(description)}} />
    </Card>
);

export default React.memo(AboutComponent);