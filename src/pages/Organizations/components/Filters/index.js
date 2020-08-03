import React from "react";
import StickyBox from "react-sticky-box";
import Aside from "../../../../components/Layouts/Aside";
import {connectFilters} from "../../connectors";
import "./index.scss";


const Filters = ({organization}) => (
    <Aside className="organizations-page__left">
        <StickyBox offsetTop={66}>

        </StickyBox>
    </Aside>
);

export default connectFilters(React.memo(Filters));