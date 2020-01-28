import React from 'react';
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import {getClubId} from "../../../utils";
import {connectFilters} from "../../../connectors";

const MyExhibitionsFilter = ({ClubIds, setFiltersSuccess}) => {
    const clubId = getClubId(); //берёт profile_id из localStorage

    const handleChange = (e) => {
        if(e.target.checked) {
            setFiltersSuccess({ClubIds: clubId, PageNumber: 1});
        } else {
            setFiltersSuccess({ClubIds: null, PageNumber: 1});
        }
    };

    return (
        <CustomCheckbox
            id="my-exhibitions-filter"
            label="Мои выставки"
            checked={!!ClubIds}
            onChange={handleChange}
        />
    )
};

export default connectFilters(React.memo(MyExhibitionsFilter));