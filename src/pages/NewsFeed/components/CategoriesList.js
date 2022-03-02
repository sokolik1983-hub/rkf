import React from 'react';
import Card from 'components/Card';
import { categories } from '../config';

const CategoriesList = ({ activeCategoryId, setActiveCategoryId, setShowMustRead, setShowFilters}) => {
    const isActive = (value) => activeCategoryId === value ? "news-feed__category-item active" : "NewsFeed__category-item";

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
    return <Card>
        <h3 className="news-feed__inner-name">Уведомления</h3>
        <ul className="news-feed__inner-list">
            {categories.map(({ id, name, icon, disabled, count }, key) => {
                if (disabled) {
                    return <li className="news-feed__category-item disabled" key={key}>
                        <span className={icon} />
                        <span>{name}</span>
                        {count > 0 &&
                            <span className="news-feed__category-item-count">
                                {count <= 99 ? count : '99+'}
                            </span>
                        }
                    </li>;
                }
                return <li
                    onClick={() => handleCategoryClick(id)}
                    className={isActive(id)}
                    key={key} >
                    <span className={icon} />
                    <span>{name}</span>
                </li>
            }
            )}
        </ul>

    </Card>
};

export default React.memo(CategoriesList);