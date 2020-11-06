import React from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const ActiveUserFilter = ({active_rkf_user, onChange}) => (
    <div className="active-user-filter">
        <CustomCheckbox
            id="active-user-filter"
            label="Активный пользователь rkf.online"
            checked={!!active_rkf_user}
            onChange={() => onChange(!active_rkf_user)}
        />
    </div>
);

export default React.memo(ActiveUserFilter);