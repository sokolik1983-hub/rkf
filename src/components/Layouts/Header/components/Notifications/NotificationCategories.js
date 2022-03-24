import React from 'react';

const NotificationCategories = ({
                                    categories,
                                    currentCategory,
                                    setCurrentCategory,
                                    setStartElement,
                                }) => {

    const handleClick = (id) => {
        setCurrentCategory(id);
        setStartElement(1);
    }

    return (
        <div className="notification-categories">
            {categories.map(category => {
                return (
                    <div
                        className={`notification-categories__item${currentCategory === category.id ? ' _active' : ''}`}
                        key={category.id}
                        onClick={() => handleClick(category.id)}
                    >
                        <div className="notification-categories__item-inner">
                            <div
                                className="notification-categories__item-icon"
                                style={{ backgroundImage: `url(${category.icon})` }}
                            />
                            <div className="notification-categories__item-name">
                                {category.name}
                            </div>
                            {category.count > 0 &&
                                <div className="notification-categories__item-count">
                                    {category.count <= 99 ? category.count : '99+'}
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default React.memo(NotificationCategories);