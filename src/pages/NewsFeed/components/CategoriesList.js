import React from 'react';
import Card from 'components/Card';
import { categories } from '../config';

const CategoriesList = ({ activeCategoryId, setActiveCategoryId, setShowMustRead, setShowFilters, categoriesCounters}) => {
    const isActive = (value) => activeCategoryId === value ? "news-feed__category-item active" : "news-feed__category-item";

    const handleCategoryClick = (id) => {
        setActiveCategoryId(id);
        setShowFilters({ isOpenFilters: false });
        if (id === 4) {
            setShowMustRead(true);
        } else {
            setShowMustRead(false);
        }
        window.scrollTo(0, 0);
    }

    const getCount = (id) => {
        let count = 0;

        if (id === 7) count = categoriesCounters.counter_of_new
        else if (id === 5) count = categoriesCounters.counter_of_must_read
        else if (id === 6) count = categoriesCounters.counter_of_request
        else if (id === 8) count = categoriesCounters.counter_of_subscribe
        else if (id === 1) count = categoriesCounters.counter_of_all
        else if (id === 9) count = categoriesCounters.counter_of_archive;

        return count;
    }

    return <Card>
        <h3 className="news-feed__inner-name">Уведомления</h3>
        <ul className="news-feed__inner-list">
            {categories.map(({ id, name, icon, disabled}, key) => {
                    const count = getCount(id);

                    if (disabled) {
                        return <li className="news-feed__category-item disabled" key={key}>
                            <span className={icon} />
                            <span>{name}</span>
                        </li>;
                    }

                    return <li
                        onClick={() => handleCategoryClick(id)}
                        className={isActive(id)}
                        key={key} >
                            <span className={icon} />
                            <span>{name}</span>
                            {count > 0 &&
                                <span className="news-feed__category-item-count">
                                    {count}
                                </span>
                            }
                    </li>
                }
            )}
        </ul>

    </Card>
};

export default React.memo(CategoriesList);