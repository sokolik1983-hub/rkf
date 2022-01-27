import React, { memo, useState } from 'react';
import CustomCheckbox from '../../../../components/Form/CustomCheckbox';


const LikeFilter = ({changeIsPopular}) => {
    const [mostLiked, setMostLiked] = useState(false);

    const handleClick = () => {
        setMostLiked(!mostLiked);
        changeIsPopular(!mostLiked);
    };

    return (
        <div className="like-filter">
            <h3>Сортировка</h3>
            <CustomCheckbox
                id="most-liked"
                label="По популярности"
                checked={!!mostLiked}
                onChange={handleClick}
            />
        </div>
    );
};

export default memo(LikeFilter);