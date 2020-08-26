import React from "react";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const IsActiveMember = ({active_member}) => (
    <div className="is-active-member-filter">
        <CustomCheckbox
            id="is-active-member-filter"
            label="Активный пользователь RKF.Online"
            checked={!!active_member}
            onChange={() => setFiltersToUrl({active_member: !active_member})}
        />
    </div>
);

export default React.memo(IsActiveMember);