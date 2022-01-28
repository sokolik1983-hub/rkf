import React, { memo } from 'react';
import CustomCheckbox from '../../Form/CustomCheckbox';
import './style.scss'


const LikeFilter = ({is_popular, onChange}) => (
    <div className="like-filter">
        <h3>Сортировка</h3>
        <CustomCheckbox
            id="most-liked"
            label="По популярности"
            checked={!!is_popular}
            onChange={() => onChange(!is_popular)}
        />
    </div>
);

export default memo(LikeFilter);