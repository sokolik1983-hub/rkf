import React, {Children} from "react";

const deepInitial = children => Children.map(children, x => console.log(x))

export default deepInitial;
