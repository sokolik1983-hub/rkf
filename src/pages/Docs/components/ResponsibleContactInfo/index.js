import React, { useState } from "react";
import HideIf from "components/HideIf";
import Button from "components/Button";

const ResponsibleContactInfo = props => {
    const [cond, setCond] = useState(true);
    return <div>
        <Button className="btn-primary" onClick={_ => setCond(!cond)}>Контактная информация</Button>
        <HideIf cond={cond}>
            {props.children}
        </HideIf>
    </div>;
}

export default React.memo(ResponsibleContactInfo);
