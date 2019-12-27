import React from "react";
import {SlideDown} from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

const SlideDownComponent = ({open, children}) => (
    <SlideDown className="slide-down">
        {open ? children : null}
    </SlideDown>
);

export default React.memo(SlideDownComponent);