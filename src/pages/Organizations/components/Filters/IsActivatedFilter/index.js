import React from "react";
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const IsActivatedFilter = ({filtersValue}) => (
    <div className="is-activated-filter">
        <CustomCheckbox
            id="is-activated-filter"
            label={`Активированные ${filtersValue.organization_type === 3 ? 'клубы' : 'питомники'}`}
            checked={!!filtersValue.activated}
            onChange={() => setFiltersToUrl({...filtersValue, activated: !filtersValue.activated})}
        />
    </div>
);

export default React.memo(IsActivatedFilter);