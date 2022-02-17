import React, {memo, useMemo, useState} from "react";
import SwipeTabs from "../../../../components/SwipeTabs";
import CustomCheckbox from '../../../../components/Form/CustomCheckbox';

import "./index.scss";

const PublicationFilter = ({changeTypeFilters, activeType, changeIsPopular}) => {

    const [needFilter, setNeedFilter] = useState(false);


    const handleClick = () => {
        setNeedFilter(!needFilter);
        changeIsPopular(!needFilter);
    };

    const tabItems = useMemo(() => {
        return [
            {title: 'Все', activeType: 'all'},
            {title: 'Новости', activeType: 'news'},
            {title: 'Куплю/Продам', activeType: 'advert'},
            {title: 'Объявления', activeType: 'articles'}
        ];
    }, []);

    return (
        <div className="publicFilter__wrap">
            <div className="publicFilter__header">
                <h3>Публикации</h3>
                <CustomCheckbox
                    id="need-filter"
                    label="Сортировка"
                    checked={!!needFilter}
                    onChange={handleClick}
                />
            </div>

            {!needFilter ? <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.activeType === activeType)}
                    onChange={({activeType}) => changeTypeFilters(activeType)}
                /> :
                <CustomCheckbox
                    id="most-liked"
                    label="По популярности"
                    checked={!!needFilter}
                    onChange={handleClick}
                    cName="like-filter"
                />
            }
        </div>
    );
}


export default memo(PublicationFilter);