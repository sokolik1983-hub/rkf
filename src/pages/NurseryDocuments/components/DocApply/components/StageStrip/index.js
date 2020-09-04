import React from "react";
import "./index.scss";

import {ReactComponent as Stage1} from "./stage1.svg"
import {ReactComponent as Stage2} from "./stage2.svg"
import {ReactComponent as Stage3} from "./stage3.svg"
import {ReactComponent as Passed} from "./passed.svg"

const stages = [Stage1, Stage2, Stage3]

const StageStrip = ({items, active}) =>
<div className="stage-strip">
    <div className="bar"
        style={{
            left: items ? `${Math.floor(50 / items.length)}%` : '100%',
            width: items ? `${Math.floor(100 - 100 / items.length)}%` : '0'
        }}
    ></div>
    <div className="blue bar"
        style={{
            width: items ? `${Math.floor(active * 100 / items.length)}%` : '0'
        }}
    ></div>
    {!!items && items.length && items.map((item, index) => { const Stage = index < active ? Passed : stages[index]; return <div 
    style={{zIndex: 1}} 
    key={index} className={`stage-item ${active === index ? '_active' : ''}`}>
        <i className="stage-item__icon"><Stage/></i>
        <span className="stage-item__text">{item.text}</span>
    </div>})}
</div>

export default React.memo(StageStrip);
