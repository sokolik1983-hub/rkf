import React from "react";
import CustomCheckbox from "components/Form/CustomCheckbox";
import {connectFilters} from "../../../../connectors";
import "./index.scss";


const IsActiveMember = ({active_member, setFilters}) => (
    <div className="is-active-member-filter">
        <CustomCheckbox
            id="is-active-member-filter"
            label="Активный пользователь RKF.Online"
            checked={!!active_member}
            onChange={() => setFilters({active_member: !active_member ? !active_member : false, page: 1})}
        />
    </div>
);

export default connectFilters(React.memo(IsActiveMember));