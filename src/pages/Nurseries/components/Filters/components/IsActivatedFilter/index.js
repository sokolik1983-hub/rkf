import React from "react";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {connectFilters} from "../../../../connectors";
import "./index.scss";


const IsActivatedFilter = ({is_activated, setFilters}) => (
    <div className="is-activated-filter">
        <CustomCheckbox
            id="is-activated-filter"
            label="Активированные питомники"
            checked={!!is_activated}
            onChange={() => setFilters({is_activated: !is_activated ? !is_activated : null, page: 1})}
        />
    </div>
);

export default connectFilters(React.memo(IsActivatedFilter));