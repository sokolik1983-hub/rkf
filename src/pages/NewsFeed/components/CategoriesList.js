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
        switch (id) {
            case 1:
                return categoriesCounters.counter_of_new;
                break;
            case 2:
                return categoriesCounters.counter_of_must_read;
                break;
            case 3:
                return categoriesCounters.counter_of_request;
                break;
            case 4:
                return categoriesCounters.counter_of_subscribe;
                break;
            case 5:
                return categoriesCounters.counter_of_all;
                break;
            case 6:
                return categoriesCounters.counter_of_archive;
                break;
        }
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