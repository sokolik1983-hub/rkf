import React, {memo, useMemo, useState} from 'react';
import SwipeTabs from '../../../../components/SwipeTabs';
import { Sorting } from "../../../../components/Sorting";

import './index.scss';

const PublicationFilter = ({changeTypeFilters, activeType, changeSortType}) => {

    const [isOpen, setIsOpen] = useState(false);

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
                <Sorting
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    pageName="publications"
                    setSortType={changeSortType}
                />
            </div>

            <SwipeTabs
                items={tabItems}
                activeTabIndex={tabItems.findIndex(item => item.activeType === activeType)}
                onChange={({activeType}) => changeTypeFilters(activeType)}
            />
        </div>
    );
}


export default memo(PublicationFilter);