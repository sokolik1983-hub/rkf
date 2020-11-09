import React from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const FederationChoiceFilter = ({active_member, onChange}) => (
    <div className="federation-choice-filter">
        <CustomCheckbox
            id="federation-choice-filter"
            label="Выбор федерации"
            checked={!!active_member}
            onChange={() => onChange(!active_member)}
        />
    </div>
);

export default React.memo(FederationChoiceFilter);