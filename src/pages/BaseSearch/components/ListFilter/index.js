import React, {useMemo} from "react";
import SwipeTabs from "../../../../components/SwipeTabs";
import "./index.scss";


const ListFilter = ({cardClicked, setCardClicked, isAuth}) => {
    const tabItems = useMemo(() => {
        let items = [
            {title: 'Глобальный поиск', card_number: 8, to: 'global-search-anchor', offset: -190},
            {title: 'Информация о найденных собаках', card_number: 1, to: 'found-info-anchor', offset: -190},
            {title: 'Статус документов', card_number: 2, to: 'check-status-anchor', offset: -190},
            {title: 'Регистрационные данные собаки', card_number: 3, to: 'check-registration-anchor', offset: -190},
            {title: 'Поиск клуба/питомника по клейму', card_number: 4, to: 'stamp-search-anchor', offset: -190}
        ];

        if(isAuth) {
            items.push({title: 'Информация о помётах', card_number: 5, to: 'check-status__letter', offset: -190});
        }

        items = [
            ...items,
            // {title: 'Поиск судьи', card_number: 6, to: 'referee-search-anchor', offset: -190},
            {title: 'Поиск по объявлениям', card_number: 7, to: 'publication-search-anchor', offset: -190}
        ];

        return items;
    }, [isAuth]);

    return (
        <div className="search-page__list-filter">
            <h4 className="list-filter__title">Сервисы</h4>
            <SwipeTabs
                items={tabItems}
                activeTabIndex={tabItems.findIndex(item => item.card_number === cardClicked)}
                onChange={({card_number}) => setCardClicked(card_number)}
            />
        </div>
    );
};

export default ListFilter;