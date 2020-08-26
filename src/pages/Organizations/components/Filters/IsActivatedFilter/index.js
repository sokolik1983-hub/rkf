import React from "react";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const IsActivatedFilter = ({activated, organization_type}) => (
    <div className="is-activated-filter">
        <CustomCheckbox
            id="is-activated-filter"
            label={`Активированные ${organization_type === 3 ? 'клубы' : 'питомники'}`}
            checked={!!activated}
            onChange={() => setFiltersToUrl({activated: !activated})}
        />
    </div>
);

export default React.memo(IsActivatedFilter);