import React from "react";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const IsActiveMember = ({filtersValue}) => (
    <div className="is-active-member-filter">
        <CustomCheckbox
            id="is-active-member-filter"
            label="Активный пользователь RKF.Online"
            checked={!!filtersValue.active_member}
            onChange={() => setFiltersToUrl({...filtersValue, active_member: !filtersValue.active_member})}
        />
    </div>
);

export default React.memo(IsActiveMember);