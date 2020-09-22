import React from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const ActiveFilter = ({active_member, onChange}) => (
    <div className="is-active-member-filter">
        <CustomCheckbox
            id="is-active-member-filter"
            label="Активный пользователь RKF.Online"
            checked={!!active_member}
            onChange={() => onChange(!active_member)}
        />
    </div>
);

export default React.memo(ActiveFilter);