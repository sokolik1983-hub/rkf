import React from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const ActivatedFilter = ({activated, label, onChange}) => (
    <div className="is-activated-filter">
        <CustomCheckbox
            id="is-activated-filter"
            label={label}
            checked={!!activated}
            onChange={() => onChange(!activated)}
        />
    </div>
);

export default React.memo(ActivatedFilter);