import React, {memo} from "react";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const ActiveUserFilter = ({active_rkf_user, onChange}) => (
    <div className="active-user-filter">
        <CustomCheckbox
            id="active-user-filter"
            label="Активный пользователь RKF.Online"
            checked={!!active_rkf_user}
            onChange={() => onChange(!active_rkf_user)}
        />
    </div>
);

export default memo(ActiveUserFilter);