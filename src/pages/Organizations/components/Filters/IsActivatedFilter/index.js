import React from "react";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {connectFilters} from "../../../connectors";
import "./index.scss";


const IsActivatedFilter = ({organization_type, activated, setFilters}) => (
    <div className="is-activated-filter">
        <CustomCheckbox
            id="is-activated-filter"
            label={`Активированные ${organization_type === 3 ? 'клубы' : 'питомники'}`}
            checked={!!activated}
            onChange={() => setFilters({activated: !activated})}
        />
    </div>
);

export default connectFilters(React.memo(IsActivatedFilter));