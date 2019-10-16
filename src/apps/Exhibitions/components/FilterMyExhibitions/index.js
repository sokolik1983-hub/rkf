import React, {useContext, useEffect} from 'react';
import {connectClubId} from "../../connectors";
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context';
import CustomCheckbox from 'components/Form/CustomCheckbox';

const MyExhibitionsFilter = ({club_id}) => {
    const {changeClubsFilter, filter, setFilters} = useContext(ExhibitionsFilterContext);
    const {clubs} = filter;

    useEffect(() => {
        return () => {
            setFilters({...filter, clubs: []});
        }
    }, []);

    const handleChange = (e) => {
        if(e.target.checked) {
            changeClubsFilter([club_id]);
        } else {
            changeClubsFilter([]);
        }
    };

    return (
        <CustomCheckbox id="my-exhibitions-filter"
                        label="Мои выставки"
                        checked={clubs.length}
                        onChange={handleChange}
        />
    )
};

export default connectClubId(MyExhibitionsFilter);