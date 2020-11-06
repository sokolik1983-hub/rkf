import React from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const NotActivatedFilter = ({not_activated, label, onChange}) => (
    <div className="is-not-activated-filter">
        <CustomCheckbox
            id="is-not-activated-filter"
            label={label}
            checked={!!not_activated}
            onChange={() => onChange(!not_activated)}
        />
    </div>
);

export default React.memo(NotActivatedFilter);