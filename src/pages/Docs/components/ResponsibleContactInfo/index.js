import React, { useState } from "react";
import HideIf from "components/HideIf";
import './index.scss';

const ResponsibleContactInfo = props => {
    const [cond, setCond] = useState(true);
    return <div>
        <div className="ResponsibleContactInfo" onClick={_ => setCond(!cond)}>
            <h4>
                <span>Контактная информация</span>
                <img className={`DocItem__chevron ${!cond && 'active'}`} src="/static/icons/chevron_left.svg" alt=""/>
            </h4>
        </div>
        <HideIf cond={cond}>
            {props.children}
        </HideIf>
    </div>;
}

export default React.memo(ResponsibleContactInfo);
