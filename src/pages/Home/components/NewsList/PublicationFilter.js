import React, {memo, useMemo} from "react";
import SwipeTabs from "../../../../components/SwipeTabs";
import "./index.scss";

const PublicationFilter = ({changeTypeFilters, activeType}) => {
    const tabItems = useMemo(() => {
        return [
            {title: 'Все', activeType: 'all' },
            {title: 'Новости', activeType: 'news'},
            {title: 'Куплю/Продам', activeType: 'advert'},
            {title: 'Объявления', activeType: 'articles'}
        ];
    }, []);

    return (
            <div className="publicFilter__wrap">
                <h3>Публикации</h3>
                <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.activeType === activeType)}
                    onChange={({activeType}) => changeTypeFilters(activeType)}
                />
            </div>
    );
}


export default memo(PublicationFilter);