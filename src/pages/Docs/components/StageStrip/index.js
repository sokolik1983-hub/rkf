import React from "react";
import "./index.scss";

const StageStrip = ({items, active}) =>
<div className="stage-strip">
    {!!items && items.length && items.map((item, index) => <div style={{zIndex: items.length - index}} key={index} className={`stage-item ${active === index ? 'active' : ''}`}>
        <i className="stage-item__icon"><img src={`/static/icons/${item.icon}.svg`} alt={item.text}/></i>
        <span className="stage-item__text">{item.text}</span>
    </div>)}
</div>

export default React.memo(StageStrip);
