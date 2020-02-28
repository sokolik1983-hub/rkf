import React from "react";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import {getClubId, setFiltersToUrl} from "../../../../utils";


const MyExhibitionsFilter = ({ClubIds}) => {
    const clubId = getClubId(); //берёт profile_id из localStorage

    const handleChange = (e) => {
        if(e.target.checked) {
            setFiltersToUrl({ClubIds: clubId, PageNumber: 1});
        } else {
            setFiltersToUrl({ClubIds: null, PageNumber: 1});
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

export default React.memo(MyExhibitionsFilter);